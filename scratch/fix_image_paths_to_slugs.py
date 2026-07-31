import os
import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Match all post blocks
post_pattern = re.compile(
    r'(\{\s*id:\s*"(\d+)",\s*title:\s*"[^"]+",\s*slug:\s*"([^"]+)"[^{}]+?image:\s*")([^"]+)("\s*,)',
    re.DOTALL
)

def repl(match):
    prefix = match.group(1)
    pid = match.group(2)
    slug = match.group(3)
    current_img = match.group(4)
    suffix = match.group(5)
    
    # Check if a custom WebP file exists for this slug
    expected_local_path = os.path.join('public', 'images', 'blog', f"{slug}.webp")
    if os.path.exists(expected_local_path):
        # Point to the slug-based image path
        return f'{prefix}/images/blog/{slug}.webp{suffix}'
    return match.group(0)

new_content = post_pattern.sub(repl, content)

with open('lib/blogData.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Image paths aligned to slugs where WebP files exist.")
