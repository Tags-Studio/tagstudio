import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

post_matches = list(re.finditer(r'\{\s*id:\s*["\'](\d+)["\']', content))

leak_headers_regex = re.compile(r'##\s*(مقترحات الصور|قائمة الصور|الصور والـ Alt|الصور المقترحة|الصور والـ alt|Meta Tags مقترحة|ميتاداتا|Meta Title)', re.IGNORECASE)

for index, match in enumerate(post_matches):
    post_id = match.group(1)
    start_pos = match.start()
    end_pos = post_matches[index+1].start() if index + 1 < len(post_matches) else len(content)
    post_body = content[start_pos:end_pos]
    
    content_match = re.search(r'content:\s*`([\s\S]*?)`', post_body)
    if not content_match:
        continue
    body_text = content_match.group(1)
    
    # Check if there's a leak
    header_match = leak_headers_regex.search(body_text)
    if header_match:
        # Find where it starts
        leak_start = header_match.start()
        # Get 150 chars after the header to see what follows it, or let's look for H2s after it
        rest_of_text = body_text[leak_start:]
        # Find next H2 in rest_of_text after the first match
        # (excluding the leaked headers themselves)
        next_headers = list(re.finditer(r'##\s*(.*)', rest_of_text))
        
        non_leak_headers = []
        for h in next_headers:
            title = h.group(1).strip()
            # If it's not one of our leaked headers
            if not any(lh in title for lh in ['مقترحات الصور', 'قائمة الصور', 'الصور والـ Alt', 'الصور المقترحة', 'الصور والـ alt', 'Meta Tags', 'ميتاداتا', 'Meta Title', 'العنصر', 'قيمة', 'القيمة']):
                non_leak_headers.append((h.start(), title))
        
        print(f"Post {post_id}:")
        print(f"  Leak starts at index {leak_start} (Header: '{header_match.group(0)}')")
        if non_leak_headers:
            first_non_leak = non_leak_headers[0]
            print(f"  First non-leak header after it: '{first_non_leak[1]}' at offset {first_non_leak[0]}")
            # print snippet of next 100 chars
            snippet = rest_of_text[first_non_leak[0]:first_non_leak[0]+150]
            print(f"  Snippet: {repr(snippet)}")
        else:
            print("  NO non-leak header found after leak!")
            # print the last 200 chars of body_text
            snippet = body_text[-250:]
            print(f"  End of post snippet: {repr(snippet)}")
        print("-" * 50)
