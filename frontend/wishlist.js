/**
 * wishlist.js
 * Manages the global wishlist system for YALLA.
 */
(function(global) {
    const WISHLIST_KEY = 'yalla_wishlist';

    function getWishlist() {
        try {
            return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
        } catch(e) {
            return [];
        }
    }

    function saveWishlist(list) {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
        // Dispatch event for other tabs or components
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: list }));
    }

    function toggleWishlist(item) {
        if (!item.id || !item.type) return false;

        let list = getWishlist();
        const index = list.findIndex(i => i.id === item.id && i.type === item.type);

        if (index > -1) {
            list.splice(index, 1);
            showToast('Removed from wishlist');
            saveWishlist(list);
            return false;
        } else {
            // Avoid duplicates just in case
            const exists = list.some(i => i.id === item.id && i.type === item.type);
            if (!exists) {
                list.push({
                    id: item.id,
                    type: item.type,
                    name: item.name,
                    image: item.image,
                    city: item.city || '',
                    price: item.price || '',
                    category: item.category || item.type
                });
                showToast('Added to wishlist');
                saveWishlist(list);
                return true;
            }
            return true;
        }
    }

    function isInWishlist(id, type) {
        let list = getWishlist();
        return list.some(i => i.id === id && i.type === type);
    }

    function showToast(message) {
        let container = document.getElementById('wishlist-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'wishlist-toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'wishlist-toast';
        toast.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span>${message}</span>
        `;
        container.appendChild(toast);
        
        setTimeout(() => toast.classList.add('is-visible'), 10);
        setTimeout(() => {
            toast.classList.remove('is-visible');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    global.YallaWishlist = {
        get: getWishlist,
        toggle: toggleWishlist,
        exists: isInWishlist
    };
})(window);
