import re

with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

post_matches = list(re.finditer(r'\{\s*id:\s*["\'](\d+)["\']', content))

leak_patterns = [
    r'##\s*البيانات الوصفية',
    r'##\s*معلومات الميتا',
    r'##\s*البيانات الفنية',
    r'##\s*المخرجات التقنية',
    r'##\s*المخرجات الفنية',
    r'##\s*بيانات SEO',
    r'##\s*بيانات الـ SEO',
    r'##\s*مقترحات الصور',
    r'##\s*قائمة الصور',
    r'##\s*الصور والـ Alt',
    r'##\s*الصور المقترحة',
    r'##\s*الروابط الداخلية',
    r'##\s*قائمة الروابط',
    r'##\s*Meta Tags',
    r'##\s*ميتاداتا',
    r'##\s*Meta Title',
    r'###\s*Meta Title',
    r'###\s*الكلمات المفتاحية',
    r'##\s*الكلمات المفتاحية',
    r'##\s*الكلمات الدالة',
    r'###\s*الكلمات الدالة',
    r'##\s*قائمة عبارات اتخاذ الإجراء',
    r'###\s*قائمة عبارات اتخاذ الإجراء',
    r'##\s*قائمة عبارات الدعوة لاتخاذ إجراء',
    r'###\s*قائمة عبارات الدعوة لاتخاذ إجراء',
    r'##\s*جدول مقترحات الصور',
    r'##\s*جدول الـ Meta Tags',
    r'##\s*جدول الميتاداتا'
]

leak_regex = re.compile('|'.join(leak_patterns), re.IGNORECASE)

leak_details = []

for index, match in enumerate(post_matches):
    post_id = match.group(1)
    start_pos = match.start()
    end_pos = post_matches[index+1].start() if index + 1 < len(post_matches) else len(content)
    post_body = content[start_pos:end_pos]
    
    content_match = re.search(r'content:\s*`([\s\S]*?)`', post_body)
    if not content_match:
        continue
    body_text = content_match.group(1)
    
    # Search for all matches in body_text
    matches = list(leak_regex.finditer(body_text))
    if matches:
        first_match = matches[0]
        # Print the matched text and some context
        context = body_text[max(0, first_match.start() - 100): first_match.start()]
        print(f"Post {post_id} -> First Leak Match: '{first_match.group(0)}' at index {first_match.start()}")
        print(f"  Context before: {repr(context[-150:])}")
        print("-" * 50)
        leak_details.append((post_id, first_match.group(0), first_match.start()))

print(f"Total posts with leaks found: {len(leak_details)}")
