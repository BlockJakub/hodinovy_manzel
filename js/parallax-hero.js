(function () {
    // Lightweight parallax hero (pointer + scroll)
    document.addEventListener('DOMContentLoaded', function () {
        const hero = document.querySelector('.parallax-hero');
        const bg = document.querySelector('.parallax-hero .hero__bg');
        if (!hero || !bg) return;

        let mouseX = 0, mouseY = 0;
        let lastX = 0, lastY = 0;
        let rafId = null;

        function update() {
            const dx = (mouseX - lastX) * 0.06;
            const dy = (mouseY - lastY) * 0.06;
            lastX += dx;
            lastY += dy;

            const maxScrollOffset = Math.min(window.scrollY, hero.clientHeight);
            const scrollFactor = (maxScrollOffset / hero.clientHeight) * 120;

            const finalX = Math.max(-30, Math.min(30, lastX));
            const finalY = Math.max(-120, Math.min(140, lastY + scrollFactor));

            const dynamicScale = 1.1 + Math.min(0.06, (scrollFactor / 120) * 0.06);
            bg.style.transform = `translate3d(${finalX}px, ${finalY}px, 0) scale(${dynamicScale.toFixed(3)})`;

            const blurPx = Math.min(6, (maxScrollOffset / hero.clientHeight) * 6);
            const sat = Math.max(0.6, 1 - (maxScrollOffset / hero.clientHeight) * 0.25);
            const bright = Math.max(0.85, 1 - (maxScrollOffset / hero.clientHeight) * 0.12);
            const filterValue = `saturate(${sat}) contrast(1) brightness(${bright}) blur(${blurPx}px)`;
            bg.style.setProperty('--hero-filter', filterValue);

            rafId = requestAnimationFrame(update);
        }

        function onMove(e) {
            const rect = hero.getBoundingClientRect();
            mouseX = (e.clientX - rect.left - rect.width / 2) * -0.02;
            mouseY = (e.clientY - rect.top - rect.height / 2) * -0.02;
            if (!rafId) update();
        }

        function onTouch(e) {
            if (!e.touches || !e.touches.length) return;
            onMove(e.touches[0]);
        }

        hero.addEventListener('mousemove', onMove);
        hero.addEventListener('touchmove', onTouch, { passive: true });
        window.addEventListener('scroll', () => { if (!rafId) update(); });
    });
})();
