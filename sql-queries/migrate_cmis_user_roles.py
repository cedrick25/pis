#!/usr/bin/env python3
"""Map CMIS USER_LEVEL_ID onto PPIS user_role for already-generated users."""

from __future__ import annotations

from collections import Counter
from pathlib import Path

from migrate_cmis_users import (
    CMIS_PATH,
    OUT_DIR,
    USER_OUT,
    clean,
    extract_insert_blobs,
    parse_sql_value_list,
    sql_lit,
)

ROLE_OUT = OUT_DIR / "user_role_ppis_migrated.sql"


def load_ppis_users() -> list[tuple[int, str | None, str | None, int, str]]:
    sql = USER_OUT.read_text(encoding="utf-8")
    rows = parse_sql_value_list(extract_insert_blobs(sql, "user"))
    users = []
    for row in rows:
        user_id = int(row[0])
        created_by = clean(row[1]) or "CMIS_MIGRATION"
        created_date = clean(row[2])
        status = int(row[3]) if row[3] is not None else 1
        uuid = clean(row[-1])
        if not uuid:
            raise SystemExit(f"Missing UUID for PPIS user id {user_id}")
        users.append((user_id, created_by, created_date, status, uuid))
    return users


def load_cmis_level_ids() -> dict[int, int | None]:
    sql = CMIS_PATH.read_text(encoding="utf-8", errors="replace")
    rows = parse_sql_value_list(extract_insert_blobs(sql, "users"))
    levels: dict[int, int | None] = {}
    for row in rows:
        user_id = int(row[0])
        level = row[9]
        if level is None or level == "":
            levels[user_id] = None
        else:
            levels[user_id] = int(level)
    return levels


def main() -> None:
    users = load_ppis_users()
    levels = load_cmis_level_ids()
    missing_level = [user_id for user_id, *_ in users if user_id not in levels]
    if missing_level:
        raise SystemExit(f"PPIS users with no CMIS row: {missing_level[:20]}")

    lines: list[str] = []
    role_counts: Counter[str] = Counter()
    null_roles = 0
    max_id = 0

    for user_id, created_by, created_date, status, user_uuid in users:
        max_id = max(max_id, user_id)
        role_id = levels.get(user_id)
        if role_id is None:
            null_roles += 1
            role_counts["NULL"] += 1
        else:
            role_counts[str(role_id)] += 1
        lines.append(
            "("
            + ", ".join(
                [
                    sql_lit(user_id),
                    sql_lit(created_by),
                    sql_lit(created_date),
                    sql_lit(status),
                    "NULL",
                    "NULL",
                    sql_lit(None if role_id is None else str(role_id)),
                    sql_lit(user_uuid),
                ]
            )
            + ")"
        )

    sql = f"""-- phpMyAdmin SQL Dump (generated)
-- Migrated from CMIS `users.USER_LEVEL_ID` -> PPIS `user_role.role_id`
-- user_role.user_id = PPIS user.uuid (not numeric id)
-- user_role.id = USER_ID (CMIS) = user.id (PPIS)

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
    print(f"Wrote {len(lines)} user_role rows to {ROLE_OUT}")
    print(f"Null USER_LEVEL_ID: {null_roles}")
    print("role_id counts:")
    for role_id, count in sorted(role_counts.items(), key=lambda item: (item[0] == "NULL", int(item[0]) if item[0].isdigit() else 0)):
        print(f"  {role_id}: {count}")


if __name__ == "__main__":
    main()
