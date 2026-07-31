import os
import re

images_dir = r"G:\MY FUTURE\Free Lancing\TAG\Content\thumbn\125 Design 16-9"
jpg_files = [f for f in os.listdir(images_dir) if f.endswith('.jpg')]

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    blog_content = f.read()

# Find all slugs and their indices in blogData.ts
slugs_in_blog = re.findall(r'slug:\s*"([^"]+)"', blog_content)

print(f"Total JPG files in source directory: {len(jpg_files)}")
print(f"Total slugs in blogData.ts: {len(slugs_in_blog)}")

matched = []
unmatched_jpg = []

for jpg in jpg_files:
    slug = os.path.splitext(jpg)[0]
    if slug in slugs_in_blog:
        matched.append((jpg, slug))
    else:
        unmatched_jpg.append((jpg, slug))

print(f"Matched: {len(matched)}")
print(f"Unmatched JPGs ({len(unmatched_jpg)}):")
for jpg, slug in unmatched_jpg:
    print(f" - {jpg} (Slug: {slug})")
