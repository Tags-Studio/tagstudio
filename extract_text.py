import re
with open(r'C:\Users\zahran\.gemini\antigravity\brain\96008217-4abb-4027-acf1-505921affcc3\.system_generated\steps\9056\content.md', 'r', encoding='utf-8') as f:
    html = f.read()

# Try to extract the main content. Usually it's in paragraphs
paragraphs = re.findall(r'<p[^>]*>(.*?)</p>', html, re.IGNORECASE | re.DOTALL)
for p in paragraphs:
    clean_p = re.sub(r'<[^>]+>', '', p).strip()
    if len(clean_p) > 50:
        print(clean_p)
