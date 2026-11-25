/**
 * api.js
 * Shared API configuration and session helpers for every page.
 *
 * The backend serves both the pages and the API, so API calls use a relative
 * URL (works on localhost:3000 and once deployed). Pages opened another way
 * (a file:// URL or VS Code Live Server) fall back to the local backend.
 */
const LIVE_SERVER_PORTS = ['5500', '5501'];
const API_BASE_URL =
    window.location.protocol === 'file:' || LIVE_SERVER_PORTS.includes(window.location.port)
        ? 'http://localhost:3000/api'
        : '/api';

(function (global) {
    var TOKEN_KEY = 'yalla_token';

    // Profile values cached in localStorage so the navbar renders instantly
    var CACHE = {
        full_name: 'yalla_name',
        email: 'yalla_email',
        avatar: 'yalla_avatar',
        phone: 'yalla_phone',
        nationality: 'yalla_nationality',
        passport_number: 'yalla_passport',
        language: 'yalla_language',
        currency: 'yalla_currency'
    };

    function getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    function cacheUser(user) {
        Object.keys(CACHE).forEach(function (field) {
            var value = user[field];
            if (value === null || value === undefined || value === '') {
                localStorage.removeItem(CACHE[field]);
            } else {
                localStorage.setItem(CACHE[field], value);
            }
        });
    }

    function saveSession(token, user) {
        localStorage.setItem(TOKEN_KEY, token);
        cacheUser(user);
    }

    function clearSession() {
        localStorage.removeItem(TOKEN_KEY);
        Object.keys(CACHE).forEach(function (field) {
            localStorage.removeItem(CACHE[field]);
        });
        // Values written by older versions of the site
        localStorage.removeItem('yalla_wishlist'); // belongs to the signed-out account
        ['yalla_session', 'yalla_password', 'yalla_digest'].forEach(function (k) {
            localStorage.removeItem(k);
        });
    }

    /**
     * Calls the API and returns the parsed JSON body.
     * Throws an Error carrying the server's message on failure;
     * err.status is set for HTTP errors (401 = not signed in).
     */
    async function request(path, options) {
        options = options || {};
        var headers = { 'Content-Type': 'application/json' };
        var token = getToken();
        if (token) headers.Authorization = 'Bearer ' + token;

        var response;
        try {
            response = await fetch(API_BASE_URL + path, {
                method: options.method || 'GET',
                headers: headers,
                body: options.body !== undefined ? JSON.stringify(options.body) : undefined
            });
        } catch (networkError) {
            throw new Error('Cannot reach the YALLA server. Is the backend running?');
        }

        var data = null;
        try { data = await response.json(); } catch (e) { /* empty body */ }

        if (!response.ok) {
            var error = new Error((data && (data.error || data.message)) || 'Request failed');
            error.status = response.status;
            throw error;
        }
        return data;
    }

    global.YallaApi = {
        request: request,
        getToken: getToken,
        saveSession: saveSession,
        clearSession: clearSession,
        cacheUser: cacheUser
    };
})(window);
