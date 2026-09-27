# Print chapters of W. H. S. Jones's Loeb translation (Perseus TEI) as YAML
# `passages:` for a src/content/corpus/*.md entry.
#
#   python scripts/extract-jones.py epidemics BOOK.SECTION > out.yaml
#       Constitution 1 = 1.1   2 = 1.2   3 = 1.3   4 = 3.2
#   python scripts/extract-jones.py awp FIRST-LAST > out.yaml
#       Airs = 3-6   Waters = 7-9   Seasons = 10-11
import sys, urllib.request, xml.etree.ElementTree as ET

WORKS = {"epidemics": "tlg006", "awp": "tlg002"}
T = "{http://www.tei-c.org/ns/1.0}"
work, ref = sys.argv[1], sys.argv[2]
tlg = WORKS[work]
URL = ("https://raw.githubusercontent.com/PerseusDL/canonical-greekLit/"
       f"master/data/tlg0627/{tlg}/tlg0627.{tlg}.perseus-eng4.xml")

root = ET.fromstring(urllib.request.urlopen(URL).read())
body = root.find(f".//{T}body")

if work == "epidemics":
    # Book > section (a constitution) > subsection (Jones's chapter).
    book, section = ref.split(".")
    sec = body.find(f".//{T}div[@n='{book}']/{T}div[@n='{section}']")
    chapters = sec.findall(f"{T}div")
else:
    # AWP has no books: chapters are the top-level sections.
    first, last = (int(x) for x in ref.split("-"))
    chapters = [d for d in body.findall(f"{T}div/{T}div")
                if first <= int(d.get("n")) <= last]

def text(el):
    """Running text of an element, skipping Jones's footnotes (<note>)."""
    out = [el.text or ""]
    for child in el:
        if child.tag != T + "note":
            out.append(text(child))
        out.append(child.tail or "")  # text after a note still belongs to the sentence
    return "".join(out)

# Loeb page range: the last page break before the first chapter, plus any inside.
pages, current = [], None
for el in body.iter():
    if el is chapters[0]:
        pages.append(current)
    if el.tag == T + "pb":
        current = el.get("n")
pages += [pb.get("n") for ch in chapters for pb in ch.iter(T + "pb")]

sys.stdout.reconfigure(encoding="utf-8")
print(f"# Loeb pages: {pages[0]}–{pages[-1]}  (check against the printed volume)")
print("passages:")
for ch in chapters:
    paras = [" ".join(text(p).split()) for p in ch.findall(f"{T}p")
             if p.get("rend") != "align(center)"]  # skip centered headings
    print(f'  - chapter: "{ch.get("n")}"')
    print("    text: |")
    print("\n\n".join("      " + p for p in paras if p))
