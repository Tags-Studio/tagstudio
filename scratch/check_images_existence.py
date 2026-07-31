import os
import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Regular expression to match all posts
post_pattern = re.compile(
    r'\{\s*id:\s*"(\d+)",\s*title:\s*"([^"]+)",\s*slug:\s*"([^"]+)"[^{}]+?image:\s*"([^"]+)"',
    re.DOTALL
)

posts = post_pattern.findall(content)
print(f"Total parsed posts: {len(posts)}")

missing_images = []
exists_count = 0
placeholder_count = 0

for pid, title, slug, img in posts:
    if img.startswith('/images/blog/'):
        # Check if the file exists locally
        rel_path = img.lstrip('/')
        if not os.path.exists(rel_path):
            missing_images.append((pid, title, slug, img))
        else:
            exists_count += 1
    else:
        placeholder_count += 1

print(f"Posts with existing custom images: {exists_count}")
print(f"Posts with placeholder images: {placeholder_count}")
print(f"Posts with missing custom images ({len(missing_images)}):")
for pid, title, slug, img in missing_images:
    print(f" - ID {pid}: {title[:45]}... (slug: {slug}) (img: {img})")
