// YALLA Shared Interactive Logic

// 1. Navigation Auth Init
document.addEventListener('DOMContentLoaded', function () {
    if (window.YallaAuth) YallaAuth.initNav('nav-auth-container');
    
    initTrips();
    initReviewForm();
});

// 2. Review Form Logic
function initReviewForm() {
    const stars = document.querySelectorAll('#star-rating span');
    const ratingInput = document.getElementById('review-stars');
    const reviewForm = document.getElementById('submit-review-form');

    if (!stars.length || !ratingInput || !reviewForm) return;

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            ratingInput.value = value;
            
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= value) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const rating = ratingInput.value;
        if(rating === "0") {
            alert("Please select a star rating!");
            return;
        }
        const name = document.getElementById('review-name').value;
        const title = document.getElementById('review-title').value;
        const text = document.getElementById('review-text').value;

        const review = { rating, name, title, text };
        
        // Save to localStorage
        let reviews = JSON.parse(localStorage.getItem('yalla_reviews') || '[]');
        reviews.unshift(review);
        localStorage.setItem('yalla_reviews', JSON.stringify(reviews));

        alert("Thank you! Your review has been submitted and will appear on the homepage.");
        this.reset();
        stars.forEach(s => s.classList.remove('active'));
        ratingInput.value = "0";
    });
}

// 3. Modal logic: Mes Reservations
function openModal(tripName) {
    const titleEl = document.getElementById('modal-trip-name');
    const modalEl = document.getElementById('reservations-modal');
    if (titleEl && modalEl) {
        titleEl.innerText = tripName;
        modalEl.classList.add('active');
    }
}

function closeModal() {
    const modalEl = document.getElementById('reservations-modal');
    if (modalEl) modalEl.classList.remove('active');
}

function toggleEdit(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    if (input.disabled) {
        input.disabled = false;
        input.focus();
        btn.innerText = "Save";
        btn.style.background = "#0A5C4A";
        btn.style.borderColor = "#0A5C4A";
    } else {
        input.disabled = true;
        btn.innerText = "Modify";
        btn.style.background = "rgba(255,255,255,0.1)";
        btn.style.borderColor = "rgba(255,255,255,0.2)";
        alert("Date successfully modified to " + input.value);
    }
}

function cancelReservation(resId) {
    if (confirm("Are you sure you want to cancel this reservation?")) {
        const item = document.getElementById(resId);
        if (item) {
            item.style.opacity = '0.5';
            item.style.pointerEvents = 'none';
            const cancelBtn = item.querySelector('.btn-cancel-sm');
            if (cancelBtn) cancelBtn.innerText = 'Cancelled';
        }
    }
}

function cancelEntireTrip() {
    if (confirm("Are you sure you want to cancel this ENTIRE trip and all its reservations?")) {
        alert("Trip cancelled successfully.");
        closeModal();
    }
}

// 4. Trips Display Logic
let showingAllTrips = false;

function initTrips() {
    const cards = document.querySelectorAll('.trip-card');
    if(cards.length > 4) {
        for(let i=4; i<cards.length; i++){
            cards[i].style.display = 'none';
        }
    } else {
        const btn = document.getElementById('btn-toggle-trips');
        if(btn) btn.style.display = 'none';
    }
}

function toggleTrips() {
    const cards = document.querySelectorAll('.trip-card');
    const btn = document.getElementById('btn-toggle-trips');
    
    if (!btn) return;
    
    showingAllTrips = !showingAllTrips;
    
    for(let i=4; i<cards.length; i++){
        cards[i].style.display = showingAllTrips ? 'flex' : 'none';
    }
    
    if(showingAllTrips) {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:0.5rem;"><polyline points="18 15 12 9 6 15"></polyline></svg> Show Less`;
    } else {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:0.5rem;"><polyline points="6 9 12 15 18 9"></polyline></svg> Show More`;
    }
}

// Global modal close on outside click
document.addEventListener('DOMContentLoaded', function () {
    const resModal = document.getElementById('reservations-modal');
    if (resModal) {
        resModal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
});

// 5. Footer Modals & Visa Info
function showFooterModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.style.opacity = '1', 10);
    }
}

function hideFooterModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

function showVisaInfo() {
    const val = document.getElementById('visa-country').value;
    const res = document.getElementById('visa-result');
    if (!res) return;
    
    if (!val) { res.style.display = 'none'; return; }
    res.style.display = 'block';
    
    if (val === 'visa-free') {
        res.innerHTML = `
            <div style="background:rgba(0,255,136,0.08); border:1px solid rgba(0,255,136,0.3); border-radius:12px; padding:1.5rem;">
                <h3 style="color:#00ff88; margin:0 0 0.8rem 0;">✅ Visa-Free Entry</h3>
                <p style="color:rgba(255,255,255,0.8); margin:0 0 0.5rem 0;">Citizens of your country can enter Morocco <strong style="color:white;">without a visa</strong> for up to <strong style="color:white;">90 days</strong>.</p>
                <p style="color:rgba(255,255,255,0.6); margin:0; font-size:0.85rem;">📄 Required: Valid passport (6+ months validity)</p>
            </div>`;
    } else {
        res.innerHTML = `
            <div style="background:rgba(255,180,0,0.08); border:1px solid rgba(255,180,0,0.3); border-radius:12px; padding:1.5rem;">
                <h3 style="color:#ffb400; margin:0 0 0.8rem 0;">⚠️ Visa Required</h3>
                <p style="color:rgba(255,255,255,0.8); margin:0 0 0.5rem 0;">Citizens of your country need a <strong style="color:white;">visa</strong> to enter Morocco.</p>
                <p style="color:rgba(255,255,255,0.6); margin:0 0 0.3rem 0; font-size:0.85rem;">📄 Apply at the nearest Moroccan Embassy or Consulate</p>
                <p style="color:rgba(255,255,255,0.6); margin:0; font-size:0.85rem;">⏱️ Processing time: 5–15 business days</p>
            </div>`;
    }
}
