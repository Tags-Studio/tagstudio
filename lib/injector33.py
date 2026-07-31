import re
import random

file_path = r'c:\Users\zahran\Documents\GitHub\tagstudio\lib\blogData.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def inject_keywords(article_id, title, text):
    identity_phrases = [
        "في تاج ستوديو، بوصفنا وكالة براندنج متخصصة في السوق السعودي والمصري، ",
        "كأفضل شركة تصميم هوية بصرية، ",
        "تعمل شركتنا كاستوديو تصميم متخصص يخدم عملاء الرياض وجدة والدمام، ",
        "من أفضل شركات تصميم الهوية البصرية في السوق العربي، ",
        "كـ شركة هوية بصرية رائدة، "
    ]
    
    social_phrases = [
        "بصفتنا شركة تصميم سوشيال ميديا رائدة، ",
        "من خلال تقديم محتوى بصري جذاب ومنشورات متخصصة، ",
        "في تاج ستوديو، كشركة تصميم سوشيال ميديا محترفة، "
    ]
    
    print_phrases = [
        "بصفتنا شركة تصميم مطبوعات متميزة، ",
        "من خلال تصميم بروفايل شركة احترافي وبروشورات جذابة، ",
        "في تاج ستوديو لتصميم كتالوجات وبروفايلات الشركات، "
    ]
    
    medical_phrases = [
        "بصفتنا شركة تصميم مراكز طبية متخصصة، ",
        "من خلال خدمات تصميم عيادات وهويات بصرية في الرياض ومصر، ",
        "بوصفنا وكالة تصميم مدارس وعيادات رائدة، "
    ]

    phrases = []
    if "سوشيال" in title or "منشورات" in title:
        phrases = social_phrases + identity_phrases
    elif "مطبوعات" in title or "بروفايل" in title or "كتالوج" in title:
        phrases = print_phrases + identity_phrases
    elif "طب" in title or "عياد" in title or "مستشف" in title or "مدرس" in title:
        phrases = medical_phrases + identity_phrases
    else:
        phrases = identity_phrases

    paragraphs = text.split('\n\n')
    
    valid_indices = [i for i, p in enumerate(paragraphs) if len(p) > 50 and not p.startswith(('#', '-', '!', '[', '>'))]
    num_injects = min(random.randint(4, 6), len(valid_indices))
    inject_indices = random.sample(valid_indices, num_injects)
    
    for idx in inject_indices:
        p = paragraphs[idx]
        phrase = random.choice(phrases)
        if random.random() > 0.5:
            paragraphs[idx] = phrase + p
        else:
            if p.endswith('.'):
                paragraphs[idx] = p[:-1] + "، " + phrase.strip(' ،') + "."
            else:
                paragraphs[idx] = p + "، " + phrase.strip(' ،') + "."
            
    return '\n\n'.join(paragraphs)

def process_file():
    global content
    # target ONLY article 33 since we already did 16-32!
    pattern = r'(id: "(33)",.*?title: "(.*?)",.*?content: `)(.*?)(`\s*\})'
    
    def replacer(match):
        prefix = match.group(1)
        article_id = match.group(2)
        title = match.group(3)
        text = match.group(4)
        suffix = match.group(5)
        
        new_text = inject_keywords(article_id, title, text)
        print(f"Processed article {article_id}")
        return prefix + new_text + suffix

    new_content, count = re.subn(pattern, replacer, content, flags=re.DOTALL)
    print(f"Replaced {count} articles")
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

process_file()
