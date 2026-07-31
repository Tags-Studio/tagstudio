import re
import os

def clean_leaks():
    with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    post_matches = list(re.finditer(r'\{\s*id:\s*["\'](\d+)["\']', content))

    leak_patterns = [
        r'#{2,4}\s*البيانات الوصفية',
        r'#{2,4}\s*معلومات الميتا',
        r'#{2,4}\s*البيانات الفنية',
        r'#{2,4}\s*المخرجات التقنية',
        r'#{2,4}\s*المخرجات الفنية',
        r'#{2,4}\s*بيانات SEO',
        r'#{2,4}\s*بيانات الـ SEO',
        r'#{2,4}\s*مقترحات الصور',
        r'#{2,4}\s*قائمة الصور',
        r'#{2,4}\s*الصور والـ Alt',
        r'#{2,4}\s*الصور المقترحة',
        r'#{2,4}\s*الروابط الداخلية',
        r'#{2,4}\s*قائمة الروابط',
        r'#{2,4}\s*Meta Tags',
        r'#{2,4}\s*ميتاداتا',
        r'#{2,4}\s*Meta Title',
        r'#{2,4}\s*الكلمات المفتاحية',
        r'#{2,4}\s*الكلمات الدالة',
        r'#{2,4}\s*قائمة عبارات اتخاذ الإجراء',
        r'#{2,4}\s*قائمة عبارات الدعوة لاتخاذ إجراء',
        r'#{2,4}\s*جدول مقترحات الصور',
        r'#{2,4}\s*جدول الـ Meta Tags',
        r'#{2,4}\s*جدول الميتاداتا'
    ]

    leak_regex = re.compile('|'.join(leak_patterns), re.IGNORECASE)
    conclusion_regex = re.compile(r'#{2,4}\s*(الخلاصة|الخاتمة|ملخص|الخلاصة والتوصيات|الخلاصة والـ CTA|الخلاصة مع الـ CTA)', re.IGNORECASE)

    cleaned_content = []
    last_idx = 0
    cleaned_count = 0

    for index, match in enumerate(post_matches):
        post_id = match.group(1)
        start_pos = match.start()
        end_pos = post_matches[index+1].start() if index + 1 < len(post_matches) else len(content)
        
        # Append content before this post
        cleaned_content.append(content[last_idx:start_pos])
        
        post_body = content[start_pos:end_pos]
        
        # Find 'content: `' using index find
        c_start = post_body.find('content: `')
        if c_start != -1:
            prefix_content = post_body[:c_start + 10]
            c_end = post_body.rfind('`')
            body_text = post_body[c_start + 10 : c_end]
            suffix_content = post_body[c_end:]
            
            leak_match = leak_regex.search(body_text)
            if leak_match:
                leak_start_idx = leak_match.start()
                rest = body_text[leak_start_idx:]
                conclusion_match = conclusion_regex.search(rest)
                
                if conclusion_match:
                    conclusion_offset = conclusion_match.start()
                    cleaned_body = body_text[:leak_start_idx] + rest[conclusion_offset:]
                else:
                    prefix_body = body_text[:leak_start_idx].rstrip()
                    if prefix_body.endswith('---'):
                        prefix_body = prefix_body[:-3].rstrip()
                    cleaned_body = prefix_body
                
                # Clean trailing '---' or excessive newlines
                cleaned_body = cleaned_body.strip()
                if cleaned_body.endswith('---'):
                    cleaned_body = cleaned_body[:-3].strip()
                
                post_body = prefix_content + cleaned_body + suffix_content
                cleaned_count += 1
                
        cleaned_content.append(post_body)
        last_idx = end_pos

    cleaned_content.append(content[last_idx:])
    final_text = "".join(cleaned_content)
    
    # Overwrite the original file directly
    with open('lib/blogData.ts', 'w', encoding='utf-8') as f:
        f.write(final_text)
        
    print(f"Successfully cleaned leaks from {cleaned_count} posts in lib/blogData.ts!")

if __name__ == '__main__':
    clean_leaks()
