import re

# Read the expanded SEO article content
article_path = r"C:\Users\zahran\.gemini\antigravity\brain\96008217-4abb-4027-acf1-505921affcc3\all_blog_articles_md\001_tasmim-al-matbuat-fan-al-waraqiyat-al-ihtirafiya_EXPANDED_SEO.md"

with open(article_path, 'r', encoding='utf-8') as f:
    article_text = f.read()

# Separate front matter and content
parts = re.split(r'^---\s*$', article_text, flags=re.MULTILINE)
if len(parts) >= 3:
    front_matter = parts[1]
    content_body = '---'.join(parts[2:]).strip()
else:
    raise ValueError("Could not parse front matter from article")

# Extract metadata from front matter
title = ""
excerpt = ""
for line in front_matter.strip().split('\n'):
    if line.startswith('title:'):
        title = line.replace('title:', '', 1).strip().strip('"').strip("'")
    elif line.startswith('excerpt:'):
        excerpt = line.replace('excerpt:', '', 1).strip().strip('"').strip("'")

# Escape backticks and dollar signs for template literal
escaped_content = content_body.replace('`', '\\`').replace('$', '\\$')

# Read original blogData.ts
with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Locate post 1 boundaries (0-indexed)
start_idx = None
end_idx = None
for idx, line in enumerate(lines):
    if 'id: "1"' in line and start_idx is None:
        # Find the opening brace { above it
        i = idx
        while i >= 0:
            if '{' in lines[i]:
                start_idx = i
                break
            i -= 1
    if 'id: "2"' in line and end_idx is None:
        # Find the closing brace }, above it
        i = idx
        while i >= 0:
            if '},' in lines[i]:
                end_idx = i
                break
            i -= 1

if start_idx is None or end_idx is None:
    raise ValueError(f"Could not locate post 1 boundaries. start_idx={start_idx}, end_idx={end_idx}")

print(f"Replacing lines {start_idx+1} to {end_idx+1} in lib/blogData.ts")

# Format the new post object
new_post_object = f"""{{
    id: "1",
    title: "{title}",
    slug: "tasmim-al-matbuat-fan-al-waraqiyat-al-ihtirafiya",
    excerpt: "{excerpt}",
    image: "/images/blog-print.webp",
    category: "طباعة",
    author: "تاج ستوديو",
    date: "2024-05-01",
    readTime: 15,
    content: `{escaped_content}`,
  }},
"""

# Replace the block in the lines array
new_lines = lines[:start_idx] + [new_post_object] + lines[end_idx+1:]

# Write back to lib/blogData.ts
with open('lib/blogData.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Replacement successful!")
