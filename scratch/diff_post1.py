import re
import difflib

article_path = r"C:\Users\zahran\.gemini\antigravity\brain\96008217-4abb-4027-acf1-505921affcc3\all_blog_articles_md\001_tasmim-al-matbuat-fan-al-waraqiyat-al-ihtirafiya_EXPANDED_SEO.md"

with open(article_path, 'r', encoding='utf-8') as f:
    file_text = f.read()

parts = re.split(r'^---\s*$', file_text, flags=re.MULTILINE)
file_content = '---'.join(parts[2:]).strip() if len(parts) >= 3 else file_text.strip()

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    blog_data = f.read()

match = re.search(r'id:\s*"1".*?content:\s*`(.*?)`,', blog_data, re.DOTALL)
db_content = match.group(1).strip() if match else ""

normalized_db = db_content.replace('\\`', '`').replace('\\$', '$').strip()
normalized_file = file_content.strip()

db_lines = [line.strip() for line in normalized_db.split('\n') if line.strip()]
file_lines = [line.strip() for line in normalized_file.split('\n') if line.strip()]

diff = difflib.unified_diff(db_lines, file_lines, fromfile='DB_content', tofile='FILE_content', lineterm='')
diff_output = list(diff)

print(f"Total diff lines: {len(diff_output)}")
for line in diff_output[50:150]: # Print next 100 lines of diff
    print(line)
