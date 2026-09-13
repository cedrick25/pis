"""Insert Grant Permission and Update Permission steps into the v5 end-user manual.

New entries are Arial 12 pt red. Screenshot framing matches the 1920x1080
admin recapture set. Existing User Roles text is left unchanged.
"""

from __future__ import annotations

import shutil
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Inches, Pt, RGBColor
from docx.text.paragraph import Paragraph

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(r"e:\Downloads\v5_PIS_End_User_Manual_Revision_20260911_courtesy_fix.docx")
BACKUP = Path(r"e:\Downloads\v5_PIS_End_User_Manual_Revision_20260911_courtesy_fix_backup_before_role_permission.docx")
OUT = SRC
SHOT_DIR = ROOT / "PIS_End_User_Manual_Screenshots_20260911" / "14-user-roles"
GRANT_IMG = SHOT_DIR / "067-user-roles-grant-permission-grant-permission.png"
UPDATE_IMG = SHOT_DIR / "068-user-roles-update-permission-update-permission.png"

RED = RGBColor(0xFF, 0x00, 0x00)
MAX_WIDTH_IN = 6.5


def set_run_red_12(run, text: str, bold: bool = False, italic: bool = False):
    run.text = text
    run.bold = bold
    run.italic = italic
    run.font.name = "Arial"
    run.font.size = Pt(12)
    run.font.color.rgb = RED


def add_red_runs(paragraph: Paragraph, text: str, italic: bool = False):
    """Split on **markers** so UI labels stay bold, all in red 12 pt."""
    parts = str(text).split("**")
    for idx, part in enumerate(parts):
        if not part:
            continue
        run = paragraph.add_run()
        set_run_red_12(run, part, bold=(idx % 2 == 1), italic=italic)


def make_heading(doc: Document, title: str) -> Paragraph:
    p = doc.add_paragraph(style="Heading 2")
    run_title = p.add_run(title)
    run_title.font.name = "Arial"
    run_title.font.size = Pt(12)
    run_title.font.color.rgb = RED
    run_space = p.add_run(" ")
    run_space.font.name = "Arial"
    run_space.font.size = Pt(12)
    run_space.font.color.rgb = RED
    run_admin = p.add_run("(For Administrator of the System)")
    run_admin.font.name = "Arial"
    run_admin.font.size = Pt(12)
    run_admin.font.color.rgb = RED
    return p


def make_intro(doc: Document, text: str) -> Paragraph:
    p = doc.add_paragraph()
    p.style = "Normal"
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.space_after = Pt(3)
    add_red_runs(p, text)
    return p


def make_step(doc: Document, number: int, text: str) -> Paragraph:
    p = doc.add_paragraph()
    p.style = "Normal"
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.left_indent = Inches(0.25)
    p.paragraph_format.first_line_indent = Inches(-0.25)
    p.paragraph_format.space_after = Pt(3)
    add_red_runs(p, f"{number}. {text}")
    return p


def make_caption(doc: Document, text: str) -> Paragraph:
    p = doc.add_paragraph()
    p.style = "Normal"
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(10)
    add_red_runs(p, text, italic=True)
    return p


def make_picture(doc: Document, image_path: Path) -> Paragraph:
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(2)
    run = p.add_run()
    run.add_picture(str(image_path), width=Inches(MAX_WIDTH_IN))
    return p


def move_element_before(ref_para: Paragraph, element):
    ref_para._p.addprevious(element)


def insert_blocks_before(ref_para: Paragraph, created: list[Paragraph]):
    for item in created:
        move_element_before(ref_para, item._p)


def find_field_office_heading(doc: Document) -> Paragraph:
    for para in doc.paragraphs:
        if para.style and para.style.name.startswith("Heading") and para.text.strip().startswith("Field Office (For Administrator"):
            return para
    raise SystemExit("Could not find Field Office heading to insert before.")


def find_user_roles_filter_step(doc: Document) -> Paragraph | None:
    """List-page filter step that sits just before the User Roles list screenshot."""
    paras = list(doc.paragraphs)
    for i, para in enumerate(paras):
        text = para.text.strip()
        if text.startswith("4.") and "inline search fields" in text and "drop-down filters" in text:
            nxt = paras[i + 1].text.strip() if i + 1 < len(paras) else ""
            if nxt == "User Roles list page" or (i + 2 < len(paras) and paras[i + 2].text.strip() == "User Roles list page"):
                return para
            # Confirm we are still in the User Roles list section, not Field Office.
            window = " ".join(p.text for p in paras[max(0, i - 8) : i + 1])
            if "open User Roles" in window:
                return para
    return None


def already_inserted(doc: Document) -> bool:
    return any("User Roles (Grant Permission)" in (p.text or "") for p in doc.paragraphs)


def build_sections(doc: Document) -> list[Paragraph]:
    blocks: list[Paragraph] = []

    blocks.append(make_heading(doc, "User Roles (Grant Permission)"))
    blocks.append(make_intro(
        doc,
        "Use **Grant Permission** to assign the system permissions that belong to a selected role. "
        "This controls which menus and actions users with that role can see and use.",
    ))
    blocks.append(make_step(
        doc, 1,
        "On the **User Roles** list page, locate the role that needs permissions assigned. "
        "The role name is shown in the **Name** column.",
    ))
    blocks.append(make_step(
        doc, 2,
        "In the **Permission** column for that row, click **Grant Permission**.",
    ))
    blocks.append(make_step(
        doc, 3,
        "Wait for the **Grant Permission** modal dialog box to appear on the screen.",
    ))
    blocks.append(make_step(
        doc, 4,
        "Review the permission list inside the modal dialog. Each module, sub-module, and action has a switch. "
        "Turn a switch on to allow that permission for the role, or turn it off to withhold that permission.",
    ))
    blocks.append(make_step(
        doc, 5,
        "When a module switch is turned on or off, the related sub-modules and actions under that module follow the same setting.",
    ))
    blocks.append(make_step(
        doc, 6,
        "The switches may already be turned on when the dialog opens. Review each item and turn off any permission that this role should not have.",
    ))
    blocks.append(make_step(
        doc, 7,
        "Click **Confirm** inside the modal dialog to submit the permission assignment.",
    ))
    blocks.append(make_step(
        doc, 8,
        "If the system displays a confirmation prompt, review the information and click **Confirm** to save the entry.",
    ))
    blocks.append(make_step(
        doc, 9,
        "Wait for the success message and for the modal dialog to close.",
    ))
    blocks.append(make_picture(doc, GRANT_IMG))
    blocks.append(make_caption(doc, "User Roles (Grant Permission)"))

    blocks.append(make_heading(doc, "User Roles (Update Permission)"))
    blocks.append(make_intro(
        doc,
        "Use **Update Permission** when a role already has permissions and those permissions need to be changed. "
        "The dialog shows the switches currently assigned to that role.",
    ))
    blocks.append(make_step(
        doc, 1,
        "On the **User Roles** list page, locate the role whose permissions need to be changed.",
    ))
    blocks.append(make_step(
        doc, 2,
        "In the **Permission** column for that row, click **Update Permission**.",
    ))
    blocks.append(make_step(
        doc, 3,
        "Wait for the **Update Permission** modal dialog box to appear on the screen.",
    ))
    blocks.append(make_step(
        doc, 4,
        "Review the current switches. Switches that are on are already granted to the role. Switches that are off are not granted.",
    ))
    blocks.append(make_step(
        doc, 5,
        "Turn switches on or off to add or remove permissions for that role. "
        "When a module switch is changed, the related sub-modules and actions under that module follow the same setting.",
    ))
    blocks.append(make_step(
        doc, 6,
        "If the permission list is longer than the dialog, scroll inside the dialog to review the remaining modules.",
    ))
    blocks.append(make_step(
        doc, 7,
        "Click **Confirm** inside the modal dialog to submit the changes.",
    ))
    blocks.append(make_step(
        doc, 8,
        "If the system displays a confirmation prompt, review the information and click **Confirm** to save the updated record.",
    ))
    blocks.append(make_step(
        doc, 9,
        "Wait for the modal dialog to close.",
    ))
    blocks.append(make_picture(doc, UPDATE_IMG))
    blocks.append(make_caption(doc, "User Roles (Update Permission)"))
    return blocks


def add_list_page_permission_step(doc: Document) -> bool:
    target = find_user_roles_filter_step(doc)
    if target is None:
        print("WARN: could not find User Roles list filter step; skipping extra list step")
        return False
    following = target._p.getnext()
    # Avoid inserting twice.
    if following is not None:
        nxt_text = "".join(following.itertext()) if hasattr(following, "itertext") else ""
        if "Grant Permission" in nxt_text and "Permission column" in nxt_text:
            return False
    step = make_step(
        doc, 5,
        "In the **Permission** column, use **Grant Permission** to assign permissions to a role, "
        "or **Update Permission** to change the permissions already assigned to that role. "
        "The steps are in the **Grant Permission** and **Update Permission** sections that follow.",
    )
    target._p.addnext(step._p)
    return True


def main():
    if not SRC.exists():
        raise SystemExit(f"Manual not found: {SRC}")
    if not GRANT_IMG.exists() or not UPDATE_IMG.exists():
        raise SystemExit(f"Missing screenshots: {GRANT_IMG.exists()} {UPDATE_IMG.exists()}")

    if not BACKUP.exists():
        shutil.copy2(SRC, BACKUP)
        print("backup", BACKUP)

    doc = Document(str(SRC))
    if already_inserted(doc):
        print("Grant Permission section already present; not inserting twice")
        return

    added_step = add_list_page_permission_step(doc)
    print("list page extra step", added_step)

    field_office = find_field_office_heading(doc)
    blocks = build_sections(doc)
    insert_blocks_before(field_office, blocks)
    # build_sections appended at end of body; moving them before Field Office
    # leaves empty leftover copies at the document end — remove those originals
    # after the move. insert_blocks_before uses addprevious which MOVES the
    # element, so the end copies should already be gone.

    doc.save(str(OUT))
    print("saved", OUT)
    print("grant", GRANT_IMG.name)
    print("update", UPDATE_IMG.name)


if __name__ == "__main__":
    main()
