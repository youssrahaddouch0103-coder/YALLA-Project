document.addEventListener('DOMContentLoaded', function() {
    // 1. Get City from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city') || 'Chefchaouen'; // Default if none
    const lowerCity = city.toLowerCase().replace(/\s+/g, '_'); // e.g. "chefchaouen"
    
    // Update titles and background
    document.getElementById('planner-city-title').innerText = city;
    // Set a background image based on city. Assuming we have generic images if not found.
    const bgEl = document.getElementById('planner-bg');
    let bgImageName = `${lowerCity}.png`;
    if (lowerCity === 'chefchaouen') {
        bgImageName = 'chefchaouen_real.png';
    }
    bgEl.style.backgroundImage = `url('${bgImageName}')`;
    
    // Update breadcrumb/transport arrival
    const arrivalEl = document.getElementById('transport-arrival');
    if (arrivalEl) arrivalEl.value = city;
    const resArrivalEl = document.getElementById('transport-res-arrival');
    if (resArrivalEl) resArrivalEl.innerText = city;

    // 2. Tab Switching Logic
    const tabs = document.querySelectorAll('.planner-tab');
    const sections = document.querySelectorAll('.planner-content-section');
    const badge = document.getElementById('planner-city-badge');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Ignore Premium tab as it redirects
            if (this.classList.contains('tab-premium')) return;

            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active to clicked
            this.classList.add('active');
            const targetId = 'tab-' + this.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');

            // Update badge text
            if (badge) {
                badge.innerText = this.innerText;
            }
        });
    });

    // 3. API Data Loading for Lists
    loadCityData(city);
});

function showTransportResults() {
    document.getElementById('transport-results').style.display = 'block';
}

let currentBookingItem = "";

// Payment Modal State
let currentPaymentTicket = null;
let currentTicketPrice = 0;

function addToTrip(itemName) {
    currentBookingItem = itemName;
    const titleEl = document.getElementById('modal-booking-title');
    if (titleEl) {
        titleEl.innerText = `Book: ${itemName}`;
    }
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
}

// Open Payment Modal for Transport
function buyTransportTicket(ticketName, price) {
    currentPaymentTicket = ticketName;
    currentTicketPrice = price;
    
    document.getElementById('payment-ticket-details').innerText = `Complete your payment for: ${ticketName}`;
    document.getElementById('payment-pax').value = 1;
    updateTotal();

    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
}

function updateTotal() {
    const pax = parseInt(document.getElementById('payment-pax').value) || 1;
    const total = pax * currentTicketPrice;
    document.getElementById('payment-total').innerText = `${total} MAD`;
}

function hideModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
    }
}

function confirmBooking() {
    hideModal('booking-modal');
    showSuccessToast(`Successfully booked ${currentBookingItem}!`);
}

function confirmPayment() {
    hideModal('payment-modal');
    showSuccessToast(`Payment successful! ${currentPaymentTicket} ticket(s) booked.`);
}

function showSuccessToast(message) {
    const toast = document.getElementById('toast-notification');
    if (toast) {
        toast.innerText = message;
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
        
        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
        }, 3000);
    }
}

async function fetchPlacesFromAPI(city, query) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 second timeout

    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${query}+in+${city}&format=json&limit=5&addressdetails=1&extratags=1`;
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error('API request failed');
        return await response.json();
    } catch (e) {
        console.error(`Failed to fetch ${query} in ${city}:`, e);
        return []; // Fallback to empty array
    }
}

async function renderCategory(containerId, cityName, cityId, apiPath, query, fallbackItems, categoryName, defaultImages, buttonText) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '<p style="color: var(--color-text-main); font-size: 1.1rem; padding: 2rem;">Loading ' + categoryName + '...</p>';

    let itemsToRender = [];
    
    // 1. Try to fetch from our local backend first
    try {
        const response = await fetch(`http://localhost:3000/api/${apiPath}/${cityId}`);
        if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
                itemsToRender = data;
            }
        }
    } catch (e) {
        console.warn(`Local API failed for ${apiPath}, falling back to Nominatim/Static.`);
    }

    // 2. If local backend is empty, try Nominatim or use static fallbackItems
    if (itemsToRender.length === 0) {
        const places = await fetchPlacesFromAPI(cityName, query);
        itemsToRender = places.length > 0 ? places : fallbackItems;
    }
    
    let html = '';
    itemsToRender.forEach((item, index) => {
        const name = item.name || (item.display_name ? item.display_name.split(',')[0] : null) || item.fallbackName;
        const img = item.image || defaultImages[index % defaultImages.length];
        const desc = item.desc || item.type || "Experience the real flavors and culture of Morocco with this highly rated establishment.";
        
        html += `
            <div class="dest-card animate-fade-up">
                <div class="dest-card-image-wrap">
                  <img src="${img}" class="dest-card-static-img" alt="${name}"
                       onerror="this.src='moroccan_city_bg.png'">
                  <div class="dest-card-image-gradient"></div>
                  <div class="dest-card-floating-badge">${categoryName.toUpperCase()}</div>
                </div>
                <div class="dest-card-content">
                  <div class="dest-card-meta-row">
                    <span class="dest-card-weather-tag">🌍 ${cityName}</span>
                    <span class="dest-card-budget">${item.price || '●●○'}</span>
                  </div>
                  <h3 class="dest-card-name">${name}</h3>
                  <p class="dest-card-tagline">${item.type || categoryName} in ${cityName}</p>
                  <p class="dest-card-desc">${desc}</p>
                  <button class="dest-card-cta" onclick="buyTransportTicket('${name}', Math.floor(Math.random() * 50) + 50)" style="width: 100%;">
                    ${buttonText} <span>→</span>
                  </button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

async function loadCityData(cityName) {
    const cityId = cityName.toLowerCase().replace(/\s+/g, '_');
    
    const hotelsPromise = renderCategory(
        'logement-list', 
        cityName, 
        cityId,
        'accommodations',
        'hotels', 
        [
            { fallbackName: "Royal Mansour", desc: "A masterpiece of Moroccan architecture." },
            { fallbackName: "Dar Jasmine", desc: "A serene escape hidden within the ancient walls." }
        ],
        'Logement',
        ['riad.png', 'moroccan_city_bg.png', 'fes.png', 'marrakech.png'],
        'Book Room'
    );

    const restsPromise = renderCategory(
        'restaurants-list', 
        cityName, 
        cityId,
        'restaurants',
        'restaurants', 
        [
            { fallbackName: "Cafe Clock", desc: "Famous for its vibrant cultural events." },
            { fallbackName: "La Maison Arabe", desc: "An iconic dining establishment offering sophisticated traditional cuisine." }
        ],
        'Restaurant',
        ['restaurant.png', 'chefchaouen.png', 'merzouga.png'],
        'Book Table'
    );

    const actsPromise = renderCategory(
        'entertainment-list', 
        cityName, 
        cityId,
        'activities',
        'attractions', 
        [
            { fallbackName: "Medina Walking Tour", desc: "Discover the hidden gems and rich history." },
            { fallbackName: "Cooking Class", desc: "Learn to cook authentic tajine." }
        ],
        'Activity',
        ['fes.png', 'marrakech.png', 'chefchaouen.png'],
        'Book Activity'
    );

    await Promise.all([hotelsPromise, restsPromise, actsPromise]);
}


// End of file
