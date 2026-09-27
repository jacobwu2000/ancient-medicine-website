# Print one Epidemics constitution from Jones's translation (Perseus TEI) as
# YAML `passages:` for src/content/corpus/constitution-N.md.
#
#   python scripts/extract-constitution.py BOOK SECTION > constitution.yaml
#   Constitution 1 = 1 1   2 = 1 2   3 = 1 3   4 = 3 2
import sys, urllib.request, xml.etree.ElementTree as ET

URL = ("https://raw.githubusercontent.com/PerseusDL/canonical-greekLit/"
       "master/data/tlg0627/tlg006/tlg0627.tlg006.perseus-eng4.xml")
T = "{http://www.tei-c.org/ns/1.0}"
book, section = sys.argv[1], sys.argv[2]

root = ET.fromstring(urllib.request.urlopen(URL).read())
body = root.find(f".//{T}body")
sec = body.find(f".//{T}div[@n='{book}']/{T}div[@n='{section}']")

def text(el):
    """Running text of an element, skipping Jones's footnotes (<note>)."""
    out = [el.text or ""]
    for child in el:
        if child.tag != T + "note":
            out.append(text(child))
        out.append(child.tail or "")  # text after a note still belongs to the sentence
    return "".join(out)

# Loeb page range: the last page break before the section, plus any inside it.
pages, current = [], None
for el in body.iter():
    if el is sec:
        pages.append(current)
    if el.tag == T + "pb":
        current = el.get("n")
pages += [pb.get("n") for pb in sec.iter(T + "pb")]

sys.stdout.reconfigure(encoding="utf-8")
print(f"# Loeb pages: {pages[0]}–{pages[-1]}  (check against the printed volume)")
print("passages:")
for ch in sec.findall(f"{T}div"):
    paras = [" ".join(text(p).split()) for p in ch.findall(f"{T}p")
             if p.get("rend") != "align(center)"]  # skip centered headings
    print(f'  - chapter: "{ch.get("n")}"')
    print("    text: |")
    print("\n\n".join("      " + p for p in paras if p))
