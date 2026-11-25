/**
 * wishlist.js
 * Manages the global wishlist system for YALLA.
 *
 * The list is kept in localStorage so pages can read it instantly.
 * When the visitor is signed in it is also saved on the server
 * (/api/wishlist), so it follows them across browsers and devices.
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

    function signedIn() {
        return !!(global.YallaApi && global.YallaApi.getToken());
    }

    // Sends a change to the server; on failure the local list is restored
    function pushChange(promiseFactory, rollbackList) {
        if (!signedIn()) return;
        promiseFactory().catch(function () {
            saveWishlist(rollbackList);
            showToast('Could not update your wishlist. Please try again.');
        });
    }

    // On page load: upload items saved before signing in, then take the server list
    function syncWithServer() {
        if (!signedIn()) return;
        var local = getWishlist();
        global.YallaApi.request('/wishlist').then(function (remote) {
            var missing = local.filter(function (l) {
                return !remote.some(function (r) { return r.id === l.id && r.type === l.type; });
            });
            if (missing.length === 0) return remote;
            return Promise.all(missing.map(function (item) {
                return global.YallaApi.request('/wishlist', { method: 'POST', body: item });
            })).then(function () { return global.YallaApi.request('/wishlist'); });
        }).then(function (list) {
            saveWishlist(list);
        }).catch(function () { /* offline: keep the local copy */ });
    }

    function toggleWishlist(item) {
        if (!item.id || !item.type) return false;

        let list = getWishlist();
        const index = list.findIndex(i => i.id === item.id && i.type === item.type);

        if (index > -1) {
            const previous = list.slice();
            list.splice(index, 1);
            showToast('Removed from wishlist');
            saveWishlist(list);
            pushChange(function () {
                return global.YallaApi.request(
                    '/wishlist/' + encodeURIComponent(item.type) + '/' + encodeURIComponent(item.id),
                    { method: 'DELETE' }
                );
            }, previous);
            return false;
        } else {
            // Avoid duplicates just in case
            const exists = list.some(i => i.id === item.id && i.type === item.type);
            if (!exists) {
                const previous = list.slice();
                const entry = {
                    id: item.id,
                    type: item.type,
                    name: item.name,
                    image: item.image,
                    city: item.city || '',
                    price: item.price || '',
                    category: item.category || item.type
                };
                list.push(entry);
                showToast('Added to wishlist');
                saveWishlist(list);
                pushChange(function () {
                    return global.YallaApi.request('/wishlist', { method: 'POST', body: entry });
                }, previous);
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', syncWithServer);
    } else {
        syncWithServer();
    }

    global.YallaWishlist = {
        get: getWishlist,
        toggle: toggleWishlist,
        exists: isInWishlist
    };
})(window);
