import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

images = re.findall(r'image:\s*"([^"]+)"', content)
print("Total images defined in blogData.ts:", len(images))
print("Placeholder /images/blog-...:", sum(1 for img in images if '/images/blog-' in img))
print("Custom /images/blog/...:", sum(1 for img in images if '/images/blog/' in img))

# Print posts that still have placeholder images
post_matches = re.findall(r'\{\s*id:\s*"(\d+)",\s*title:\s*"([^"]+)",\s*slug:\s*"([^"]+)"[^{}]+?image:\s*"([^"]+)"', content, re.DOTALL)
placeholders = []
for pid, title, slug, img in post_matches:
    if '/images/blog-' in img:
        placeholders.append((pid, title, slug, img))

print(f"\nRemaining posts with placeholders ({len(placeholders)}):")
for pid, title, slug, img in placeholders[:20]:
    print(f" - ID {pid}: {title} (slug: {slug}) (img: {img})")
