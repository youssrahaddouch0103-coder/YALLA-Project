from PIL import Image
import colorsys

img = Image.open('yalla_logo_ai_transparent.png').convert('RGBA')
data = img.getdata()
new_data = []

# Site sand-accent color: #F4A261
tr, tg, tb = 244, 162, 97
th, ts, tv = colorsys.rgb_to_hsv(tr/255.0, tg/255.0, tb/255.0)

for r, g, b, a in data:
    if a > 0:
        # Protect the green 'YA' from being tinted.
        # The YA has a distinct greenish hue where G > R
        if g > r + 10:
            new_data.append((r, g, b, a))
        else:
            # It's a gold/metal pixel.
            # Convert to HSV, lock hue to Sand Accent, and adapt saturation.
            h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
            
            # Using s**0.3 preserves white highlights (where s=0) 
            # while fully saturating the mid-tones matching the site.
            new_s = ts * (s**0.3)
            nr, ng, nb = colorsys.hsv_to_rgb(th, new_s, v)
            new_data.append((int(nr*255), int(ng*255), int(nb*255), a))
    else:
        new_data.append((r, g, b, a))

img.putdata(new_data)
img.save('yalla_logo_ai_transparent.png', 'PNG')
print("Color changed.")
