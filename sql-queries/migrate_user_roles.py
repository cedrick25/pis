#!/usr/bin/env python3
"""Map generated PPIS users into `user_role`.

user_role.user_id = user.uuid
user_role.role_id = PPIS role id as string.

Original PPIS `user_role` used role_id '1' for nearly all accounts.
If an old PPIS user matches by username, keep that user's latest active role_id.
Everyone else gets role_id '1'.
"""

from __future__ import annotations

import re
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from migrate_cmis_users import parse_sql_value_list, sql_lit

OUT_DIR = Path(__file__).resolve().parent
USER_SQL = OUT_DIR / "user_ppis_migrated.sql"
ROLE_OUT = OUT_DIR / "user_role_ppis_migrated.sql"
OLD_USER_SQL = Path(r"e:\Downloads\user.sql")
OLD_USER_ROLE_SQL = Path(r"e:\Downloads\user_role.sql")
DEFAULT_ROLE_ID = "1"


def extract_insert_blobs(sql: str, table: str) -> str:
    blobs: list[str] = []
    for match in re.finditer(
        rf"INSERT INTO `{table}`.*?VALUES\s*(.*?);",
        sql,
        flags=re.IGNORECASE | re.DOTALL,
    ):
        blobs.append(match.group(1))
    if not blobs:
        raise SystemExit(f"No INSERT INTO `{table}` statements found")
    return "\n".join(blobs)


def latest_active_role_by_username() -> dict[str, str]:
    if not OLD_USER_SQL.exists() or not OLD_USER_ROLE_SQL.exists():
        return {}

    old_users = parse_sql_value_list(
        extract_insert_blobs(OLD_USER_SQL.read_text(encoding="utf-8", errors="replace"), "user")
    )
    uuid_to_name = {}
    for row in old_users:
        # id, created_by, created_date, status, updated_by, updated_date,
        # account_status, failed_attempt_count, is_locked, last_access_date,
        # name, password, profile_id, uuid
        name = str(row[10]).strip() if row[10] is not None else ""
        uuid = str(row[13]).strip() if row[13] is not None else ""
        if name and uuid:
            uuid_to_name[uuid] = name

    old_roles = parse_sql_value_list(
        extract_insert_blobs(
            OLD_USER_ROLE_SQL.read_text(encoding="utf-8", errors="replace"), "user_role"
        )
    )
    # Keep highest id among status=1 rows per user uuid
    best: dict[str, tuple[int, str]] = {}
    for row in old_roles:
        role_row_id = int(row[0])
        status = int(row[3]) if row[3] is not None else 0
        role_id = str(row[6]).strip() if row[6] is not None else ""
        user_uuid = str(row[7]).strip() if row[7] is not None else ""
        if status != 1 or not role_id or not user_uuid:
            continue
        prev = best.get(user_uuid)
        if prev is None or role_row_id > prev[0]:
            best[user_uuid] = (role_row_id, role_id)

    name_to_role: dict[str, str] = {}
    for user_uuid, (_, role_id) in best.items():
        name = uuid_to_name.get(user_uuid)
        if name:
            name_to_role[name] = role_id
    return name_to_role


def main() -> None:
    users = parse_sql_value_list(
        extract_insert_blobs(USER_SQL.read_text(encoding="utf-8", errors="replace"), "user")
    )
    name_to_role = latest_active_role_by_username()

    lines: list[str] = []
    role_counts: Counter[str] = Counter()
    matched_old = 0
    max_id = 0

    for row in users:
        user_id = int(row[0])
        created_by = row[1] or "CMIS_MIGRATION"
        created_date = row[2]
        username = str(row[10]).strip() if row[10] is not None else ""
        uuid = str(row[13]).strip() if row[13] is not None else ""
        role_id = name_to_role.get(username, DEFAULT_ROLE_ID)
        if username in name_to_role:
            matched_old += 1
        role_counts[role_id] += 1
        max_id = max(max_id, user_id)

        lines.append(
            "("
            + ", ".join(
                [
                    sql_lit(user_id),
                    sql_lit(created_by),
                    sql_lit(created_date),
                    "1",
                    "NULL",
                    "NULL",
                    sql_lit(role_id),
                    sql_lit(uuid),
                ]
            )
            + ")"
        )

    sql = f"""-- phpMyAdmin SQL Dump (generated)
-- Mapped from generated PPIS `user` -> `user_role`
-- user_role.user_id = user.uuid
-- user_role.role_id = '{DEFAULT_ROLE_ID}' (PPIS default; original dump used this for almost all users)
-- Username matches against old PPIS user_role keep that account's latest active role_id.

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET NAMES utf8mb4;

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `role_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user_role` (`id`, `created_by`, `created_date`, `status`, `updated_by`, `updated_date`, `role_id`, `user_id`) VALUES
{',\n'.join(lines)};

ALTER TABLE `user_role` AUTO_INCREMENT = {max_id + 1};
COMMIT;
"""
    ROLE_OUT.write_text(sql, encoding="utf-8")
    print(f"Wrote {len(users)} user_role rows to {ROLE_OUT}")
    print(f"Role counts: {dict(role_counts)}")
    print(f"Username matches from old PPIS user_role: {matched_old}")


if __name__ == "__main__":
    main()
