import os
import re

dir_path = r"C:\Users\zahran\.gemini\antigravity\brain\96008217-4abb-4027-acf1-505921affcc3\all_blog_articles_md"
v3_files = [f for f in os.listdir(dir_path) if 'v3.md' in f]

# Extract the ID prefix from v3 files
present_ids = set()
for f in v3_files:
    m = re.match(r'^(\d+)_', f)
    if m:
        present_ids.add(int(m.group(1)))

# Let's find the max ID present
max_id = max(present_ids) if present_ids else 0
print(f"Max V3 ID generated so far: {max_id}")

skipped_ids = []
for i in range(1, max_id + 1):
    if i not in present_ids:
        skipped_ids.append(i)

print(f"Skipped/Missing V3 IDs between 1 and {max_id}:")
print(skipped_ids)

# Let's also load the titles for these skipped IDs from lib/blogData.ts
with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

post_pattern = re.compile(
    r'\{\s*id:\s*"(\d+)",\s*title:\s*"([^"]+)",\s*slug:\s*"([^"]+)"',
    re.DOTALL
)
posts = {int(pid): (title, slug) for pid, title, slug in post_pattern.findall(content)}

print("\nDetails of skipped/missing posts:")
for pid in skipped_ids:
    if pid in posts:
        title, slug = posts[pid]
        print(f" - ID {pid}: {title} (slug: {slug})")
    else:
        print(f" - ID {pid}: Not found in blogData.ts")
