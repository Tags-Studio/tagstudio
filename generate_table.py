import re

with open('C:/Users/zahran/Documents/GitHub/tagstudio/lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse posts
posts = re.findall(r'\{\s*id:.*?title:\s*"(.*?)".*?slug:\s*"(.*?)".*?excerpt:\s*"(.*?)".*?image:\s*"(.*?)"', content, re.DOTALL)

print('| عنوان المقال | الملخص المقترح للتصميم | اسم الصورة المقترح |')
print('|---|---|---|')

for title, slug, excerpt, img in posts:
    if 'blog-identity.webp' in img or 'identity.avif' in img:
        # Proposed filename: slug + .jpg
        filename = f"{slug}.jpg"
        print(f'| {title} | {excerpt} | {filename} |')
