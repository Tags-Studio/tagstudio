import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

image_matches = re.findall(r'image:\s*"([^"]+)"', content)
print("Total images defined in blogData.ts:", len(image_matches))
print("First 15 image paths:")
for img in image_matches[:15]:
    print(" -", img)
