import os

src_dir = r"G:\MY FUTURE\Free Lancing\TAG\Content\thumbn\125 Design 16-9"
jpg_files = [f for f in os.listdir(src_dir) if f.endswith('.jpg')]

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for filename in sorted(jpg_files):
    slug = os.path.splitext(filename)[0]
    expected_path = f'image: "/images/blog/{slug}.webp"'
    if expected_path not in content:
        print(f"Missing from blogData.ts: {slug} (image file: {filename})")
