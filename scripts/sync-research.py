#!/usr/bin/env python3
"""Sync a research paper from the AITT-Research workspace into the site.

Usage: python3 scripts/sync-research.py <path-to-source-md>

Transforms applied for the site copy:
- the body's 版本紀錄 table becomes a `changelog:` frontmatter array
  (rendered by VersionHistory.astro)
- the 版本紀錄 and 建議引用格式 sections are removed from the body
  (rendered by VersionHistory.astro / CitationBlock.astro instead)

Figures are copied from the source's figures/ directory.
"""
import re
import shutil
import sys
from pathlib import Path

SITE_DIR = Path(__file__).resolve().parent.parent / 'src' / 'content' / 'research'


def main() -> None:
    src = Path(sys.argv[1]).resolve()
    text = src.read_text()

    m = re.search(r'## 版本紀錄\n+\|.*\n\|[-| ]*\n((?:\|.*\n)+)', text)
    if not m:
        sys.exit('版本紀錄 table not found in source')
    entries = []
    for row in m.group(1).strip().splitlines():
        version, date, note = [c.strip() for c in row.strip('|').split('|')]
        note = note.replace('\\', '\\\\').replace('"', '\\"')
        entries.append(
            f'  - version: {version}\n'
            f'    date: {date}\n'
            f'    note: "{note}"'
        )
    changelog = 'changelog:\n' + '\n'.join(entries) + '\n'

    # inject changelog at the end of the frontmatter
    text = re.sub(r'\n---\n', '\n' + changelog + '---\n', text, count=1)

    # drop sections now rendered by components (keep the © line after them)
    start = text.index('## 版本紀錄')
    end = text.index('---\n\n©')
    text = text[:start] + text[end:]

    dest = SITE_DIR / src.name
    dest.write_text(text)
    print(f'wrote {dest} ({len(entries)} changelog entries)')

    src_figs = src.parent / 'figures'
    if src_figs.is_dir():
        dest_figs = SITE_DIR / 'figures'
        dest_figs.mkdir(exist_ok=True)
        for fig in src_figs.glob('*.svg'):
            shutil.copy2(fig, dest_figs / fig.name)
        print(f'copied {len(list(src_figs.glob("*.svg")))} figures')


if __name__ == '__main__':
    main()
