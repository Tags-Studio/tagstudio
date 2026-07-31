import os
import re

articles_dir = r"C:\Users\zahran\.gemini\antigravity\brain\96008217-4abb-4027-acf1-505921affcc3\all_blog_articles_md"

# Pattern to match from the '---' before the image suggestions table
# all the way to the '## الخلاصة' or '## الخاتمة' section.
# We want to keep the conclusion.
pattern = re.compile(
    r'(?s)---\s*##\s*(مقترحات الصور|قائمة الصور|الصور والـ Alt|الصور المقترحة|الصور والـ alt|Meta Tags مقترحة).*?(?=##\s*(الخلاصة|الخاتمة|الخلاصة والـ CTA|الخلاصة مع الـ CTA|ملخص))',
    re.IGNORECASE
)

for filename in sorted(os.listdir(articles_dir)):
    if not filename.endswith("_v3.md"):
        continue
    filepath = os.path.join(articles_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Try search
    match = pattern.search(content)
    if match:
        # Let's see what is matched
        matched_text = match.group(0)
        # Check if replacement works
        cleaned = pattern.sub('', content)
        print(f"File: {filename} -> Match found, size reduced from {len(content)} to {len(cleaned)} characters.")
    else:
        # If no match, check if it contains the tables anyway
        if 'مقترحات الصور' in content or 'Meta Tags' in content:
            print(f"File: {filename} -> HAS TABLES BUT REGEX FAILED TO MATCH!")
        else:
            print(f"File: {filename} -> Clean (No tables or meta tags found).")
