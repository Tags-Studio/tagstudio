import sys
import re
import os

def replace_post(post_id):
    post_id_str = str(post_id)
    print(f"Starting replacement for post {post_id_str}...")

    # Find the V3 file in the directory
    articles_dir = r"C:\Users\zahran\.gemini\antigravity\brain\96008217-4abb-4027-acf1-505921affcc3\all_blog_articles_md"
    v3_file = None
    prefix = f"{post_id_str.zfill(3)}_"
    for filename in os.listdir(articles_dir):
        if filename.startswith(prefix) and filename.endswith("_v3.md"):
            v3_file = os.path.join(articles_dir, filename)
            break

    if not v3_file:
        print(f"Error: Could not find V3 file for post {post_id_str} in {articles_dir}")
        return False

    print(f"Found V3 file: {v3_file}")

    with open(v3_file, 'r', encoding='utf-8') as f:
        article_text = f.read()

    # Separate front matter and content
    parts = re.split(r'^---\s*$', article_text, flags=re.MULTILINE)
    if len(parts) >= 3:
        front_matter = parts[1]
        content_body = '---'.join(parts[2:]).strip()
    else:
        print("Error: Could not parse front matter from article")
        return False

    # Extract metadata from front matter
    metadata = {}
    for line in front_matter.strip().split('\n'):
        if ':' in line:
            key, val = line.split(':', 1)
            metadata[key.strip()] = val.strip().strip('"').strip("'")

    title = metadata.get('title', '')
    slug = metadata.get('slug', '')
    excerpt = metadata.get('excerpt', '')
    image = metadata.get('image', '')
    category = metadata.get('category', '')
    date = metadata.get('date', '2024-09-02')

    # Escape backticks and dollar signs for template literal
    escaped_content = content_body.replace('`', '\\`').replace('$', '\\$')

    # Read original blogData.ts
    with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Locate post boundaries (0-indexed)
    start_idx = None
    end_idx = None
    next_id = str(post_id + 1)

    for idx, line in enumerate(lines):
        if f'id: "{post_id_str}"' in line and start_idx is None:
            # Find the opening brace { above it
            i = idx
            while i >= 0:
                if '{' in lines[i]:
                    start_idx = i
                    break
                i -= 1
        if f'id: "{next_id}"' in line and end_idx is None:
            # Find the closing brace }, above it
            i = idx
            while i >= 0:
                if '},' in lines[i]:
                    end_idx = i
                    break
                i -= 1

    if start_idx is None or end_idx is None:
        print(f"Error: Could not locate post boundaries. start_idx={start_idx}, end_idx={end_idx}")
        return False

    # Extract original readTime if possible
    original_block = "".join(lines[start_idx:end_idx+1])
    read_time_match = re.search(r'readTime:\s*(\d+)', original_block)
    read_time = int(read_time_match.group(1)) if read_time_match else 15

    print(f"Replacing lines {start_idx+1} to {end_idx+1} in lib/blogData.ts. Original readTime: {read_time}")

    # Format the new post object
    new_post_object = f"""{{
    id: "{post_id_str}",
    title: "{title}",
    slug: "{slug}",
    excerpt: "{excerpt}",
    image: "{image}",
    category: "{category}",
    author: "تاج ستوديو",
    date: "{date}",
    readTime: {read_time},
    content: `{escaped_content}`,
  }},
"""

    # Replace the block in the lines array
    new_lines = lines[:start_idx] + [new_post_object] + lines[end_idx+1:]

    # Write back to lib/blogData.ts
    with open('lib/blogData.ts', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

    print(f"Replacement successful for post {post_id_str}!")
    return True

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python replace_v3_post.py <post_id>")
        sys.exit(1)
    
    post_id = int(sys.argv[1])
    success = replace_post(post_id)
    if not success:
        sys.exit(1)
