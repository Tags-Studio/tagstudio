import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

post_matches = list(re.finditer(r'\{\s*id:\s*["\']174["\']', content))
if post_matches:
    start_pos = post_matches[0].start()
    next_post = re.search(r'\{\s*id:\s*["\']175["\']', content[start_pos:])
    end_pos = start_pos + next_post.start() if next_post else len(content)
    post_body = content[start_pos:end_pos]
    
    # print 3000 characters before the end
    print(post_body[-3000:])
