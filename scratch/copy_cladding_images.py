import os
import shutil
from PIL import Image

src_folder = r'C:\Users\zahran\Downloads\New folder\New folder'
dest_folder = r'public/images/cladding/al-mousa-school'
os.makedirs(dest_folder, exist_ok=True)

file_mapping = {
    'WhatsApp Image 2026-10-10 at 6.53.34 PM.jpeg': 'thumbnail-signboard.jpg',
    'مدرسة الشيخ عبد الرحمن_Page_1.jpg': 'facade-panoramic-view.jpg',
    'مدرسة الشيخ عبد الرحمن_Page_2.jpg': 'grand-entrance-arches.jpg',
    'مدرسة الشيخ عبد الرحمن_Page_6.jpg': 'architectural-side-view.jpg',
    'مدرسة الشيخ عبد الرحمن_Page_7.jpg': '3d-gold-letters-detail.jpg',
}

for src_name, dest_name in file_mapping.items():
    src_path = os.path.join(src_folder, src_name)
    dest_path = os.path.join(dest_folder, dest_name)
    shutil.copy2(src_path, dest_path)
    print(f'Copied {src_name} -> {dest_path}')
    
    # Also save as webp version for high performance
    webp_name = os.path.splitext(dest_name)[0] + '.webp'
    webp_path = os.path.join(dest_folder, webp_name)
    with Image.open(src_path) as img:
        img.save(webp_path, 'WEBP', quality=90)
    print(f'Generated {webp_path}')

print('All images successfully prepared in public/images/cladding/al-mousa-school/')
