/**
 * city-details.js
 * Handles the tabbed City Details modal (Check Availability).
 */
(function(global) {
    const detailsData = {
        'marrakech': {
            restaurants: [
                { name: 'Nomad', type: 'Modern Moroccan', price: '$$', rating: '4.8', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200' },
                { name: 'Le Jardin', type: 'Traditional', price: '$$$', rating: '4.7', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200' }
            ],
            logement: [
                { name: 'Riad Kniza', type: 'Luxury Riad', price: '$$$$', rating: '4.9', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200' },
                { name: 'Selman Marrakech', type: 'Palace', price: '$$$$$', rating: '5.0', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200' }
            ],
            entertainment: [
                { name: 'Hot Air Balloon', price: '$200', icon: '🎈' },
                { name: 'Medina Food Tour', price: '$45', icon: '🍲' },
                { name: 'Majorelle Garden', price: '$15', icon: '🌵' }
            ],
            transport: [
                { name: 'Private Chauffeur', price: '$80/day', icon: '🚗' },
                { name: 'Green Taxi', price: '$5-10/trip', icon: '🚕' },
                { name: 'Luxury Van', price: '$120/day', icon: '🚐' }
            ]
        },
        'chefchaouen': {
            restaurants: [
                { name: 'Aladdin', type: 'Rooftop View', price: '$$', rating: '4.6', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200' },
                { name: 'Casa Hassan', type: 'Traditional', price: '$$', rating: '4.5', image: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=200' }
            ],
            logement: [
                { name: 'Lina Ryad & Spa', type: 'Boutique', price: '$$$', rating: '4.8', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200' },
                { name: 'Riad Cherifa', type: 'Traditional', price: '$$', rating: '4.7', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=200' }
            ],
            entertainment: [
                { name: 'Rif Mountains Hike', price: '$30', icon: '⛰️' },
                { name: 'Spanish Mosque Sunset', price: 'Free', icon: '🌅' }
            ],
            transport: [
                { name: 'Local Taxi', price: '$2-5', icon: '🚕' },
                { name: 'Shared Grand Taxi', price: '$10', icon: '🚐' }
            ]
        }
        // Default data for others
    };

    function openCityDetails(cityId, cityName) {
        let modal = document.getElementById('city-details-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'city-details-modal';
            modal.className = 'catalog-modal-overlay';
            document.body.appendChild(modal);
        }

        const data = detailsData[cityId.toLowerCase()] || {
            restaurants: [{ name: 'Local Delight', type: 'Traditional', price: '$$', rating: '4.5', image: '' }],
            logement: [{ name: 'Premium Riad', type: 'Authentic', price: '$$$', rating: '4.7', image: '' }],
            entertainment: [{ name: 'City Walking Tour', price: '$20', icon: '🚶' }],
            transport: [{ name: 'Grand Taxi', price: '$15', icon: '🚕' }]
        };

        modal.innerHTML = `
            <div class="modal-catalog-container" style="max-width: 900px; height: 80vh; display: flex; flex-direction: column;">
                <button class="modal-close-btn" onclick="closeCityDetails()">&times;</button>
                
                <div class="city-details-header" style="padding: var(--spacing-8) var(--spacing-8) 0;">
                    <div class="overline">Availability & Planning</div>
                    <h2 class="modal-title">${cityName}</h2>
                </div>

                <div class="city-details-tabs">
                    <button class="tab-btn active" onclick="switchTab(event, 'tab-city')">City</button>
                    <button class="tab-btn" onclick="switchTab(event, 'tab-restaurants')">Restaurants</button>
                    <button class="tab-btn" onclick="switchTab(event, 'tab-logement')">Logement</button>
                    <button class="tab-btn" onclick="switchTab(event, 'tab-entertainment')">Entertainment</button>
                    <button class="tab-btn" onclick="switchTab(event, 'tab-transport')">Transport</button>
                </div>

                <div class="city-details-content" style="flex: 1; overflow-y: auto; padding: var(--spacing-8);">
                    <div id="tab-city" class="tab-panel active">
                        <div class="grid grid-cols-2" style="gap: var(--spacing-8);">
                            <div>
                                <h3 style="margin-bottom: var(--spacing-4);">About ${cityName}</h3>
                                <p class="text-muted">Explore the heart of Morocco's ${cityId} experience. Our verified partners ensure the highest standards of hospitality and authenticity.</p>
                                <div style="margin-top: var(--spacing-6); padding: var(--spacing-4); background: var(--color-bg-body); border-radius: var(--radius-md);">
                                    <h4 style="font-size: 14px; margin-bottom: 8px;">Travel Alert</h4>
                                    <p style="font-size: 12px; color: var(--color-secondary);">Verified: High availability for the 2030 World Cup period. Book now to secure premium rates.</p>
                                </div>
                            </div>
                            <div style="border-radius: var(--radius-lg); overflow: hidden; height: 200px;">
                                <img src="${cityId}.png" onerror="this.src='moroccan_city_bg.png'" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>
                    </div>

                    <div id="tab-restaurants" class="tab-panel">
                        <div class="grid grid-cols-2" style="gap: var(--spacing-4);">
                            ${data.restaurants.map(r => `
                                <div class="detail-item-card">
                                    <img src="${r.image || 'https://via.placeholder.com/200'}" alt="${r.name}">
                                    <div class="detail-item-info">
                                        <h4>${r.name}</h4>
                                        <span>${r.type} • ${r.price}</span>
                                        <div class="rating">★ ${r.rating}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div id="tab-logement" class="tab-panel">
                        <div class="grid grid-cols-2" style="gap: var(--spacing-4);">
                            ${data.logement.map(l => `
                                <div class="detail-item-card">
                                    <img src="${l.image || 'https://via.placeholder.com/200'}" alt="${l.name}">
                                    <div class="detail-item-info">
                                        <h4>${l.name}</h4>
                                        <span>${l.type} • ${l.price}</span>
                                        <div class="rating">★ ${l.rating}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div id="tab-entertainment" class="tab-panel">
                        <div class="detail-list">
                            ${data.entertainment.map(e => `
                                <div class="list-item">
                                    <span class="item-icon">${e.icon}</span>
                                    <span class="item-name">${e.name}</span>
                                    <span class="item-price">${e.price}</span>
                                    <button class="btn btn-sm btn-outline">Add</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div id="tab-transport" class="tab-panel">
                        <div class="detail-list">
                            ${data.transport.map(t => `
                                <div class="list-item">
                                    <span class="item-icon">${t.icon}</span>
                                    <span class="item-name">${t.name}</span>
                                    <span class="item-price">${t.price}</span>
                                    <button class="btn btn-sm btn-outline">Add</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="city-details-footer" style="padding: var(--spacing-6) var(--spacing-8); border-top: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 14px; color: var(--color-text-muted);">
                        Estimated Plan: <strong style="color: var(--color-primary);">$150/day</strong>
                    </div>
                    <button class="btn btn-primary" onclick="window.location.href='city-planner.html?city=${cityId}'">Start Real-Time Planning</button>
                </div>
            </div>
        `;

        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    global.switchTab = function(e, tabId) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        
        e.currentTarget.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    };

    global.closeCityDetails = function() {
        const modal = document.getElementById('city-details-modal');
        if (modal) {
            modal.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    };

    global.openCityDetails = openCityDetails;
})(window);
