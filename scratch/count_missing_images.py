import os
import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

posts = re.findall(r'image:\s*"([^"]+)"', content)
missing = []
for img in posts:
    if img.startswith('/images/blog/'):
        # Correct path on disk is public/images/blog/...
        local_path = os.path.join('public', img.lstrip('/'))
        if not os.path.exists(local_path):
            missing.append(img)

print("Total custom images referenced:", len([p for p in posts if p.startswith('/images/blog/')]))
print("Missing custom images count:", len(missing))
print("First 20 missing custom images:")
for img in missing[:20]:
    print(" -", img)
