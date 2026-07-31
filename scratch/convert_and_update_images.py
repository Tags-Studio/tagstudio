import os
import re
from PIL import Image

src_dir = r"G:\MY FUTURE\Free Lancing\TAG\Content\thumbn\125 Design 16-9"
dst_dir = r"public/images/blog"

if not os.path.exists(dst_dir):
    os.makedirs(dst_dir)

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

jpg_files = [f for f in os.listdir(src_dir) if f.endswith('.jpg')]
print(f"Starting conversion of {len(jpg_files)} images...")

converted_count = 0
updated_count = 0

for filename in sorted(jpg_files):
    slug = os.path.splitext(filename)[0]
    src_path = os.path.join(src_dir, filename)
    dst_path = os.path.join(dst_dir, f"{slug}.webp")
    
    # 1. Convert and compress image to WebP format
    try:
        with Image.open(src_path) as img:
            # Save as WebP with 85% quality to make it lightweight
            img.save(dst_path, "WEBP", quality=85, method=6)
        converted_count += 1
    except Exception as e:
        print(f"Error converting {filename}: {e}")
        continue
        
    # 2. Update blogData.ts content
    slug_pattern = f'slug: "{slug}"'
    idx = content.find(slug_pattern)
    if idx != -1:
        # Find the object boundaries
        start_idx = content.rfind('{', 0, idx)
        end_idx = content.find('},', idx)
        if end_idx != -1:
            end_idx += 2 # include '},'
            post_block = content[start_idx:end_idx]
            
            # Replace the image field in this block
            new_block, count = re.subn(r'image:\s*["\'][^"\']+["\']', f'image: "/images/blog/{slug}.webp"', post_block)
            if count > 0:
                content = content[:start_idx] + new_block + content[end_idx:]
                updated_count += 1
            else:
                print(f"Warning: image field not found in post block for slug: {slug}")
    else:
        print(f"Warning: slug '{slug}' not found in blogData.ts")

# Write updated content back to blogData.ts
with open('lib/blogData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nSummary:")
print(f"Successfully converted and compressed: {converted_count} images.")
print(f"Successfully updated image paths in blogData.ts: {updated_count} posts.")
