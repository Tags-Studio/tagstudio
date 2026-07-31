import os
import re

articles_dir = r"C:\Users\zahran\.gemini\antigravity\brain\96008217-4abb-4027-acf1-505921affcc3\all_blog_articles_md"
v3_files = [f for f in os.listdir(articles_dir) if f.endswith('_v3.md')]

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    blog_content = f.read()

for f in sorted(v3_files):
    post_id = int(f.split('_')[0])
    with open(os.path.join(articles_dir, f), 'r', encoding='utf-8') as af:
        article_text = af.read()
    parts = re.split(r'^---\s*$', article_text, flags=re.MULTILINE)
    if len(parts) >= 3:
        front_matter = parts[1]
        metadata = {}
        for line in front_matter.strip().split('\n'):
            if ':' in line:
                key, val = line.split(':', 1)
                metadata[key.strip()] = val.strip().strip('"').strip("'")
        title = metadata.get('title', '')
        if title and title not in blog_content:
            print(f"Missing replacement for post {post_id}: {title} ({f})")
print("Check complete!")
