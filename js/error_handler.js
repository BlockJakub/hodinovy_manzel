(function () {
    // --- Helpers ---
    function getPageInfo() {
        var path = window.location.pathname;
        var isEng = path.indexOf('/eng/') !== -1 || path.indexOf('index_eng') !== -1;
        var isSubpage = path.indexOf('/pages/') !== -1;
        var base = isSubpage ? '../../' : '';
        return { isEng: isEng, base: base };
    }

    function get500Url() {
        var info = getPageInfo();
        var page = info.isEng ? 'pages/eng/500_error_eng.html' : 'pages/cz/500_error_cz.html';
        return info.base + page;
    }

    // --- Offline overlay ---
    function showOfflineBanner() {
        if (document.getElementById('offline-banner')) return;
        var info = getPageInfo();
        var msg = info.isEng
            ? 'You are offline. Please check your internet connection.'
            : 'Jste offline. Zkontrolujte prosím připojení k internetu.';
        var banner = document.createElement('div');
        banner.id = 'offline-banner';
        banner.setAttribute('role', 'alert');
        banner.style.cssText = [
            'position:fixed', 'top:0', 'left:0', 'width:100%', 'z-index:99999',
            'background:#dc3545', 'color:#fff', 'text-align:center',
            'padding:0.75rem 1rem', 'font-size:1rem', 'font-weight:600',
            'box-shadow:0 2px 8px rgba(0,0,0,0.3)'
        ].join(';');
        banner.textContent = msg;
        document.body ? document.body.prepend(banner) : document.addEventListener('DOMContentLoaded', function () { document.body.prepend(banner); });
    }

    function hideOfflineBanner() {
        var banner = document.getElementById('offline-banner');
        if (banner) banner.remove();
    }

    // Show banner immediately if already offline on page load
    if (!navigator.onLine) showOfflineBanner();

    window.addEventListener('offline', showOfflineBanner);
    window.addEventListener('online', function () {
        hideOfflineBanner();
        // Silently reload to restore any failed resources
        window.location.reload();
    });

    // --- JS runtime errors: redirect to 500 only when online ---
    window.onerror = function (message, source, lineno, colno, error) {
        if (navigator.onLine) {
            window.location.href = get500Url();
        }
        return true;
    };

    // --- Unhandled Promise rejections ---
    window.addEventListener('unhandledrejection', function (e) {
        if (navigator.onLine) {
            window.location.href = get500Url();
        }
    });
})();
