import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

post_matches = list(re.finditer(r'\{\s*id:\s*["\'](\d+)["\']', content))

matched_count = 0
for index, match in enumerate(post_matches):
    post_id = match.group(1)
    start_pos = match.start()
    end_pos = post_matches[index+1].start() if index + 1 < len(post_matches) else len(content)
    post_body = content[start_pos:end_pos]
    
    # Find 'content: `'
    c_start = post_body.find('content: `')
    if c_start != -1:
        # Find the last backtick
        c_end = post_body.rfind('`')
        if c_end > c_start + 10:
            body_text = post_body[c_start + 10 : c_end]
            matched_count += 1
        else:
            print(f"Post {post_id} failed: last backtick too close or not found")
    else:
        print(f"Post {post_id} failed: 'content: `' not found")

print(f"Total parsed successfully: {matched_count} / {len(post_matches)}")
