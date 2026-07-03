#!/usr/bin/env python3
"""
Simulates Slidev's useTocTree.ts addToTree() algorithm against a deck's
resolved slide order, to verify the new heading-hierarchy convention
(one h1 = cover, h2 = section dividers, h3+ = everything else) produces
a clean flat TOC of section dividers only.

Usage: python3 scripts/verify-toc.py decks/<name>/slides.md
"""
import re
import sys
import os


def iter_slide_frontmatters(path, seen=None):
    """Yield (frontmatter_dict, first_heading_level_or_None, first_heading_text, source_file) for each slide, in order, following src: includes."""
    if seen is None:
        seen = set()
    real = os.path.realpath(path)
    if real in seen:
        return
    seen.add(real)

    with open(path) as f:
        content = f.read()

    lines = content.split('\n')
    i = 0
    n = len(lines)

    def parse_block(i):
        # expects lines[i] == '---'
        fm_lines = []
        i += 1
        while i < n and lines[i].strip() != '---':
            fm_lines.append(lines[i])
            i += 1
        i += 1  # skip closing ---
        body_lines = []
        infence = False
        while i < n and lines[i].strip() != '---':
            l = lines[i]
            if l.strip().startswith('```'):
                infence = not infence
            body_lines.append((l, infence))
            i += 1
        return fm_lines, body_lines, i

    # first block is deck-level frontmatter only if this is the root file (has theme:)
    # detect: if very first line is '---', treat first block specially only at top level
    if lines[0].strip() == '---':
        fm_lines, body_lines, i = parse_block(0)
        fm_text = '\n'.join(fm_lines)
        is_root_frontmatter = 'theme:' in fm_text or len(seen) == 1 and path == sys.argv[1]
        if is_root_frontmatter:
            # this first block's body IS the cover slide
            yield from emit_slide(fm_lines, body_lines, path, seen)
        else:
            yield from emit_slide(fm_lines, body_lines, path, seen)

    while i < n:
        if lines[i].strip() == '---':
            fm_lines, body_lines, i = parse_block(i)
            yield from emit_slide(fm_lines, body_lines, path, seen)
        else:
            i += 1


def emit_slide(fm_lines, body_lines, path, seen):
    fm_text = '\n'.join(fm_lines)
    src_match = re.search(r'^src:\s*(\S+)', fm_text, re.M)
    if src_match:
        src = src_match.group(1).strip('"\'')
        anchor = None
        if '#' in src:
            src, anchor = src.split('#', 1)
        target = os.path.normpath(os.path.join(os.path.dirname(path), src))
        sub_slides = list(iter_slide_frontmatters(target, seen))
        if anchor:
            indices = set()
            for part in anchor.split(','):
                if '-' in part:
                    a, b = part.split('-')
                    indices.update(range(int(a), int(b) + 1))
                else:
                    indices.add(int(part))
            for idx, s in enumerate(sub_slides, 1):
                if idx in indices:
                    yield s
        else:
            yield from sub_slides
        return

    hide = bool(re.search(r'^hideInToc:\s*true', fm_text, re.M))
    layout_match = re.search(r'^layout:\s*(\S+)', fm_text, re.M)
    layout = layout_match.group(1) if layout_match else 'default'

    heading_level = None
    heading_text = None
    for l, infence in body_lines:
        if infence:
            continue
        m = re.match(r'^(#{1,6})\s+(.*)', l)
        if m:
            heading_level = len(m.group(1))
            heading_text = m.group(2).strip()
            break

    yield {'level': heading_level, 'title': heading_text, 'hide': hide, 'layout': layout, 'file': path}


def add_to_tree(tree, node, level=1):
    title_level = node['level'] or level
    if title_level and title_level > level and len(tree) > 0:
        add_to_tree(tree[-1]['children'], node, level + 1)
    else:
        tree.append({'node': node, 'children': [], 'level': level})


def filter_tree(tree):
    return [
        {**item, 'children': filter_tree(item['children'])}
        for item in tree if not item['node']['hide']
    ]


def flatten_display(tree, depth=1, max_depth=2, out=None):
    if out is None:
        out = []
    if depth > max_depth:
        return out
    for item in tree:
        out.append((depth, item['node']['title']))
        flatten_display(item['children'], depth + 1, max_depth, out)
    return out


def main():
    entry = sys.argv[1]
    slides = list(iter_slide_frontmatters(entry))

    h1_slides = [s for s in slides if s['level'] == 1]
    print(f"Total slides: {len(slides)}")
    print(f"H1 headings found: {len(h1_slides)} -> {[s['title'] for s in h1_slides]}")
    if len(h1_slides) != 1:
        print("  !! WARNING: expected exactly 1 H1 (the cover)")

    titled = [s for s in slides if s['title']]
    tree = []
    for s in titled:
        add_to_tree(tree, s)
    filtered = filter_tree(tree)
    display = flatten_display(filtered, depth=1, max_depth=2)

    level2_entries = [t for d, t in display if d == 2]
    level1_entries = [t for d, t in display if d == 1]
    print(f"\nLevel-1 (tree root, hidden by CSS): {level1_entries}")
    print(f"\nLevel-2 (rendered TOC list) — {len(level2_entries)} entries:")
    for idx, t in enumerate(level2_entries, 1):
        print(f"  {idx:02d}. {t}")

    section_dividers = [s for s in slides if s['layout'] in ('section', 'section-liquid')]
    section_titles = [s['title'] for s in section_dividers]
    print(f"\nActual section-divider slides ({len(section_dividers)}): {section_titles}")

    if level2_entries == section_titles:
        print("\n[OK] TOC list matches section dividers exactly.")
    else:
        print("\n[MISMATCH] TOC list does NOT match section dividers list!")
        missing = set(section_titles) - set(level2_entries)
        extra = set(level2_entries) - set(section_titles)
        if missing:
            print(f"  Missing from TOC: {missing}")
        if extra:
            print(f"  Unexpected in TOC: {extra}")
        sys.exit(1)


if __name__ == '__main__':
    main()
