import os
import re

articles_dir = r"C:\Users\zahran\.gemini\antigravity\brain\96008217-4abb-4027-acf1-505921affcc3\all_blog_articles_md"

for filename in sorted(os.listdir(articles_dir)):
    if not filename.endswith("_v3.md"):
        continue
    filepath = os.path.join(articles_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Let's find matches for tables
    matches = list(re.finditer(r'##\s*(مقترحات الصور|قائمة الصور|Meta Tags|الصور والـ Alt Text|الصور المقترحة|Meta Title)', content, re.IGNORECASE))
    if matches:
        print(f"File: {filename}")
        for match in matches:
            start = max(0, match.start() - 100)
            end = min(len(content), match.end() + 200)
            print(f"--- MATCH: {match.group(0)} ---")
            print(content[start:end])
            print("====================================")
