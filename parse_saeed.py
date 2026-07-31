import re

with open(r'C:\Users\zahran\.gemini\antigravity\brain\96008217-4abb-4027-acf1-505921affcc3\.system_generated\steps\9014\content.md', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract links and their text
links = re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', html, re.IGNORECASE | re.DOTALL)

articles = set()
for url, text in links:
    # Clean text
    text = re.sub(r'<[^>]+>', '', text).strip()
    
    # Filter for article links:
    # They usually start with https://saeedstudio.com/ and do not contain generic paths like /category/, /tag/, /page/ etc.
    if 'saeedstudio.com' in url and '/category/' not in url and '/tag/' not in url and 'author' not in url and text:
        # Exclude navigation links
        if text not in ['الرئيسية', 'مقالاتي', 'أعمالي', 'تواصل معي', 'من أنا', 'خدماتي', 'الصفحة الرئيسية']:
            articles.add((url, text))

for url, text in articles:
    print(f"- {text} ({url})")

print(f"Total found: {len(articles)}")
