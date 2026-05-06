content = open('index.html', 'r', encoding='utf-8').read()

# Find and replace the map section block by line range
lines = content.split('\n')

start_line = None
end_line = None
for i, line in enumerate(lines):
    if '<!-- GLOBAL MAP SECTION -->' in line:
        start_line = i
    if start_line is not None and i > start_line and '</div>' in line and end_line is None:
        # Find the closing div of the map section (the one after map-container div)
        # Count open/close divs from start_line
        pass

# Simpler approach: replace specific broken img tag
content = content.replace(
    '<img src=earth_night.jpg alt="Earth at Night Map"',
    '<img src="earth_night.jpg" alt="Earth at Night Map"'
)

# Also restructure so img is a block element not positioned absolute
# Replace the whole inner map-visual block
old_block = '''        <div class="map-visual"
            style="position: relative; overflow: hidden; width: 100%; height: 500px; background-color: #050a11;">
            <!-- DIRECT IMAGE TAG -->
            <img src="earth_night.jpg" alt="Earth at Night Map"
                style="position: absolute; top: -10%; left: 0; width: 100%; height: 120%; object-fit: cover; z-index: 0; opacity: 0.8;">

            <!-- GRADIENT OVERLAY -->
            <div
                style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(180deg, rgba(2,5,10,0.4) 0%, rgba(20,50,80,0.1) 50%, rgba(2,5,10,0.4) 100%); z-index: 1; pointer-events: none;">
            </div>

            <!-- Simulated glowing dot for Morocco -->
            <div class="map-marker-morocco" style="z-index: 2;">
                <div class="glow-ring"></div>
                <div class="dot"></div>
                <div class="marker-label">MOROCCO</div>
            </div>
        </div>'''

new_block = '''        <div style="position: relative;">
            <img src="earth_night.jpg" alt="Earth at Night" style="display:block;width:100%;height:500px;object-fit:cover;">
            <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,transparent 40%,transparent 60%,rgba(0,0,0,0.3) 100%);pointer-events:none;"></div>
            <div style="position:absolute;top:45%;left:48%;display:flex;align-items:center;justify-content:center;">
                <div style="position:absolute;width:45px;height:45px;border:2px solid rgba(0,255,136,0.8);border-radius:50%;animation:pulse-ring 2.5s infinite;"></div>
                <div style="width:12px;height:12px;background:#00ff88;border-radius:50%;box-shadow:0 0 15px #00ff88,0 0 30px #00ff88;"></div>
                <div style="position:absolute;top:-30px;color:#00ff88;font-weight:700;font-size:0.9rem;letter-spacing:2px;white-space:nowrap;">MOROCCO</div>
            </div>
        </div>'''

if old_block in content:
    content = content.replace(old_block, new_block)
    print("SUCCESS: replaced map-visual block")
else:
    print("block not found, saving with just img fix")

open('index.html', 'w', encoding='utf-8').write(content)
print("File saved.")
