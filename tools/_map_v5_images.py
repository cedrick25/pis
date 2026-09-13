from docx import Document
from docx.oxml.ns import qn
from docx.text.paragraph import Paragraph
from docx.table import Table

doc_path = r"e:\Downloads\v5_PIS_End_User_Manual_Revision_20260910.docx"
doc = Document(doc_path)

def iter_block_items(parent):
    parent_elm = parent.element.body
    for child in parent_elm.iterchildren():
        if child.tag == qn("w:p"):
            yield Paragraph(child, parent)
        elif child.tag == qn("w:tbl"):
            yield Table(child, parent)

img_idx = 0
items = []
for block in iter_block_items(doc):
    if isinstance(block, Paragraph):
        text = block.text.strip()
        blips = block._element.findall(".//" + qn("a:blip"))
        if blips:
            for blip in blips:
                embed = blip.get(qn("r:embed"))
                rel = doc.part.rels[embed]
                img_idx += 1
                ext = block._element.findall(".//" + qn("a:ext"))
                size = None
                if ext:
                    cx = int(ext[0].get("cx", 0))
                    cy = int(ext[0].get("cy", 0))
                    size = (round(cx / 914400, 2), round(cy / 914400, 2))
                items.append({"type": "image", "n": img_idx, "ref": rel.target_ref, "size_in": size})
        elif text:
            items.append({"type": "text", "text": text[:180]})

print("Total images:", img_idx)
last_texts = []
for it in items:
    if it["type"] == "text":
        last_texts.append(it["text"])
        if len(last_texts) > 5:
            last_texts = last_texts[-5:]
    elif it["type"] == "image":
        # caption is usually AFTER the image
        ctx_before = " || ".join(last_texts[-2:])
        print("IMG%03d %s size=%s BEFORE=%s" % (it["n"], it["ref"], it["size_in"], ctx_before))

# Also dump all captions that follow images
print("\n=== CAPTION AFTER IMAGE ===")
blocks = list(iter_block_items(doc))
n = 0
for i, block in enumerate(blocks):
    if not isinstance(block, Paragraph):
        continue
    blips = block._element.findall(".//" + qn("a:blip"))
    if not blips:
        continue
    n += 1
    caption = ""
    for nxt in blocks[i + 1 : i + 4]:
        if isinstance(nxt, Paragraph) and nxt.text.strip() and not nxt._element.findall(".//" + qn("a:blip")):
            caption = nxt.text.strip()
            break
    print("%03d | %s" % (n, caption))
