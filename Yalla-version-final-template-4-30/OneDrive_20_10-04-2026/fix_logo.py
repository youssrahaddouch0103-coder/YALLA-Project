from PIL import Image

img = Image.open('yalla_logo_1775675070399.png').convert('RGBA')
data = img.getdata()
new_data = []

bg_ref = (10, 55, 38)

for r, g, b, a in data:
    dist = ((r - bg_ref[0])**2 + (g - bg_ref[1])**2 + (b - bg_ref[2])**2)**0.5
    
    # If it's gold/white or bright, dist is huge.
    # YA is around dist=30-40.
    # Background is dist < 20.
    
    if dist < 18:
        new_data.append((255, 255, 255, 0))
    elif dist < 28:
        # Smooth alpha blend for edges between background and YA
        alpha = int(((dist - 18) / 10.0) * 255)
        new_data.append((r, g, b, alpha))
    else:
        # If it's a very dark pixel but not matching background exactly, keep it
        new_data.append((r, g, b, 255))

img.putdata(new_data)
img.save('yalla_logo_ai_transparent.png', 'PNG')
print("Fixed logo saved.")
