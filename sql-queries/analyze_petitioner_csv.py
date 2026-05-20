import csv
from collections import defaultdict

path = r"C:\Users\Cedrick\Desktop\imports\petitioner_profile (1).csv"

with open(path, encoding="utf-8", errors="replace", newline="") as f:
    reader = csv.reader(f)
    header = next(reader)
    id_idx = header.index("id")
    expected = len(header)

    rows_id2 = []
    id_lines = defaultdict(list)
    bad_rows = []
    line_no = 1

    for row in reader:
        line_no += 1
        if len(row) != expected:
            bad_rows.append((line_no, len(row), expected, row[id_idx] if row else None))

        if not row:
            bad_rows.append((line_no, 0, expected, "<empty>"))
            continue

        rid = row[id_idx].strip().strip('"')
        id_lines[rid].append(line_no)
        if rid == "2":
            rows_id2.append((line_no, row))

print("columns:", expected)
print("header:", header)
print("rows with id=2:", len(rows_id2))
for line_no, row in rows_id2:
    print("line", line_no, "field_count", len(row))
    for name, val in zip(header, row):
        print(" ", name, "=>", repr(val))

print("duplicate id=2 at lines:", id_lines.get("2"))
print("total data rows:", line_no - 1)
print("bad rows:", len(bad_rows))
for item in bad_rows[:20]:
    print(" bad", item)

# ids 1-5 presence
for i in range(1, 10):
    print(f"id {i} lines:", id_lines.get(str(i), []))
