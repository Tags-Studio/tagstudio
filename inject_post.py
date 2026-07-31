import re

with open(r'C:\Users\zahran\.gemini\antigravity\brain\96008217-4abb-4027-acf1-505921affcc3\saeed_1.md', 'r', encoding='utf-8') as f:
    markdown_content = f.read()

# We need to escape backticks and $ for the JS template literal
escaped_content = markdown_content.replace('`', '\\`').replace('$', '\\$')

# Get current date
from datetime import datetime
date_str = datetime.now().strftime('%Y-%m-%d')

new_post = f"""  {{
    id: "saeed-1",
    title: "لماذا تدفع الشركات الكبرى ملايين الدولارات على تصميم شعار؟ 💰",
    slug: "tasmim-shiaar-ihtirafi-millions",
    excerpt: "اكتشف السر الحقيقي وراء إنفاق الشركات الكبرى لملايين الدولارات على تصميم الشعار والهوية البصرية، وكيف يمكنك تطبيق هذه الاستراتيجيات لمضاعفة أرباح مشروعك.",
    image: "/images/blog/tasmim-shiaar-ihtirafi-millions.webp",
    category: "تصميم",
    author: "تاج ستوديو",
    date: "{date_str}",
    readTime: 8,
    content: `
{escaped_content}
    `
  }},
"""

with open('C:/Users/zahran/Documents/GitHub/tagstudio/lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Insert after `export const blogPosts: BlogPost[] = [`
insert_point = content.find('export const blogPosts: BlogPost[] = [')
if insert_point != -1:
    insert_point += len('export const blogPosts: BlogPost[] = [')
    # Find the next newline to insert neatly
    next_newline = content.find('\n', insert_point) + 1
    new_content = content[:next_newline] + new_post + content[next_newline:]
    
    with open('C:/Users/zahran/Documents/GitHub/tagstudio/lib/blogData.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Post inserted successfully!")
else:
    print("Could not find the insertion point.")
