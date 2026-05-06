from PIL import Image, ImageFilter
import colorsys

img = Image.open('yalla_logo_1775675070399.png').convert('RGBA')
data = img.getdata()
new_data = []

tr, tg, tb = 244, 162, 97
th, ts, tv = colorsys.rgb_to_hsv(tr/255.0, tg/255.0, tb/255.0)

for r, g, b, a in data:
    # Strict cut-off to kill the gradient cloud above the arch (which has g=68)
    if g <= 74 and r < 90:
        new_data.append((255, 255, 255, 0))
    else:
        if g > r + 15 and r < 90:
            # Green YA letter
            new_data.append((r, g, b, a))
        else:
            # Gold areas - map to Sand Accent
            h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
            new_s = ts * (s**0.3)
            nr, ng, nb = colorsys.hsv_to_rgb(th, new_s, v)
            new_data.append((int(nr*255), int(ng*255), int(nb*255), a))

img.putdata(new_data)
# Save it
img.save('yalla_logo_ai_transparent.png', 'PNG')
print("Deep extraction complete.")
