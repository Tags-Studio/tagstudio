import re

# Read the expanded SEO article content
article_path = r"C:\Users\zahran\.gemini\antigravity\brain\96008217-4abb-4027-acf1-505921affcc3\all_blog_articles_md\001_tasmim-al-matbuat-fan-al-waraqiyat-al-ihtirafiya_EXPANDED_SEO.md"

with open(article_path, 'r', encoding='utf-8') as f:
    file_text = f.read()

# Strip front matter from file_text to get content
parts = re.split(r'^---\s*$', file_text, flags=re.MULTILINE)
if len(parts) >= 3:
    file_content = '---'.join(parts[2:]).strip()
else:
    file_content = file_text.strip()

# Now extract the content of post 1 from lib/blogData.ts
with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    blog_data = f.read()

# Locate post 1 content inside the template literal
# Post 1 starts at id: "1"
match = re.search(r'id:\s*"1".*?content:\s*`(.*?)`,', blog_data, re.DOTALL)
if match:
    db_content = match.group(1).strip()
else:
    print("Could not find post 1 content in blogData.ts")
    db_content = ""

# Normalize backticks and variable escapes in db_content for comparison
normalized_db = db_content.replace('\\`', '`').replace('\\$', '$').strip()
normalized_file = file_content.strip()

if normalized_db == normalized_file:
    print("THEY ARE IDENTICAL (excluding template literal escaping)!")
else:
    print("THEY ARE DIFFERENT!")
    # Print length
    print(f"db length: {len(normalized_db)}, file length: {len(normalized_file)}")
    # Print first difference
    diff_idx = 0
    for i, (c1, c2) in enumerate(zip(normalized_db, normalized_file)):
        if c1 != c2:
            diff_idx = i
            break
    print(f"First diff at char {diff_idx}:")
    print(f"DB:   {repr(normalized_db[diff_idx:diff_idx+100])}")
    print(f"FILE: {repr(normalized_file[diff_idx:diff_idx+100])}")
