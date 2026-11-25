/**
 * Shared authenticated navbar: avatar (photo or initials), account dropdown, preferences hook.
 */
(function (global) {
    var SESSION_KEY = 'yalla_session';
    var NAME_KEY = 'yalla_name';
    var EMAIL_KEY = 'yalla_email';
    var AVATAR_KEY = 'yalla_avatar';
    var LANG_KEY = 'yalla_language';
    var LANG_KEY = 'yalla_language';

    function isLoggedIn() {
        // A session exists only after a real sign-in: the server returns a signed token
        return !!localStorage.getItem('yalla_token');
    }

    function getDisplayName() {
        var n = localStorage.getItem(NAME_KEY);
        if (n && n.trim()) return n.trim();
        var email = localStorage.getItem(EMAIL_KEY) || '';
        var part = email.split('@')[0] || 'Traveler';
        return part.replace(/[._-]+/g, ' ').replace(/\b\w/g, function (c) {
            return c.toUpperCase();
        });
    }

    function getEmail() {
        return localStorage.getItem(EMAIL_KEY) || '';
    }

    function getInitials(name) {
        var parts = (name || '').trim().split(/\s+/).filter(Boolean);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        if (parts.length === 1 && parts[0].length) {
            return parts[0].substring(0, 2).toUpperCase();
        }
        return '?';
    }

    function avatarDataUrl() {
        return localStorage.getItem(AVATAR_KEY);
    }

    function defaultAvatarSvgUrl(name) {
        var initials = escapeXml(getInitials(name));
        var svg =
            '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">' +
            '<circle cx="48" cy="48" r="48" fill="#2a3441"/>' +
            '<text x="48" y="56" text-anchor="middle" fill="#F4A261" font-size="34" font-family="Outfit,sans-serif" font-weight="700">' +
            initials +
            '</text></svg>';
        return 'data:image/svg+xml,' + encodeURIComponent(svg);
    }

    function escapeXml(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function applyStoredPreferences() {
        var lang = localStorage.getItem(LANG_KEY) || 'en';
        if (document.documentElement) document.documentElement.lang = lang;
    }



    function setLanguage(lang) {
        localStorage.setItem(LANG_KEY, lang);
        applyStoredPreferences();
    }



    function closeAllMenus() {
        document.querySelectorAll('.nav-user-menu-wrap.is-open').forEach(function (w) {
            w.classList.remove('is-open');
            var btn = w.querySelector('.user-avatar-btn');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    }

    function performLogout() {
        [
            SESSION_KEY,
            NAME_KEY,
            EMAIL_KEY,
            AVATAR_KEY,
            'yalla_phone',
            LANG_KEY,
            'yalla_nationality',
            'yalla_passport',
            'yalla_currency',

            'yalla_digest',
            'yalla_password'
        ].forEach(function (k) {
            localStorage.removeItem(k);
        });
        if (global.YallaApi) global.YallaApi.clearSession();
        global.location.href = 'index.html';
    }

    function logout() {
        if (!confirm('Sign out of your account?')) return;
        performLogout();
    }

    function bindDropdown(wrap) {
        var btn = wrap.querySelector('.user-avatar-btn');
        var dd = wrap.querySelector('.nav-user-dropdown');
        if (!btn || !dd) return;

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var open = wrap.classList.toggle('is-open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.querySelectorAll('.nav-user-menu-wrap.is-open').forEach(function (other) {
                if (other !== wrap) {
                    other.classList.remove('is-open');
                    var b = other.querySelector('.user-avatar-btn');
                    if (b) b.setAttribute('aria-expanded', 'false');
                }
            });
        });

        dd.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        // Handle Quick Selectors
        var langSel = dd.querySelector('.nav-user-qs-lang');
        if (langSel) {
            langSel.addEventListener('change', function() {
                setLanguage(this.value);
            });
        }


    }

    function onDocClick() {
        closeAllMenus();
    }

    function onKey(e) {
        if (e.key === 'Escape') closeAllMenus();
    }

    var docBound = false;
    function ensureDocListeners() {
        if (docBound) return;
        docBound = true;
        document.addEventListener('click', onDocClick);
        document.addEventListener('keydown', onKey);
    }

    function renderLoggedInMarkup() {
        var name = getDisplayName();
        var email = getEmail();
        var photo = avatarDataUrl();
        var imgUrl = photo || defaultSvgUrlFor(name);
        var initials = getInitials(name);
        var currentLang = localStorage.getItem(LANG_KEY) || 'en';

        var innerAvatar = photo
            ? '<img src="' + photo + '" alt="" class="user-avatar-img">'
            : '<span class="user-avatar-initials" aria-hidden="true">' + initials + '</span>';

        var emailLine = email
            ? '<p class="nav-user-dropdown-email">' + escapeHtml(email) + '</p>'
            : '';

        return (
            '<div class="nav-user-menu-wrap">' +
                '<button type="button" class="user-avatar-btn" aria-expanded="false" aria-haspopup="true" aria-label="Account menu">' +
                    innerAvatar +
                '</button>' +
                '<div class="nav-user-dropdown" role="menu">' +
                    '<div class="nav-user-dropdown-header">' +
                        '<img src="' + imgUrl + '" alt="" class="nav-user-dropdown-avatar">' +
                        '<div class="nav-user-dropdown-meta">' +
                            '<p class="nav-user-dropdown-name">' + escapeHtml(name) + '</p>' +
                            emailLine +
                        '</div>' +
                    '</div>' +
                    '<div class="nav-user-dropdown-divider"></div>' +
                    
                    '<div class="nav-user-dropdown-group">' +
                        '<a role="menuitem" class="nav-user-dropdown-item" href="profile.html">' +
                            '<span class="nav-user-dropdown-icon">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
                            '</span>' +
                            'My Profile' +
                        '</a>' +
                        '<a role="menuitem" class="nav-user-dropdown-item" href="wishlist.html">' +
                            '<span class="nav-user-dropdown-icon">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
                            '</span>' +
                            'Wishlist' +
                        '</a>' +
                    '</div>' +
                    
                    '<div class="nav-user-dropdown-divider"></div>' +
                    
                    '<div class="nav-user-dropdown-qs">' +
                        '<div class="nav-user-qs-item">' +
                            '<span class="nav-user-qs-label">Language</span>' +
                            '<select class="nav-user-qs-lang" aria-label="Select language">' +
                                '<option value="en" ' + (currentLang === 'en' ? 'selected' : '') + '>English</option>' +
                                '<option value="fr" ' + (currentLang === 'fr' ? 'selected' : '') + '>Français</option>' +
                                '<option value="ar" ' + (currentLang === 'ar' ? 'selected' : '') + '>العربية</option>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +

                    '<div class="nav-user-dropdown-divider"></div>' +
                    
                    '<button type="button" role="menuitem" class="nav-user-dropdown-item nav-user-dropdown-logout">' +
                        '<span class="nav-user-dropdown-icon">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' +
                        '</span>' +
                        'Sign Out' +
                    '</button>' +
                '</div>' +
            '</div>'
        );
    }

    function defaultSvgUrlFor(name) {
        return defaultAvatarSvgUrl(name);
    }

    function escapeHtml(text) {
        var d = document.createElement('div');
        d.textContent = text;
        return d.innerHTML;
    }

    function initNav(containerId) {
        var el = document.getElementById(containerId || 'nav-auth-container');
        if (!el) return;

        applyStoredPreferences();

        if (!isLoggedIn()) {
            el.innerHTML =
                '<div class="nav-actions">' +
                    '<a href="login.html" class="btn-login-nav">Log In</a>' +
                    '<a href="signup.html" class="btn-signup-nav">Sign Up</a>' +
                '</div>';
            return;
        }

        el.innerHTML = renderLoggedInMarkup();
        var wrap = el.querySelector('.nav-user-menu-wrap');
        if (wrap) bindDropdown(wrap);
        var logoutBtn = el.querySelector('.nav-user-dropdown-logout');
        if (logoutBtn) logoutBtn.addEventListener('click', logout);
        ensureDocListeners();
    }

    global.YallaAuth = {
        isLoggedIn: isLoggedIn,
        getDisplayName: getDisplayName,
        getEmail: getEmail,
        getInitials: getInitials,
        avatarDataUrl: avatarDataUrl,
        defaultAvatarSvgUrl: defaultAvatarSvgUrl,
        applyStoredPreferences: applyStoredPreferences,
        initNav: initNav,
        logout: logout,
        performLogout: performLogout,
        setLanguage: setLanguage
    };

    // Check the stored session with the server and refresh the cached profile.
    // An expired or invalid token signs the visitor out.
    if (isLoggedIn() && global.YallaApi) {
        global.YallaApi.request('/auth/me').then(function (data) {
            global.YallaApi.cacheUser(data.user);
        }).catch(function (err) {
            if (err.status === 401) {
                global.YallaApi.clearSession();
                global.location.reload();
            }
        });
    }

    // Global click interceptor for protected links
    document.addEventListener('click', function(e) {
        var target = e.target.closest('a[href="premium-guides.html"]');
        if (target && !isLoggedIn()) {
            e.preventDefault();
            alert('Veuillez vous connecter à votre compte pour accéder aux Guides Premium.');
            window.location.href = 'login.html';
        }
    });

})(typeof window !== 'undefined' ? window : this);

