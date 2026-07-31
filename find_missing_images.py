import re

with open('C:/Users/zahran/Documents/GitHub/tagstudio/lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse posts
posts = re.findall(r'\{\s*id:\s*"(.*?)".*?title:\s*"(.*?)".*?slug:\s*"(.*?)".*?excerpt:\s*"(.*?)".*?image:\s*"(.*?)"', content, re.DOTALL)

for pid, title, slug, excerpt, img in posts:
    print(f'[{pid}] {img} | {slug}')
