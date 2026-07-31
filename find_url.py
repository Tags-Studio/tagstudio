import re
with open(r'C:\Users\zahran\.gemini\antigravity\brain\96008217-4abb-4027-acf1-505921affcc3\.system_generated\steps\9014\content.md', 'r', encoding='utf-8') as f:
    html = f.read()

links = set(re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', html, re.IGNORECASE | re.DOTALL))
for url, text in links:
    if 'ملايين' in text:
        print(url)
