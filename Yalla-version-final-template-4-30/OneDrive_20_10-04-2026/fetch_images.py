import urllib.request
import json

cities = [
    'Skoura', 'Beni_Mellal', 'Nador', 'Laayoune', 'Al_Hoceima', 'Safi', 'Guelmim', 'Tiznit'
]

for city in cities:
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={city}&prop=pageimages&format=json&pithumbsize=900"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            for page_id, page_info in pages.items():
                if 'thumbnail' in page_info:
                    img_url = page_info['thumbnail']['source']
                    print(f"Downloading {city} from {img_url}")
                    img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(img_req) as img_resp, open(f"{city.lower()}.jpg", 'wb') as out_file:
                        out_file.write(img_resp.read())
                    print(f"Success {city}")
                else:
                    print(f"No image found for {city}")
    except Exception as e:
        print(f"Error fetching {city}: {e}")
