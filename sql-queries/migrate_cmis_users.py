#!/usr/bin/env python3
"""Map CMIS `users` into PPIS `user` and `user_profile` SQL dumps."""

from __future__ import annotations

import re
import uuid
from pathlib import Path

CMIS_PATH = Path(r"e:\Downloads\users (2).sql")
DEPT_PATH = Path(r"e:\Downloads\department (1).sql")
OUT_DIR = Path(__file__).resolve().parent
USER_OUT = OUT_DIR / "user_ppis_migrated.sql"
PROFILE_OUT = OUT_DIR / "user_profile_ppis_migrated.sql"

# CMIS FIELD_OFFICE strings that do not match a department.name exactly.
FIELD_OFFICE_ALIASES = {
    "davao del sur parole and probation office no. 1": "Davao Del Sur Parole And Probation Office",
    "davao del sur parole and probation office no 1": "Davao Del Sur Parole And Probation Office",
    "ilagan city parole and probation office": "Isabela Province/City of Ilagan Parole and Probation Office",
    "taguig city parole and probation office": "Taguig City/Pateros City Parole And Probation Office",
}

HEX32 = re.compile(r"^[0-9a-fA-F]{32}$")
HEX64 = re.compile(r"^[0-9a-fA-F]{64}$")


def parse_sql_value_list(blob: str) -> list[list[object]]:
    """Parse phpMyAdmin INSERT tuples: (v1, v2, ...), ..."""
    rows: list[list[object]] = []
    i = 0
    n = len(blob)
    while i < n:
        while i < n and blob[i] in " \t\r\n,;":
            i += 1
        if i >= n or blob[i] != "(":
            break
        i += 1
        row: list[object] = []
        while i < n:
            while i < n and blob[i] in " \t\r\n":
                i += 1
            if i >= n:
                break
            if blob.startswith("NULL", i) and (i + 4 >= n or blob[i + 4] in ",)"):
                row.append(None)
                i += 4
            elif blob[i] == "'":
                i += 1
                buf: list[str] = []
                while i < n:
                    ch = blob[i]
                    if ch == "\\" and i + 1 < n:
                        buf.append(blob[i + 1])
                        i += 2
                        continue
                    if ch == "'":
                        if i + 1 < n and blob[i + 1] == "'":
                            buf.append("'")
                            i += 2
                            continue
                        i += 1
                        break
                    buf.append(ch)
                    i += 1
                row.append("".join(buf))
            else:
                start = i
                while i < n and blob[i] not in ",)":
                    i += 1
                token = blob[start:i].strip()
                if token.isdigit() or (token.startswith("-") and token[1:].isdigit()):
                    row.append(int(token))
                else:
                    row.append(token)
            while i < n and blob[i] in " \t\r\n":
                i += 1
            if i < n and blob[i] == ",":
                i += 1
                continue
            if i < n and blob[i] == ")":
                i += 1
                break
        rows.append(row)
    return rows


def sql_lit(value: object) -> str:
    if value is None:
        return "NULL"
    if isinstance(value, int):
        return str(value)
    text = str(value).replace("\\", "\\\\").replace("'", "''")
    return f"'{text}'"


def clean(value: object) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def split_fullname(fullname: str | None) -> tuple[str | None, str | None, str | None]:
    if not fullname:
        return None, None, None
    parts = fullname.split()
    if len(parts) == 1:
        return parts[0], None, None
    if len(parts) == 2:
        return parts[0], None, parts[1]
    return parts[0], " ".join(parts[1:-1]), parts[-1]


def names_for(row: list[object]) -> tuple[str | None, str | None, str | None]:
    fullname = clean(row[1])
    fname = clean(row[2])
    mname = clean(row[3])
    lname = clean(row[4])
    if fname or mname or lname:
        return fname, mname, lname
    return split_fullname(fullname)


def password_kind(hash_value: str | None) -> str:
    if not hash_value:
        return "empty"
    if HEX32.match(hash_value):
        return "md5"
    if HEX64.match(hash_value):
        return "sha256"
    return "other"


def normalize_office_name(value: str) -> str:
    text = value.casefold().replace("&", " and ").replace("ñ", "n")
    text = re.sub(r"[^a-z0-9]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def load_department_lookup(path: Path) -> dict[str, int]:
    """Map normalized department names to department.id (prefer status=1)."""
    sql = path.read_text(encoding="utf-8", errors="replace")
    rows = parse_sql_value_list(extract_insert_blobs(sql, "department"))
    lookup: dict[str, tuple[int, int, int]] = {}
    for row in rows:
        dept_id = int(row[0])
        status = int(row[3]) if row[3] is not None else 0
        name = clean(row[7])
        if not name:
            continue
        key = normalize_office_name(name)
        prev = lookup.get(key)
        # Prefer active rows; if both active/inactive, keep the lower id.
        if prev is None:
            lookup[key] = (status, dept_id, dept_id)
            continue
        prev_status, prev_id, _ = prev
        better = (status > prev_status) or (status == prev_status and dept_id < prev_id)
        if better:
            lookup[key] = (status, dept_id, dept_id)
    return {key: dept_id for key, (_status, dept_id, _) in lookup.items()}


def resolve_department_id(field_office: str | None, dept_lookup: dict[str, int]) -> int | None:
    name = clean(field_office)
    if not name or name.casefold() == "all":
        return None
    alias = FIELD_OFFICE_ALIASES.get(normalize_office_name(name))
    if alias:
        name = alias
    return dept_lookup.get(normalize_office_name(name))


def load_existing_uuids(path: Path) -> dict[int, str]:
    """Keep previously generated UUIDs so user_role dumps stay valid."""
    if not path.exists():
        return {}
    sql = path.read_text(encoding="utf-8", errors="replace")
    rows = parse_sql_value_list(extract_insert_blobs(sql, "user"))
    uuids: dict[int, str] = {}
    for row in rows:
        user_id = int(row[0])
        uuid_value = clean(row[13])
        if uuid_value:
            uuids[user_id] = uuid_value
    return uuids


def extract_insert_blobs(sql: str, table: str = "users") -> str:
    blobs: list[str] = []
    pattern = rf"INSERT INTO `{re.escape(table)}`.*?VALUES\s*(.*?);"
    for match in re.finditer(pattern, sql, flags=re.IGNORECASE | re.DOTALL):
        blobs.append(match.group(1))
    if not blobs:
        raise SystemExit(f"No INSERT INTO `{table}` statements found")
    return "\n".join(blobs)


def main() -> None:
    sql = CMIS_PATH.read_text(encoding="utf-8", errors="replace")
    rows = parse_sql_value_list(extract_insert_blobs(sql))
    if not rows:
        raise SystemExit("No CMIS user rows parsed")
    if not DEPT_PATH.exists():
        raise SystemExit(f"Department dump not found: {DEPT_PATH}")

    dept_lookup = load_department_lookup(DEPT_PATH)
    existing_uuids = load_existing_uuids(USER_OUT)

    profile_lines: list[str] = []
    user_lines: list[str] = []
    counts = {"md5": 0, "sha256": 0, "other": 0, "empty": 0}
    mapped = 0
    unmatched_offices: dict[str, int] = {}
    empty_office = 0
    max_id = 0

    for row in rows:
        if len(row) < 16:
            raise SystemExit(f"Unexpected column count {len(row)} for row {row[:3]!r}")
        user_id = int(row[0])
        max_id = max(max_id, user_id)
        username = clean(row[5])
        contact = clean(row[6])
        email = clean(row[7])
        password = clean(row[8])
        field_office = clean(row[10])
        status = int(row[11]) if row[11] is not None else 1
        created_by = clean(row[12]) or "CMIS_MIGRATION"
        created_date = clean(row[13])
        if created_date and created_date.startswith("0000-00-00"):
            created_date = None

        first_name, middle_name, last_name = names_for(row)
        account_uuid = existing_uuids.get(user_id) or str(uuid.uuid4())
        account_status = "ACTIVE" if status == 1 else "INACTIVE"
        counts[password_kind(password)] += 1
        department_id = resolve_department_id(field_office, dept_lookup)
        if department_id is not None:
            mapped += 1
        elif not field_office or field_office.casefold() == "all":
            empty_office += 1
        else:
            unmatched_offices[field_office] = unmatched_offices.get(field_office, 0) + 1

        profile_lines.append(
            "("
            + ", ".join(
                [
                    sql_lit(user_id),
                    sql_lit(created_by),
                    sql_lit(created_date),
                    sql_lit(status),
                    "NULL",
                    "NULL",
                    "NULL",
                    sql_lit(username),
                    sql_lit(department_id),
                    sql_lit(email),
                    sql_lit(first_name),
                    sql_lit(last_name),
                    "NULL",
                    sql_lit(middle_name),
                    sql_lit(contact),
                    "NULL",
                    sql_lit(account_uuid),
                ]
            )
            + ")"
        )
        user_lines.append(
            "("
            + ", ".join(
                [
                    sql_lit(user_id),
                    sql_lit(created_by),
                    sql_lit(created_date),
                    sql_lit(status),
                    "NULL",
                    "NULL",
                    sql_lit(account_status),
                    "0",
                    "0",
                    "NULL",
                    sql_lit(username),
                    sql_lit(password),
                    sql_lit(user_id),
                    sql_lit(account_uuid),
                ]
            )
            + ")"
        )

    header = """-- phpMyAdmin SQL Dump (generated)
-- Migrated from CMIS `users` -> PPIS
-- USER_ID (CMIS) = id (PPIS)
-- user.uuid = user_profile.uuid (new UUID per account)
-- password copied from CMIS USER_PASS as-is (typically 32-char MD5 hex).
-- user_profile.department_id is mapped from CMIS FIELD_OFFICE -> department.name.
-- PPIS login should compare: 32 hex = MD5, 64 hex = SHA-256. New passwords stay SHA-256.

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET NAMES utf8mb4;

"""

    profile_sql = (
        header
        + """DROP TABLE IF EXISTS `user_profile`;
CREATE TABLE IF NOT EXISTS `user_profile` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `corp_key` varchar(255) DEFAULT NULL,
  `department_id` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `manager_id` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `suffix` varchar(255) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user_profile` (`id`, `created_by`, `created_date`, `status`, `updated_by`, `updated_date`, `birthday`, `corp_key`, `department_id`, `email`, `first_name`, `last_name`, `manager_id`, `middle_name`, `phone_number`, `suffix`, `uuid`) VALUES
"""
        + ",\n".join(profile_lines)
        + f";\n\nALTER TABLE `user_profile` AUTO_INCREMENT = {max_id + 1};\nCOMMIT;\n"
    )

    user_sql = (
        header
        + """DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `account_status` varchar(255) DEFAULT NULL,
  `failed_attempt_count` bigint DEFAULT NULL,
  `is_locked` bit(1) DEFAULT NULL,
  `last_access_date` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_id` bigint DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user` (`id`, `created_by`, `created_date`, `status`, `updated_by`, `updated_date`, `account_status`, `failed_attempt_count`, `is_locked`, `last_access_date`, `name`, `password`, `profile_id`, `uuid`) VALUES
"""
        + ",\n".join(user_lines)
        + f";\n\nALTER TABLE `user` AUTO_INCREMENT = {max_id + 1};\nCOMMIT;\n"
    )

    PROFILE_OUT.write_text(profile_sql, encoding="utf-8")
    USER_OUT.write_text(user_sql, encoding="utf-8")
    print(f"Wrote {len(rows)} users to:")
    print(f"  {USER_OUT}")
    print(f"  {PROFILE_OUT}")
    print(f"Password hashes: {counts}")
    print(f"Department mapped: {mapped}")
    print(f"No field office / ALL: {empty_office}")
    print(f"Unmatched field offices: {sum(unmatched_offices.values())}")
    for name, count in sorted(unmatched_offices.items(), key=lambda item: (-item[1], item[0])):
        print(f"  [{count}] {name}")


if __name__ == "__main__":
    main()
