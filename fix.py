import re

with open('C:/Users/zahran/Downloads/code.txt', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract styles
style_match = re.search(r'<style>(.*?)</style>', html, re.DOTALL)
styles = style_match.group(1) if style_match else ''

# Replace #10b981 (Emerald 500) with #00C853 (Tag Studio Green) in styles
styles = styles.replace('#10b981', '#00C853')
styles = styles.replace('16,185,129', '0,200,83') # RGB of emerald to rgb of green
styles = styles.replace('#064e3b', '#004D40') # Darker green
styles = styles.replace('#059669', '#009624') # Dark green
styles = styles.replace('#34d399', '#69F0AE') # Light green

# Extract body content
body_match = re.search(r'<body[^>]*>(.*?)<script>', html, re.DOTALL)
body = body_match.group(1) if body_match else ''

# Convert to JSX
jsx = body
jsx = jsx.replace('class=', 'className=')
jsx = jsx.replace('onclick=', 'onClick=')

# Self closing tags
jsx = re.sub(r'<(img|input|br|hr)([^>]*?)(?<!/)>', r'<\1\2 />', jsx)

# Inline styles
def style_replacer(match):
    style_str = match.group(1)
    # Split by semicolon
    parts = [p.strip() for p in style_str.split(';') if p.strip()]
    obj_parts = []
    for p in parts:
        if ':' in p:
            k, v = p.split(':', 1)
            k = k.strip()
            v = v.strip()
            # camelCase key
            k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
            obj_parts.append(f'{k}: "{v}"')
    return 'style={{' + ', '.join(obj_parts) + '}}'

jsx = re.sub(r'style="([^"]*)"', style_replacer, jsx)

# Hide global layout
styles += '\nheader, footer, #floating-contact { display: none !important; }\n'

with open('parsed_body.txt', 'w', encoding='utf-8') as f:
    f.write(jsx)
with open('parsed_styles.txt', 'w', encoding='utf-8') as f:
    f.write(styles)
