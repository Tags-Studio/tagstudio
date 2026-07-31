import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Split by the beginning of each post object in the array
# Post objects start with something like { id: "1", or { id: '1', or {id: "1",
post_matches = list(re.finditer(r'\{\s*id:\s*["\'](\d+)["\']', content))

leaked_posts = []
for index, match in enumerate(post_matches):
    post_id = match.group(1)
    start_pos = match.start()
    end_pos = post_matches[index+1].start() if index + 1 < len(post_matches) else len(content)
    post_body = content[start_pos:end_pos]
    
    leaks = []
    if 'مقترحات الصور' in post_body or 'جدول مقترحات' in post_body or 'جدول الصور' in post_body:
        leaks.append('Image Suggestions Table')
    if 'Meta Tags' in post_body or 'Meta Title' in post_body or 'metaTitle' in post_body or 'Meta Description' in post_body:
        # Note: we only care if it's inside the 'content:' body as text, not the metadata fields
        # Let's check if the text 'Meta' or 'meta' appears inside the content template literal
        content_match = re.search(r'content:\s*`([\s\S]*?)`', post_body)
        if content_match:
            body_text = content_match.group(1)
            if 'Meta Title' in body_text or 'Meta Description' in body_text or 'ميتاداتا' in body_text or 'Meta' in body_text:
                leaks.append('Meta Tags Table')
            if 'mozahran' in body_text:
                leaks.append('mozahran URL')
            if 'قائمة الصور المقترحة' in body_text:
                leaks.append('Image Suggestions List')
            if 'Alt Text' in body_text or 'Alt-Text' in body_text:
                leaks.append('Alt Text inside content')
                
    if leaks:
        leaked_posts.append((post_id, leaks))
        print(f"Post {post_id} has leaks: {leaks}")

print(f"Total posts with leaks: {len(leaked_posts)}")
