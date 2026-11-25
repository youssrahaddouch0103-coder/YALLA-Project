/**
 * api.js
 * Shared API configuration for every page.
 *
 * When the site is served by the backend (npm start → http://localhost:3000),
 * API calls use relative URLs. When the pages are opened another way
 * (e.g. VS Code Live Server), they fall back to the local backend.
 */
const API_BASE_URL =
    window.location.port === '3000' ? '/api' : 'http://localhost:3000/api';
