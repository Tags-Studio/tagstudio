import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

post_matches = list(re.finditer(r'\{\s*id:\s*["\']175["\']', content))
if post_matches:
    start_pos = post_matches[0].start()
    next_post = re.search(r'\{\s*id:\s*["\']176["\']', content[start_pos:])
    end_pos = start_pos + next_post.start() if next_post else len(content)
    post_body = content[start_pos:end_pos]
    
    # print from 14000 to 17000
    content_match = re.search(r'content:\s*`([\s\S]*?)`', post_body)
    if content_match:
        body_text = content_match.group(1)
        print(body_text[-4000:-2000])
