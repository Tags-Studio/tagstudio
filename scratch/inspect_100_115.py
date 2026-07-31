import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

matches = re.findall(r'\{\s*id:\s*"(\d+)",\s*title:\s*"([^"]+)",\s*slug:\s*"([^"]+)"', content)
for pid, title, slug in matches:
    if 100 <= int(pid) <= 115:
        print(f"ID {pid} | Slug: {slug} | Title: {title[:50]}...")
