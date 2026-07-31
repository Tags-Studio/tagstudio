import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Regular expression to match all posts
post_pattern = re.compile(
    r'\{\s*id:\s*"(\d+)",\s*title:\s*"([^"]+)",\s*slug:\s*"([^"]+)"[^{}]+?image:\s*"([^"]+)"',
    re.DOTALL
)

posts = post_pattern.findall(content)
print(f"Parsed {len(posts)} posts.")

# Let's print the first 20 posts to inspect
for pid, title, slug, img in posts[:20]:
    print(f"ID {pid} | Slug: {slug} | Image: {img} | Title: {title[:40]}...")
