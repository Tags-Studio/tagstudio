import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

post_matches = list(re.finditer(r'\{\s*id:\s*["\'](\d+)["\']', content))

leak_patterns = [
    r'##\s*مقترحات الصور',
    r'##\s*قائمة الصور',
    r'##\s*الصور والـ Alt',
    r'##\s*الصور المقترحة',
    r'##\s*الصور والـ alt',
    r'##\s*البيانات الفنية للمقال',
    r'##\s*المخرجات التقنية',
    r'##\s*📊 بيانات SEO للمقال',
    r'##\s*📊 المخرجات التقنية',
    r'##\s*بيانات SEO للمقال',
    r'###\s*قائمة الصور المقترحة',
    r'##\s*Meta Tags مقترحة',
    r'##\s*Meta Tags',
    r'##\s*ميتاداتا مقترحة',
    r'##\s*بيانات الـ SEO المقترحة',
    r'###\s*الروابط الداخلية المقترحة',
    r'##\s*الروابط الداخلية المقترحة',
    r'##\s*الروابط الداخلية',
    r'##\s*قائمة الروابط',
    r'###\s*قائمة الروابط',
    r'##\s*Meta Title',
    r'###\s*Meta Title',
    r'##\s*البيانات الفنية',
    r'##\s*المخرجات التقنية للمقال',
    r'##\s*بيانات الـ SEO للمقال'
]

leak_regex = re.compile('|'.join(leak_patterns), re.IGNORECASE)

conclusion_regex = re.compile(r'##\s*(الخلاصة|الخاتمة|ملخص|الخلاصة والتوصيات|الخلاصة والـ CTA|الخلاصة مع الـ CTA)', re.IGNORECASE)

cleaned_count = 0

for index, match in enumerate(post_matches):
    post_id = match.group(1)
    start_pos = match.start()
    end_pos = post_matches[index+1].start() if index + 1 < len(post_matches) else len(content)
    post_body = content[start_pos:end_pos]
    
    content_match = re.search(r'content:\s*`([\s\S]*?)`', post_body)
    if not content_match:
        continue
    body_text = content_match.group(1)
    
    # Check if there is a leak in the content
    leak_match = leak_regex.search(body_text)
    if leak_match:
        leak_start_idx = leak_match.start()
        
        # Look for conclusion AFTER the leak start
        rest = body_text[leak_start_idx:]
        conclusion_match = conclusion_regex.search(rest)
        
        if conclusion_match:
            # We cut from leak_start_idx up to the conclusion start
            conclusion_offset = conclusion_match.start()
            cleaned_body = body_text[:leak_start_idx] + rest[conclusion_offset:]
            type_of_clean = "Stopped at conclusion"
        else:
            # We cut from leak_start_idx to the end of body_text
            # But wait, does it have a final separator '---' before the leak?
            # Let's clean up trailing whitespace/newlines or '---'
            prefix = body_text[:leak_start_idx].rstrip()
            if prefix.endswith('---'):
                prefix = prefix[:-3].rstrip()
            cleaned_body = prefix
            type_of_clean = "Cut to the end"
        
        # Clean any double '---' at the end of the text
        cleaned_body = cleaned_body.strip()
        if cleaned_body.endswith('---'):
            cleaned_body = cleaned_body[:-3].strip()
            
        print(f"Post {post_id}: Cleaned ({type_of_clean}). Preview end:\n{repr(cleaned_body[-150:])}")
        print("="*60)
        cleaned_count += 1

print(f"Total posts checked for cleaning: {cleaned_count}")
