import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

post_matches = list(re.finditer(r'\{\s*id:\s*["\'](\d+)["\']', content))

failed_count = 0
for index, match in enumerate(post_matches):
    post_id = match.group(1)
    start_pos = match.start()
    end_pos = post_matches[index+1].start() if index + 1 < len(post_matches) else len(content)
    post_body = content[start_pos:end_pos]
    
    content_match = re.search(r'(content:\s*`)([\s\S]*?)(`\s*,\s*\}\s*,?)', post_body)
    if not content_match:
        failed_count += 1
        print(f"Post {post_id} FAILED content regex.")
        # print the last 150 characters of post_body
        print(f"  End of post_body: {repr(post_body[-150:])}")

print(f"Total failed: {failed_count}")
