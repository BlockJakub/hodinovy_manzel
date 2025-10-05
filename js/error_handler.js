// Redirect to 500.html on uncaught JavaScript errors
window.onerror = function (message, source, lineno, colno, error) {
    window.location.href = "500.html";
    return true;
};