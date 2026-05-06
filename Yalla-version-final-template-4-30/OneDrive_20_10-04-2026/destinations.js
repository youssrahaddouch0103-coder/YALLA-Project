/**
 * destinations.js
 * Single static image per card. No carousel/slideshow.
 */

const destinationsData = [
    {
        id: 'marrakech',
        name: 'Marrakech',
        tagline: 'The Red City',
        image: 'marrakech.png',
        description: 'A vibrant oasis of culture, history, and sensory experiences defined by ancient medinas and luxury riads.',
        fullDescription: 'Marrakech is a former imperial city in western Morocco and is a major economic center and home to mosques, palaces and gardens. The medina is a densely packed, walled medieval city dating to the Berber Empire, with mazelike alleys where thriving souks sell traditional textiles, pottery and jewelry.',
        theme: 'cultural',
        weather: 'sunny',
        budget: 'premium',
        popularity: 10,
        stats: { temp: '28°C', vibe: 'Vibrant', bestTime: 'March - May' }
    },
    {
        id: 'chefchaouen',
        name: 'Chefchaouen',
        tagline: 'The Blue Pearl',
        image: 'chefchaouen.png',
        description: 'Wander through the ethereal blue labyrinth of the Rif Mountains\' most picturesque sanctuary.',
        fullDescription: 'Chefchaouen, or Chaouen, is a city in the Rif Mountains of northwest Morocco. It\'s known for the striking, blue-washed buildings of its old town. Leather and weaving workshops line its steep cobbled lanes.',
        theme: 'mountains',
        weather: 'mild',
        budget: 'standard',
        popularity: 9,
        stats: { temp: '22°C', vibe: 'Peaceful', bestTime: 'April - June' }
    },
    {
        id: 'fes',
        name: 'Fes',
        tagline: 'The Spiritual Heart',
        image: 'fes.png',
        description: 'Step into the world\'s largest living medieval city and discover centuries of artisan legacy.',
        fullDescription: 'Fes is a northeastern Moroccan city often referred to as the country\'s cultural capital. It\'s primarily known for its Fes El Bali walled medina, with medieval Marinid architecture, vibrant souks and old-world atmosphere.',
        theme: 'cultural',
        weather: 'sunny',
        budget: 'economy',
        popularity: 9,
        stats: { temp: '25°C', vibe: 'Authentic', bestTime: 'Sept - Nov' }
    },
    {
        id: 'casablanca',
        name: 'Casablanca',
        tagline: 'Atlantic Modernity',
        image: 'casablanca.png',
        description: 'A metropolitan fusion of Art Deco elegance and contemporary Moroccan ambition on the coast.',
        fullDescription: 'Casablanca is a port city and commercial hub in western Morocco, fronting the Atlantic Ocean. The city\'s French colonial legacy is seen in its Mauresque architecture, a blend of Moorish style and European art deco.',
        theme: 'urban',
        weather: 'mild',
        budget: 'premium',
        popularity: 7,
        stats: { temp: '23°C', vibe: 'Modern', bestTime: 'April - Oct' }
    },
    {
        id: 'merzouga',
        name: 'Merzouga',
        tagline: 'Golden Sands',
        image: 'merzouga.png',
        description: 'Experience the silence of the Sahara under a canopy of stars amid towering golden dunes.',
        fullDescription: 'Merzouga is a small Moroccan town in the Sahara Desert, near the Algerian border. It\'s known as a gateway to Erg Chebbi, a huge expanse of sand dunes north of town. Camel treks venture into the dunes.',
        theme: 'desert',
        weather: 'extreme',
        budget: 'standard',
        popularity: 8,
        stats: { temp: '32°C', vibe: 'Adventurous', bestTime: 'Oct - March' }
    },
    {
        id: 'tangier',
        name: 'Tangier',
        tagline: 'Gateway to Europe',
        image: 'tangier.png',
        description: 'The legendary port of spies and poets, where the Mediterranean meets the Atlantic breeze.',
        fullDescription: 'Tangier is a Moroccan port on the Strait of Gibraltar. It has been a strategic gateway between Africa and Europe since Phoenician times. Its whitewashed hillside medina is home to the Dar el Makhzen palace.',
        theme: 'urban',
        weather: 'mild',
        budget: 'standard',
        popularity: 8,
        stats: { temp: '21°C', vibe: 'Eclectic', bestTime: 'May - Sept' }
    },
    {
        id: 'essaouira',
        name: 'Essaouira',
        tagline: 'Windy City',
        image: 'essaouira.png',
        description: 'A fortified seaport where art, music, and the Atlantic wind create a unique bohemian rhythm.',
        fullDescription: 'Essaouira is a port city and resort on Morocco\'s Atlantic coast. Its medina (old town) is protected by 18th-century seafront ramparts called the Skala de la Ville, designed by European engineers.',
        theme: 'beach',
        weather: 'mild',
        budget: 'economy',
        popularity: 8,
        stats: { temp: '20°C', vibe: 'Bohemian', bestTime: 'March - Nov' }
    },
    {
        id: 'dakhla',
        name: 'Dakhla',
        tagline: 'Desert Meets Sea',
        image: 'dakhla.png',
        description: 'A paradise for kitesurfers where the Sahara sands dive into the turquoise Atlantic lagoon.',
        fullDescription: 'Dakhla is a city in Western Sahara, administered by Morocco. Built on a narrow Atlantic peninsula, it is a world-class destination for water sports and desert exploration.',
        theme: 'beach',
        weather: 'sunny',
        budget: 'premium',
        popularity: 6,
        stats: { temp: '24°C', vibe: 'Sporty', bestTime: 'Dec - March' }
    },
    {
        id: 'agadir',
        name: 'Agadir',
        tagline: 'Sun, Sand, and Sea',
        image: 'agadir.png',
        description: 'A modern coastal city known for its beautiful wide beaches, golf courses, and year-round sunshine.',
        fullDescription: 'Agadir is a major city on the shore of the Atlantic Ocean near the foot of the Atlas Mountains. Rebuilt after a 1960 earthquake, it features wide avenues, modern hotels, and vibrant cafes.',
        theme: 'beach',
        weather: 'sunny',
        budget: 'standard',
        popularity: 8,
        stats: { temp: '26°C', vibe: 'Relaxing', bestTime: 'All Year' }
    },
    {
        id: 'rabat',
        name: 'Rabat',
        tagline: 'The Imperial Capital',
        image: 'rabat.png',
        description: 'The elegant capital of Morocco, combining historical monuments with modern palm-lined boulevards.',
        fullDescription: 'Rabat is Morocco\'s capital city along the Bouregreg River and the Atlantic Ocean. Known for Islamic and colonial heritage including the Kasbah of the Udayas and the iconic Hassan Tower.',
        theme: 'urban',
        weather: 'mild',
        budget: 'standard',
        popularity: 7,
        stats: { temp: '22°C', vibe: 'Elegant', bestTime: 'April - Nov' }
    },
    {
        id: 'ouarzazate',
        name: 'Ouarzazate',
        tagline: 'The Door of the Desert',
        image: 'ouarzazate.jpg',
        description: 'A cinematic gateway to the Sahara, famous for its majestic kasbahs and Hollywood film studios.',
        fullDescription: 'Ouarzazate is south of Morocco\'s High Atlas mountains. The Taourirt Kasbah and the nearby Aït Benhaddou feature stunning mud-brick architecture that has served as backdrop for many Hollywood blockbusters.',
        theme: 'mountains',
        weather: 'extreme',
        budget: 'economy',
        popularity: 6,
        stats: { temp: '30°C', vibe: 'Cinematic', bestTime: 'Oct - May' }
    },
    {
        id: 'ifrane',
        name: 'Ifrane',
        tagline: 'Little Switzerland',
        image: 'ifrane.jpg',
        description: 'An alpine-style mountain resort town with pristine cedar forests, fresh air, and winter snow.',
        fullDescription: 'Ifrane is in Morocco\'s Middle Atlas region. Its alpine-style architecture and nearby ski slopes were built by the French during the protectorate era. Snow-covered in winter, and blooming in spring.',
        theme: 'mountains',
        weather: 'mild',
        budget: 'premium',
        popularity: 6,
        stats: { temp: '15°C', vibe: 'Charming', bestTime: 'Dec - April' }
    },
    {
        id: 'meknes',
        name: 'Meknes',
        tagline: 'The Versailles of Morocco',
        image: 'meknes.jpg',
        description: 'A quieter imperial city with stunning grand gates, palaces, and the nearby Roman ruins of Volubilis.',
        fullDescription: 'Meknes is one of the four Imperial cities of Morocco. It became the capital under Sultan Moulay Ismaïl, who built impressive palaces, grand gates, and massive walls rivaling Versailles.',
        theme: 'cultural',
        weather: 'mild',
        budget: 'economy',
        popularity: 5,
        stats: { temp: '24°C', vibe: 'Historic', bestTime: 'April - Sept' }
    },
    {
        id: 'el_jadida',
        name: 'El Jadida',
        tagline: 'Portuguese Heritage',
        image: 'el_jadida.jpg',
        description: 'A charming port city and UNESCO site known for its Portuguese citadel and underground cistern.',
        fullDescription: 'El Jadida, previously Mazagan, is a port city on Morocco\'s Atlantic coast. The fortified city built by the Portuguese in the early 16th century is a UNESCO World Heritage Site.',
        theme: 'beach',
        weather: 'mild',
        budget: 'standard',
        popularity: 5,
        stats: { temp: '21°C', vibe: 'Tranquil', bestTime: 'May - Oct' }
    },
    {
        id: 'asilah',
        name: 'Asilah',
        tagline: 'The Artistic Haven',
        image: 'asilah.jpg',
        description: 'A whitewashed seaside town famous for its annual art festival and beautifully painted medina walls.',
        fullDescription: 'Asilah is a fortified town on Morocco\'s Atlantic coast. Its old medina is enclosed by 15th-century Portuguese ramparts. It is an art hub known for its annual arts festival and colorful murals.',
        theme: 'beach',
        weather: 'mild',
        budget: 'economy',
        popularity: 6,
        stats: { temp: '20°C', vibe: 'Artistic', bestTime: 'May - Aug' }
    },
    {
        id: 'taroudant',
        name: 'Taroudant',
        tagline: 'Grandmother of Marrakech',
        image: 'taroudant.jpg',
        description: 'A market town with magnificent red-earth walls nestled against the high Atlas mountain backdrop.',
        fullDescription: 'Taroudant is in the Souss Valley. Known as the "Grandmother of Marrakech" for its surrounding ramparts, it is known for local crafts including jewelry and carpets.',
        theme: 'cultural',
        weather: 'sunny',
        budget: 'standard',
        popularity: 4,
        stats: { temp: '29°C', vibe: 'Authentic', bestTime: 'Oct - March' }
    },
    {
        id: 'skoura',
        name: 'Skoura',
        tagline: 'The Palm Grove Oasis',
        image: 'skoura.jpg',
        description: 'A breathtaking palm grove oasis dotted with ancient kasbahs rising from the desert valley.',
        fullDescription: 'Skoura is a small oasis town in southern Morocco, near Ouarzazate. It is famous for its dense palm grove and the remarkable Amridil Kasbah, one of the finest examples of southern Moroccan architecture.',
        theme: 'desert',
        weather: 'extreme',
        budget: 'economy',
        popularity: 5,
        stats: { temp: '31°C', vibe: 'Serene', bestTime: 'Nov - March' }
    },
    {
        id: 'beni_mellal',
        name: 'Beni Mellal',
        tagline: 'Gate of the Atlas',
        image: 'beni_mellal.jpg',
        description: 'A green and lush gateway to the Middle Atlas with beautiful waterfalls and a historic kasbah.',
        fullDescription: 'Beni Mellal is a major city in central Morocco at the foot of the Middle Atlas. Known for its fertile agricultural lands, the Aïn Asserdoun springs, and the historic Kasbah Ras el-Ain overlooking the city.',
        theme: 'mountains',
        weather: 'mild',
        budget: 'economy',
        popularity: 4,
        stats: { temp: '23°C', vibe: 'Lush', bestTime: 'April - Oct' }
    },
    {
        id: 'nador',
        name: 'Nador',
        tagline: 'Gateway to the Mediterranean',
        image: 'nador.jpg',
        description: 'A vibrant northeastern port city and beautiful lagoon gateway between Morocco and Europe.',
        fullDescription: 'Nador is a northeastern Moroccan city on the Mediterranean coast near the Spanish enclave of Melilla. It is known for its natural lagoon, Mar Chica, offering beautiful scenery and water sports.',
        theme: 'beach',
        weather: 'sunny',
        budget: 'standard',
        popularity: 5,
        stats: { temp: '25°C', vibe: 'Coastal', bestTime: 'June - Sept' }
    },
    {
        id: 'al_hoceima',
        name: 'Al Hoceima',
        tagline: 'Pearl of the Rif',
        image: 'al_hoceima.jpg',
        description: 'A stunning Mediterranean coastal gem with crystalline waters and dramatic cliff scenery.',
        fullDescription: 'Al Hoceima is a city on Morocco\'s northern Mediterranean coast, surrounded by the Rif Mountains. It is known for its crystal-clear turquoise waters, beautiful beaches, and the al-Hoceima National Park.',
        theme: 'beach',
        weather: 'sunny',
        budget: 'economy',
        popularity: 6,
        stats: { temp: '26°C', vibe: 'Wild', bestTime: 'June - Sept' }
    },
    {
        id: 'laayoune',
        name: 'Laayoune',
        tagline: 'The Saharan City',
        image: 'laayoune.jpg',
        description: 'The largest city in the Western Sahara, a modern administrative hub on the edge of the desert.',
        fullDescription: 'Laayoune is the largest city in Western Sahara, administered by Morocco. It is a modern city built in the Sahara Desert, featuring wide boulevards, mosques, and a rich Sahrawi cultural heritage.',
        theme: 'desert',
        weather: 'extreme',
        budget: 'economy',
        popularity: 3,
        stats: { temp: '26°C', vibe: 'Remote', bestTime: 'Nov - March' }
    },
    {
        id: 'guelmim',
        name: 'Guelmim',
        tagline: 'Gateway to the Sahara',
        image: 'guelmim.jpg',
        description: 'Known as the gateway to the Sahara, famous for its lively camel market and desert landscapes.',
        fullDescription: 'Guelmim is a city in southwestern Morocco. Known historically as the "Gateway to the Sahara," it is famous for its weekly camel market — one of the most important in the region — and its position between the Anti-Atlas and the Sahara.',
        theme: 'desert',
        weather: 'extreme',
        budget: 'economy',
        popularity: 4,
        stats: { temp: '30°C', vibe: 'Traditional', bestTime: 'Oct - April' }
    },
    {
        id: 'tiznit',
        name: 'Tiznit',
        tagline: 'Silver City',
        image: 'tiznit.jpg',
        description: 'A walled southern town renowned for its exquisite traditional jewelry and vibrant medina.',
        fullDescription: 'Tiznit is a small city in southwestern Morocco, known as the Silver City for its artisan jewelry, especially traditional Berber silver. The medina is encircled by long red-earth ramparts and is a hub for silversmith workshops.',
        theme: 'cultural',
        weather: 'sunny',
        budget: 'economy',
        popularity: 4,
        stats: { temp: '27°C', vibe: 'Artisan', bestTime: 'Oct - April' }
    }
];

function initDestinations() {
    const grid = document.getElementById('destinations-grid');
    const searchInput = document.getElementById('dest-search');
    const themeFilter = document.getElementById('filter-theme');
    const weatherFilter = document.getElementById('filter-weather');
    const budgetFilter = document.getElementById('filter-budget');
    const sortSelect = document.getElementById('sort-by');

    function getWeatherIcon(weather) {
        const icons = { sunny: '☀️', mild: '🌤', extreme: '🌵' };
        return icons[weather] || '🌍';
    }
    function getBudgetDots(budget) {
        const map = { economy: '●○○', standard: '●●○', premium: '●●●' };
        return map[budget] || '●○○';
    }

    function renderCards(data) {
        if (!grid) return;
        grid.innerHTML = '';

        if (data.length === 0) {
            grid.innerHTML = '<div class="no-results">No destinations found matching your criteria.</div>';
            return;
        }

        data.forEach(city => {
            const card = document.createElement('div');
            card.className = 'dest-card animate-fade-up';
            const isSaved = typeof YallaWishlist !== 'undefined' && YallaWishlist.exists(city.id, 'destination');

            card.innerHTML = `
                <div class="dest-card-image-wrap">
                  <img src="${city.image}" class="dest-card-static-img" alt="${city.name}"
                       onerror="this.src='moroccan_city_bg.png'">
                  <div class="dest-card-image-gradient"></div>
                  <div class="dest-card-floating-badge">${city.theme.toUpperCase()}</div>
                  <button class="card-wishlist-btn ${isSaved ? 'active' : ''}" 
                          onclick="event.stopPropagation(); handleWishlistToggle(event, '${city.id}')"
                          aria-label="${isSaved ? 'Remove from wishlist' : 'Add to wishlist'}">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                </div>
                <div class="dest-card-content">
                  <div class="dest-card-meta-row">
                    <span class="dest-card-weather-tag">${getWeatherIcon(city.weather)} ${city.stats.temp}</span>
                    <span class="dest-card-budget">${getBudgetDots(city.budget)}</span>
                  </div>
                  <h3 class="dest-card-name">${city.name}</h3>
                  <p class="dest-card-tagline">${city.tagline}</p>
                  <p class="dest-card-desc">${city.description}</p>
                  <button class="dest-card-cta" onclick="openCatalogModal('${city.id}')">
                    Explore <span>→</span>
                  </button>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function filterAndSort() {
        const query = (searchInput?.value || '').toLowerCase();
        const theme = themeFilter?.value || 'all';
        const weather = weatherFilter?.value || 'all';
        const budget = budgetFilter?.value || 'all';
        const sort = sortSelect?.value || 'popularity';

        let filtered = destinationsData.filter(city => {
            const matchesQuery = city.name.toLowerCase().includes(query) || city.description.toLowerCase().includes(query);
            const matchesTheme = theme === 'all' || city.theme === theme;
            const matchesWeather = weather === 'all' || city.weather === weather;
            const matchesBudget = budget === 'all' || city.budget === budget;
            return matchesQuery && matchesTheme && matchesWeather && matchesBudget;
        });

        filtered.sort((a, b) => {
            if (sort === 'popularity') return b.popularity - a.popularity;
            if (sort === 'az') return a.name.localeCompare(b.name);
            if (sort === 'budget-low') {
                const map = { economy: 1, standard: 2, premium: 3 };
                return map[a.budget] - map[b.budget];
            }
            if (sort === 'budget-high') {
                const map = { economy: 1, standard: 2, premium: 3 };
                return map[b.budget] - map[a.budget];
            }
            return 0;
        });

        renderCards(filtered);
    }

    searchInput?.addEventListener('input', filterAndSort);
    themeFilter?.addEventListener('change', filterAndSort);
    weatherFilter?.addEventListener('change', filterAndSort);
    budgetFilter?.addEventListener('change', filterAndSort);
    sortSelect?.addEventListener('change', filterAndSort);

    renderCards(destinationsData);
    handleUrlParams();
}

function handleUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const theme = params.get('theme');
    const city = params.get('city');

    if (theme) {
        const themeFilter = document.getElementById('filter-theme');
        if (themeFilter) {
            themeFilter.value = theme;
            // The filterAndSort will be called by the event listener if we dispatch change
            themeFilter.dispatchEvent(new Event('change'));
        }
    }

    if (city) {
        // Delay slightly to ensure modal exists
        setTimeout(() => openCatalogModal(city), 300);
    }
}

function handleWishlistToggle(e, cityId) {
    if (typeof YallaWishlist === 'undefined') return;
    const city = destinationsData.find(c => c.id === cityId);
    if (!city) return;

    YallaWishlist.toggle({
        id: city.id,
        type: 'destination',
        name: city.name,
        image: city.image,
        city: 'Morocco',
        category: city.theme
    });
    
    // Force re-render of cards to update UI
    if (window.initDestinations) {
        // This is a bit heavy, maybe just update the specific button?
        // Let's just find the button and toggle class/svg fill
        const btn = e.currentTarget;
        const isSaved = YallaWishlist.exists(cityId, 'destination');
        btn.classList.toggle('active', isSaved);
        btn.querySelector('svg').setAttribute('fill', isSaved ? 'currentColor' : 'none');
    }
}

function openCatalogModal(cityId) {
    const city = destinationsData.find(c => c.id === cityId);
    if (!city) return;

    const modal = document.getElementById('catalog-modal');
    if (!modal) return;

    const isSaved = typeof YallaWishlist !== 'undefined' && YallaWishlist.exists(city.id, 'destination');

    modal.innerHTML = `
        <div class="modal-catalog-container">
            <button class="modal-close-btn" onclick="closeCatalogModal()">&times;</button>
            <div class="modal-catalog-layout">
                <div class="modal-gallery">
                    <div class="gallery-main">
                        <img src="${city.image}" alt="${city.name}" onerror="this.src='moroccan_city_bg.png'" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">
                    </div>
                </div>
                <div class="modal-info">
                    <div class="modal-badge">${city.theme.toUpperCase()}</div>
                    <h2 class="modal-title">${city.name}</h2>
                    <p class="modal-tagline">${city.tagline}</p>
                    <div class="modal-stats">
                        <div class="stat-item"><span>Temp</span><strong>${city.stats.temp}</strong></div>
                        <div class="stat-item"><span>Vibe</span><strong>${city.stats.vibe}</strong></div>
                        <div class="stat-item"><span>Best Time</span><strong>${city.stats.bestTime}</strong></div>
                    </div>
                    <div class="modal-divider"></div>
                    <p class="modal-description">${city.fullDescription}</p>
                    <div class="modal-footer-actions">
                        <button class="btn-book-now" onclick="startTripPlanning('${city.name}', '${city.id}')">Check Availability</button>
                        <button class="btn-add-wishlist ${isSaved ? 'active' : ''}" onclick="handleModalWishlistToggle('${city.id}')">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" style="margin-right:8px;vertical-align:middle;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                            ${isSaved ? 'Saved to Wishlist' : 'Save to Wishlist'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function handleModalWishlistToggle(cityId) {
    if (typeof YallaWishlist === 'undefined') return;
    const city = destinationsData.find(c => c.id === cityId);
    if (!city) return;

    const saved = YallaWishlist.toggle({
        id: city.id,
        type: 'destination',
        name: city.name,
        image: city.image,
        city: 'Morocco',
        category: city.theme
    });

    const btn = document.querySelector('.btn-add-wishlist');
    if (btn) {
        btn.classList.toggle('active', saved);
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="${saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" style="margin-right:8px;vertical-align:middle;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            ${saved ? 'Saved to Wishlist' : 'Save to Wishlist'}
        `;
    }
}


function closeCatalogModal() {
    const modal = document.getElementById('catalog-modal');
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
}

window.addEventListener('DOMContentLoaded', initDestinations);

function startTripPlanning(cityName, cityId) {
    if (typeof YallaAuth !== 'undefined' && !YallaAuth.isLoggedIn()) {
        alert('Veuillez vous connecter pour planifier votre voyage.');
        window.location.href = 'login.html';
        return;
    }
    
    closeCatalogModal();
    
    if (typeof openCityDetails === 'function') {
        openCityDetails(cityId || cityName.toLowerCase(), cityName);
    } else {
        // Fallback to old modal if city-details.js failed to load
        const cityEl = document.getElementById('trip-city-name');
        if(cityEl) cityEl.innerText = cityName;
        const tripModal = document.getElementById('create-trip-modal');
        if(tripModal) {
            tripModal.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }
    }
}

function closeTripModal() {
    const modal = document.getElementById('create-trip-modal');
    if (modal) {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
    }
}
