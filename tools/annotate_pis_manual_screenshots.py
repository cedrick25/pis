import json
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "PIS_End_User_Manual_Screenshots"
OUT_DIR = ROOT / "PIS_End_User_Manual_Screenshots_Annotated"
SRC_CATALOG = SRC_DIR / "screenshot_catalog.json"
OUT_CATALOG = OUT_DIR / "screenshot_catalog.json"
OVERRIDES_PATH = Path(__file__).with_name("manual_screenshot_overrides.json")

REF_WIDTH = 1440
REF_HEIGHT = 1640
ACCENT = (220, 38, 38)

MY_ORG_MODULES = {"User Accounts", "User Roles", "Field Office", "Region", "Permission"}

WIDE_MENU_MODULES = {
    "Probation Courtesy Investigation",
    "Probation Courtesy Supervision",
    "Parole and Pardon Courtesy Investigation",
    "Parole and Pardon Courtesy Supervision",
    "Parole and Pardon Investigation",
    "Fact Sheet Parole and Pardone",
}

# Fractional sidebar menu bands [y1, y2] on full screenshot height.
MODULE_MENU_FRAC = {
    "Probation Investigation": (0.120, 0.128),
    "Probation Courtesy Investigation": (0.141, 0.149),
    "Probation Supervision": (0.191, 0.199),
    "Probation Courtesy Supervision": (0.291, 0.299),
    "Parole and Pardon Investigation": (0.240, 0.248),
    "Parole and Pardon Courtesy Investigation": (0.221, 0.229),
    "Parole and Pardon Supervision": (0.251, 0.259),
    "Parole and Pardon Courtesy Supervision": (0.339, 0.347),
    "PDL Routing": (0.423, 0.427),
    "Sent Probation": (0.414, 0.424),
    "Sent Pre-Parole": (0.414, 0.424),
    "Sent Parole": (0.414, 0.424),
    "Sent Pardone": (0.414, 0.424),
    "Sent PDL": (0.414, 0.424),
    "Inbox Probation": (0.430, 0.436),
    "Inbox Pre-Parole": (0.430, 0.436),
    "Inbox Parole": (0.430, 0.436),
    "Inbox Pardone": (0.430, 0.436),
    "Inbox PDL": (0.430, 0.436),
    "Fact Sheet Probation": (0.536, 0.547),
    "Fact Sheet Parole and Pardone": (0.476, 0.485),
    "Fact Sheet PDL": (0.611, 0.623),
    "Forms": (0.654, 0.660),
    "User Accounts": (0.443, 0.449),
    "User Roles": (0.649, 0.656),
    "Field Office": (0.675, 0.680),
    "Region": (0.770, 0.781),
    "Permission": (0.890, 0.901),
}

MENU_SEARCH_MARGIN = 0.06
MY_ORG_SEARCH_MARGIN = 0.018


def get_font(size=20):
    for candidate in [
        Path("C:/Windows/Fonts/arialbd.ttf"),
        Path("C:/Windows/Fonts/arial.ttf"),
    ]:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


def scale_box(box, width, height):
    x1, y1, x2, y2 = box[:4]
    label = box[4] if len(box) > 4 else "Click"
    if all(0 <= value <= 1 for value in (x1, y1, x2, y2)):
        return (int(x1 * width), int(y1 * height), int(x2 * width), int(y2 * height), label)
    sx = width / REF_WIDTH
    sy = height / REF_HEIGHT
    return (
        int(x1 * sx),
        int(y1 * sy),
        int(x2 * sx),
        int(y2 * sy),
        label,
    )


def sidebar_width(width):
    return max(180, int(width * 220 / REF_WIDTH))


def top_bar_height(height):
    return max(90, int(height * 120 / REF_HEIGHT))


def toggle_exclude_box(width, height):
    sx = width / REF_WIDTH
    sy = height / REF_HEIGHT
    return (int(220 * sx), int(40 * sy), int(310 * sx), int(110 * sy))


def overlaps(box, region, min_overlap=0.2):
    x1, y1, x2, y2 = box[:4]
    rx1, ry1, rx2, ry2 = region
    ix1 = max(x1, rx1)
    iy1 = max(y1, ry1)
    ix2 = min(x2, rx2)
    iy2 = min(y2, ry2)
    if ix1 >= ix2 or iy1 >= iy2:
        return False
    inter = (ix2 - ix1 + 1) * (iy2 - iy1 + 1)
    area = max(1, (x2 - x1 + 1) * (y2 - y1 + 1))
    return inter / area >= min_overlap


def connected_boxes(mask, min_area=300, min_w=30, max_w=260, min_h=12, max_h=55):
    height, width = mask.shape
    visited = np.zeros(mask.shape, dtype=bool)
    boxes = []
    for y, x in np.argwhere(mask):
        if visited[y, x] or not mask[y, x]:
            continue
        q = deque([(int(y), int(x))])
        visited[y, x] = True
        min_x = max_x = int(x)
        min_y = max_y = int(y)
        area = 0
        while q:
            cy, cx = q.popleft()
            area += 1
            min_x = min(min_x, cx)
            max_x = max(max_x, cx)
            min_y = min(min_y, cy)
            max_y = max(max_y, cy)
            for ny, nx in ((cy - 1, cx), (cy + 1, cx), (cy, cx - 1), (cy, cx + 1)):
                if ny < 0 or nx < 0 or ny >= height or nx >= width:
                    continue
                if visited[ny, nx] or not mask[ny, nx]:
                    continue
                visited[ny, nx] = True
                q.append((ny, nx))
        bw = max_x - min_x + 1
        bh = max_y - min_y + 1
        if area >= min_area and min_w <= bw <= max_w and min_h <= bh <= max_h:
            boxes.append((min_x, min_y, max_x, max_y, area))
    return boxes


def find_colored_buttons(arr, region, colors, width, height, min_area=300):
    x1, y1, x2, y2 = region
    x1 = max(0, x1)
    y1 = max(0, y1)
    x2 = min(arr.shape[1] - 1, x2)
    y2 = min(arr.shape[0] - 1, y2)
    if x2 <= x1 or y2 <= y1:
        return []

    sub = arr[y1 : y2 + 1, x1 : x2 + 1]
    r = sub[:, :, 0].astype(np.int16)
    g = sub[:, :, 1].astype(np.int16)
    b = sub[:, :, 2].astype(np.int16)
    mask = np.zeros(sub.shape[:2], dtype=bool)
    for color in colors:
        if color == "blue":
            mask |= (b > 125) & (g > 55) & (r < 95)
        elif color == "primary":
            mask |= (b > 80) & (g > 40) & (r < 95)
        elif color == "red":
            mask |= (r > 150) & (g < 115) & (b < 140)
        elif color == "green":
            mask |= (g > 105) & (r < 120) & (b < 150)
        elif color == "cancel":
            mask |= (r > 95) & (r < 125) & (g > 105) & (g < 130) & (b > 105) & (b < 135)

    boxes = []
    toggle = toggle_exclude_box(width, height)
    for bx1, by1, bx2, by2, _area in connected_boxes(
        mask,
        min_area=min_area,
        min_w=28,
        max_w=260,
        min_h=10,
        max_h=55,
    ):
        box = (bx1 + x1, by1 + y1, bx2 + x1, by2 + y1)
        if overlaps(box, toggle):
            continue
        boxes.append((*box, "Click"))
    return boxes


def menu_box_for_module(module, width, height):
    frac = MODULE_MENU_FRAC.get(module)
    if not frac:
        return None
    y1, y2 = frac
    x1 = 6
    x2 = sidebar_width(width) - 2
    if module in WIDE_MENU_MODULES:
        x1 = 4
        x2 = sidebar_width(width)
    return (x1, int(y1 * height), x2, int(y2 * height), "Click")


def navigation_targets(height, width):
    return [(6, int(0.10 * height), sidebar_width(width), int(0.78 * height), "Click")]


def find_loose_button_box(arr, region, color="blue", min_center_frac=0.40):
    x1, y1, x2, y2 = region
    sub = arr[y1 : y2 + 1, x1 : x2 + 1]
    if sub.size == 0:
        return None
    r = sub[:, :, 0].astype(np.int16)
    g = sub[:, :, 1].astype(np.int16)
    b = sub[:, :, 2].astype(np.int16)
    if color == "blue":
        mask = (b > 90) & (g > 45) & (r < 110)
    elif color == "primary":
        mask = (b > 80) & (g > 40) & (r < 95)
    elif color == "green":
        mask = (g > 95) & (r < 120) & (b < 150)
    else:
        return None

    best = None
    best_score = 0
    region_width = sub.shape[1]
    for row_idx in range(mask.shape[0]):
        xs = np.where(mask[row_idx])[0]
        if len(xs) == 0:
            continue
        span = int(xs.max() - xs.min() + 1)
        if span < 24 or span > 220:
            continue
        center_x = x1 + int((xs.min() + xs.max()) / 2)
        if center_x < x1 + region_width * min_center_frac:
            continue
        score = int(mask[row_idx].sum())
        if score > best_score:
            best_score = score
            best = (row_idx, xs.min(), xs.max())
    if best is None or best_score < 12:
        return None

    row_idx, xmin, xmax = best
    pad = 10
    return (
        x1 + int(xmin) - pad,
        y1 + row_idx - pad,
        x1 + int(xmax) + pad,
        y1 + row_idx + pad,
        "Click",
    )


def find_confirm_button(arr, regions):
    width, height = arr.shape[1], arr.shape[0]
    for region in regions:
        boxes = find_colored_buttons(arr, region, ["blue"], width, height, min_area=80)
        if boxes:
            return max(boxes, key=lambda b: (b[2] - b[0]) * (b[3] - b[1]))
    loose = find_loose_button_box(arr, regions[-1], color="blue")
    return loose


def update_targets(arr):
    width, height = arr.shape[1], arr.shape[0]
    regions = [
        (int(width * 0.45), int(height * 0.82), width - 10, height - 10),
        (int(width * 0.45), int(height * 0.72), width - 10, height - 10),
        (int(width * 0.20), int(height * 0.52), int(width * 0.85), int(height * 0.72)),
        (int(width * 0.20), int(height * 0.12), int(width * 0.85), int(height * 0.24)),
    ]
    confirm = find_confirm_button(arr, regions)
    return [confirm] if confirm else []


def attachments_targets(arr):
    width, height = arr.shape[1], arr.shape[0]
    targets = []

    upload_confirm = find_colored_buttons(
        arr,
        (int(width * 0.45), top_bar_height(height), width - 10, int(height * 0.58)),
        ["blue"],
        width,
        height,
        min_area=80,
    )
    upload_confirm = [button for button in upload_confirm if button[1] < int(height * 0.58)]
    if upload_confirm:
        targets.append(max(upload_confirm, key=lambda b: (b[0], -b[1])))
    else:
        loose_confirm = find_loose_button_box(
            arr,
            (int(width * 0.45), int(height * 0.38), width - 10, int(height * 0.58)),
            color="blue",
        )
        if loose_confirm and loose_confirm[1] < int(height * 0.58):
            targets.append(loose_confirm)

    table_actions = find_colored_buttons(
        arr,
        (int(width * 0.52), int(height * 0.58), width - 10, int(height * 0.92)),
        ["blue", "red"],
        width,
        height,
        min_area=40,
    )
    table_actions = [button for button in table_actions if button[1] >= int(height * 0.58)]
    if table_actions:
        first_y = min(button[1] for button in table_actions)
        row = sorted(
            [button for button in table_actions if abs(button[1] - first_y) <= 18],
            key=lambda b: b[0],
        )
        for button in row[:3]:
            if button not in targets:
                targets.append(button)

    return targets


def adjacent_modal_button(arr, anchor):
    x1, y1, x2, y2 = anchor[:4]
    width, height = arr.shape[1], arr.shape[0]
    region = (x2 + 2, max(0, y1 - 14), min(width - 8, x2 + 240), min(height - 1, y2 + 14))
    buttons = find_colored_buttons(
        arr,
        region,
        ["blue", "primary", "red"],
        width,
        height,
        min_area=20,
    )
    if buttons:
        return min(buttons, key=lambda b: b[0])
    loose = find_loose_button_box(arr, region, color="primary", min_center_frac=0.05)
    if loose:
        return loose
    return find_loose_button_box(arr, region, color="blue", min_center_frac=0.05)


def remove_confirmation_targets(arr):
    width, height = arr.shape[1], arr.shape[0]
    regions = [
        (int(width * 0.22), int(height * 0.12), int(width * 0.78), int(height * 0.28)),
        (int(width * 0.22), int(height * 0.26), int(width * 0.78), int(height * 0.44)),
        (int(width * 0.22), int(height * 0.12), int(width * 0.78), min(int(height * 0.55), 620)),
    ]

    cancel = []
    remove = []
    confirm = []
    for region in regions:
        cancel.extend(find_colored_buttons(arr, region, ["cancel"], width, height, min_area=80))
        remove.extend(find_colored_buttons(arr, region, ["red"], width, height, min_area=80))
        confirm.extend(find_colored_buttons(arr, region, ["blue", "primary"], width, height, min_area=40))

    min_modal_y = int(height * 0.12)
    max_action_x = int(width * 0.62)
    cancel = [
        button
        for button in cancel
        if button[1] >= min_modal_y and button[0] < max_action_x
    ]
    remove = [
        button
        for button in remove
        if button[1] >= min_modal_y and button[0] < max_action_x
    ]
    confirm = [
        button
        for button in confirm
        if button[1] >= min_modal_y and button[0] < max_action_x
    ]
    all_buttons = cancel + remove + confirm
    if not all_buttons:
        return []

    modal_rows = {}
    for button in all_buttons:
        row_key = round(button[1] / 12) * 12
        modal_rows.setdefault(row_key, []).append(button)

    best_row = max(
        modal_rows.items(),
        key=lambda item: (
            len(item[1]),
            -item[0],
        ),
    )[1]
    row_buttons = best_row
    cancel_row = [button for button in row_buttons if button in cancel]
    remove_row = [button for button in row_buttons if button in remove]
    confirm_row = [button for button in row_buttons if button in confirm]

    targets = []
    if cancel_row:
        targets.append(min(cancel_row, key=lambda b: b[0]))
    if remove_row:
        targets.append(max(remove_row, key=lambda b: b[0]))
    elif confirm_row:
        targets.append(max(confirm_row, key=lambda b: b[0]))
    elif cancel_row:
        adjacent = adjacent_modal_button(arr, min(cancel_row, key=lambda b: b[0]))
        if adjacent and adjacent[0] < max_action_x:
            targets.append(adjacent)
    return targets


def add_record_targets(arr):
    width, height = arr.shape[1], arr.shape[0]
    modal_footer = (int(width * 0.22), int(height * 0.55), int(width * 0.78), int(height * 0.68))
    modal_buttons = find_colored_buttons(
        arr, modal_footer, ["blue"], width, height, min_area=80
    )
    if modal_buttons:
        return [max(modal_buttons, key=lambda b: b[0])]

    loose_confirm = find_loose_button_box(arr, modal_footer, color="blue")
    if loose_confirm:
        return [loose_confirm]

    compact_modal = (int(width * 0.22), int(height * 0.10), int(width * 0.78), int(height * 0.24))
    compact_buttons = find_colored_buttons(
        arr, compact_modal, ["blue"], width, height, min_area=80
    )
    if compact_buttons:
        return [max(compact_buttons, key=lambda b: b[0])]

    page_footer = (int(width * 0.45), int(height * 0.78), width - 10, height - 10)
    page_confirm = find_colored_buttons(arr, page_footer, ["blue"], width, height, min_area=80)
    if page_confirm:
        return [max(page_confirm, key=lambda b: b[0])]

    return []


def login_targets(arr):
    width, height = arr.shape[1], arr.shape[0]
    region = (int(width * 0.18), int(height * 0.45), int(width * 0.82), int(height * 0.72))
    buttons = find_colored_buttons(arr, region, ["blue"], width, height)
    if buttons:
        return [max(buttons, key=lambda b: (b[2] - b[0]) * (b[3] - b[1]))]
    return []


def detect_active_menu_box(arr, module):
    width, height = arr.shape[1], arr.shape[0]
    expected = MODULE_MENU_FRAC.get(module)
    if not expected:
        return _detect_active_menu_box_global(arr, module)

    y1f, y2f = expected
    margin = MY_ORG_SEARCH_MARGIN if module in MY_ORG_MODULES else MENU_SEARCH_MARGIN
    y_lo = max(int(height * 0.08), int((y1f - margin) * height))
    y_hi = min(int(height * 0.95), int((y2f + margin) * height))
    sidebar_x2 = sidebar_width(width)
    sidebar = arr[y_lo:y_hi, 6:sidebar_x2]

    best_band = None
    best_score = 0
    y = 0
    while y < max(0, sidebar.shape[0] - 1):
        row = sidebar[y, 12:190].astype(float)
        if row.mean() > 57:
            y0 = y
            while y < sidebar.shape[0] - 1 and sidebar[y, 12:190].mean() > 53:
                y += 1
            if y - y0 >= 4:
                score = float(sidebar[y0:y, 12:190].mean())
                if score > best_score:
                    best_score = score
                    pad = 2 if module in WIDE_MENU_MODULES else 0
                    best_band = (4 - pad, y_lo + y0 - pad, sidebar_x2 + pad, y_lo + y - 1 + pad)
        else:
            y += 1

    if best_band and best_score >= 60:
        return (*best_band, "Click")
    return menu_box_for_module(module, width, height)


def _detect_active_menu_box_global(arr, module):
    width, height = arr.shape[1], arr.shape[0]
    sidebar_x2 = sidebar_width(width)
    sidebar = arr[:, 6:sidebar_x2]
    y_min = int(height * 0.09)
    y_max = int(height * 0.58) if module not in MY_ORG_MODULES else height - 1
    org_y_min = int(height * 0.42)

    best_band = None
    best_score = 0
    y = y_min
    while y < min(y_max, sidebar.shape[0] - 1):
        row = sidebar[y, 12:190].astype(float)
        if row.mean() > 57:
            y0 = y
            while y < min(y_max, sidebar.shape[0] - 1) and sidebar[y, 12:190].mean() > 53:
                y += 1
            if y - y0 >= 5:
                cy = (y0 + y - 1) / 2
                if module in MY_ORG_MODULES and cy < org_y_min:
                    continue
                if module not in MY_ORG_MODULES and cy > height * 0.56:
                    continue
                score = float(sidebar[y0:y, 12:190].mean())
                if score > best_score:
                    best_score = score
                    pad = 2 if module in WIDE_MENU_MODULES else 0
                    best_band = (4 - pad, y0 - pad, sidebar_x2 + pad, y - 1 + pad)
        else:
            y += 1

    if best_band and best_score >= 65:
        return (*best_band, "Click")
    return None


def list_page_targets(record, arr):
    module = record["module"]
    width, height = arr.shape[1], arr.shape[0]
    menu = menu_box_for_module(module, width, height)
    if menu:
        return [menu]
    detected = _detect_active_menu_box_global(arr, module)
    return [detected] if detected else []


def client_name_link_targets(arr):
    width, height = arr.shape[1], arr.shape[0]
    links = find_colored_buttons(
        arr,
        (int(width * 0.08), int(height * 0.22), int(width * 0.55), int(height * 0.75)),
        ["blue", "primary"],
        width,
        height,
        min_area=40,
    )
    if links:
        return [min(links, key=lambda b: (b[1], b[0]))]
    return []


def client_profile_tab_targets(arr):
    width, height = arr.shape[1], arr.shape[0]
    return [(int(width * 0.02), int(height * 0.34), int(width * 0.98), int(height * 0.39), "Click")]


def take_photo_targets(arr):
    width, height = arr.shape[1], arr.shape[0]
    targets = []
    modal = (int(width * 0.18), int(height * 0.08), int(width * 0.82), int(height * 0.88))
    buttons = find_colored_buttons(arr, modal, ["blue", "primary"], width, height, min_area=40)
    open_cam = [b for b in buttons if b[1] < height * 0.28]
    footer = [b for b in buttons if b[1] > height * 0.72]
    if open_cam:
        targets.append(min(open_cam, key=lambda b: b[1]))
    capture = find_colored_buttons(
        arr,
        (int(width * 0.18), int(height * 0.55), int(width * 0.82), int(height * 0.78)),
        ["blue", "primary"],
        width,
        height,
        min_area=30,
    )
    if capture:
        targets.append(max(capture, key=lambda b: b[0]))
    if footer:
        targets.append(max(footer, key=lambda b: b[0]))
    return targets[:3]


def upload_fingerprint_targets(arr):
    width, height = arr.shape[1], arr.shape[0]
    targets = []
    modal = (int(width * 0.05), int(height * 0.08), int(width * 0.95), int(height * 0.82))
    confirm = find_colored_buttons(arr, modal, ["blue", "primary"], width, height, min_area=40)
    footer = [b for b in confirm if b[1] > height * 0.72]
    if footer:
        targets.append(max(footer, key=lambda b: b[0]))
    boxes = [
        (int(width * 0.08), int(height * 0.28), int(width * 0.24), int(height * 0.58), "Click"),
        (int(width * 0.24), int(height * 0.28), int(width * 0.40), int(height * 0.58), "Click"),
        (int(width * 0.40), int(height * 0.28), int(width * 0.56), int(height * 0.58), "Click"),
    ]
    targets.extend(boxes)
    return targets


def upload_photo_targets(arr):
    width, height = arr.shape[1], arr.shape[0]
    targets = []
    modal = (int(width * 0.18), int(height * 0.12), int(width * 0.82), int(height * 0.55))
    confirm = find_colored_buttons(arr, modal, ["blue", "primary"], width, height, min_area=40)
    if confirm:
        targets.append(max(confirm, key=lambda b: b[0]))
    file_region = (int(width * 0.18), int(height * 0.22), int(width * 0.82), int(height * 0.42))
    loose = find_loose_button_box(arr, file_region, color="blue", min_center_frac=0.05)
    if loose and loose not in targets:
        targets.insert(0, loose)
    return targets


def management_modal_confirm_targets(arr):
    width, height = arr.shape[1], arr.shape[0]
    region = (int(width * 0.22), int(height * 0.18), int(width * 0.78), int(height * 0.52))
    buttons = find_colored_buttons(
        arr, region, ["blue", "primary"], width, height, min_area=40
    )
    buttons = [button for button in buttons if button[0] < width * 0.72]
    if buttons:
        return [max(buttons, key=lambda b: b[0])]
    loose = find_loose_button_box(arr, region, color="primary", min_center_frac=0.25)
    if loose and loose[0] < width * 0.72:
        return [loose]
    return []


def resolve_targets(record, arr, overrides):
    filename = record["filename"]
    if filename in overrides:
        return [scale_box(entry, arr.shape[1], arr.shape[0]) for entry in overrides[filename]]

    kind = (record.get("kind") or "").lower()
    if kind == "page":
        return login_targets(arr)
    if kind == "expanded menus":
        return navigation_targets(arr.shape[0], arr.shape[1])
    if kind == "list page":
        return list_page_targets(record, arr)
    if kind == "view":
        return []
    if kind == "update":
        if record.get("module") in MY_ORG_MODULES:
            return management_modal_confirm_targets(arr)
        return update_targets(arr)
    if kind == "attachments":
        return attachments_targets(arr)
    if kind == "remove confirmation":
        return remove_confirmation_targets(arr)
    if kind == "add record":
        if record.get("module") in MY_ORG_MODULES:
            return management_modal_confirm_targets(arr)
        return add_record_targets(arr)
    if kind == "open client name":
        return client_name_link_targets(arr)
    if kind == "client profile":
        return client_profile_tab_targets(arr)
    if kind == "upload photo":
        return upload_photo_targets(arr)
    if kind == "take photo":
        return take_photo_targets(arr)
    if kind == "create client":
        return update_targets(arr)
    if kind == "upload fingerprint":
        return upload_fingerprint_targets(arr)
    return []


def draw_arrow(draw, start, end, color, width=4):
    draw.line([start, end], fill=color, width=width)
    sx, sy = start
    ex, ey = end
    vec = np.array([ex - sx, ey - sy], dtype=float)
    length = np.linalg.norm(vec)
    if length == 0:
        return
    unit = vec / length
    perp = np.array([-unit[1], unit[0]])
    tip = np.array([ex, ey], dtype=float)
    left = tip - unit * 18 + perp * 9
    right = tip - unit * 18 - perp * 9
    draw.polygon([tuple(tip), tuple(left), tuple(right)], fill=color)


def annotate_image(src, dest, record, overrides):
    im = Image.open(src).convert("RGB")
    arr = np.array(im)
    draw = ImageDraw.Draw(im)
    font = get_font(20)
    targets = resolve_targets(record, arr, overrides)

    for x1, y1, x2, y2, label in targets:
        if not str(label).strip():
            continue
        pad = 7
        x1p = max(0, x1 - pad)
        y1p = max(0, y1 - pad)
        x2p = min(im.width - 1, x2 + pad)
        y2p = min(im.height - 1, y2 + pad)
        draw.rounded_rectangle([x1p, y1p, x2p, y2p], radius=8, outline=ACCENT, width=5)
        if not label:
            continue
        label_w = int(draw.textlength(label, font=font)) + 18
        label_h = 28
        lx = min(max(12, x1p), max(12, im.width - label_w - 12))
        ly = max(12, y1p - 48)
        draw.rounded_rectangle([lx, ly, lx + label_w, ly + label_h], radius=6, fill=ACCENT)
        draw.text((lx + 9, ly + 3), label, fill=(255, 255, 255), font=font)
        draw_arrow(draw, (lx + label_w // 2, ly + label_h), (x1p + 12, y1p + 12), ACCENT, width=4)

    im.save(dest, optimize=True)
    return len(targets)


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    data = json.loads(SRC_CATALOG.read_text(encoding="utf-8"))
    overrides = {}
    if OVERRIDES_PATH.exists():
        overrides = json.loads(OVERRIDES_PATH.read_text(encoding="utf-8"))
        overrides.pop("_comment", None)

    counts = {}
    for record in data["records"]:
        if record.get("module") == "Dashboard":
            continue
        src = SRC_DIR / record["filename"]
        dest = OUT_DIR / record["filename"]
        if src.exists():
            counts[record["filename"]] = annotate_image(src, dest, record, overrides)

    data["annotation"] = {
        "style": "Red boxes and arrows indicate the menu item or control referenced in each step.",
        "sourceFolder": str(SRC_DIR),
    }
    OUT_CATALOG.write_text(json.dumps(data, indent=2), encoding="utf-8")
    print(json.dumps({"annotated": len(counts), "folder": str(OUT_DIR)}, indent=2))


if __name__ == "__main__":
    main()
