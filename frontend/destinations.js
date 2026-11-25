/**
 * destinations.js
 * Fetches destination data from the backend API.
 */

let destinationsData = [];
// API_BASE_URL is defined in api.js

async function fetchDestinations() {
    try {
        const response = await fetch(`${API_BASE_URL}/destinations`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        // Map database fields to the structure expected by the frontend
        return data.map(city => ({
            ...city,
            fullDescription: city.full_description,
            stats: {
                temp: city.temp,
                vibe: city.vibe,
                bestTime: city.best_time
            }
        }));
    } catch (error) {
        console.error('Failed to fetch destinations:', error);
        // Fallback or empty array
        return [];
    }
}

async function initDestinations() {
    const grid = document.getElementById('destinations-grid');
    const searchInput = document.getElementById('dest-search');
    const themeFilter = document.getElementById('filter-theme');
    const weatherFilter = document.getElementById('filter-weather');
    const budgetFilter = document.getElementById('filter-budget');
    const sortSelect = document.getElementById('sort-by');

    // Load data from API
    destinationsData = await fetchDestinations();

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
            themeFilter.dispatchEvent(new Event('change'));
        }
    }

    if (city) {
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
    
    const btn = e.currentTarget;
    const isSaved = YallaWishlist.exists(cityId, 'destination');
    btn.classList.toggle('active', isSaved);
    btn.querySelector('svg').setAttribute('fill', isSaved ? 'currentColor' : 'none');
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

