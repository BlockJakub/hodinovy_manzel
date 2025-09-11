(function () {
    // Counters animation using jQuery (guarded)
    if (typeof window.jQuery === 'undefined') return;
    (function ($) {
        $(function () {
            let countersStarted = false;

            function animateCounters() {
                $('.counter').each(function () {
                    let $this = $(this);
                    let target = +$this.attr('data-target');
                    let count = 0;
                    let step = target / 200;

                    let interval = setInterval(function () {
                        count += step;
                        if (count >= target) {
                            count = target;
                            clearInterval(interval);
                        }
                        $this.text(Math.floor(count));
                    }, 10);
                });
            }

            $(window).on('scroll', function () {
                const stats = $('#stats');
                if (!stats.length) return;
                let statsTop = stats.offset().top - window.innerHeight + 100;
                if (!countersStarted && $(window).scrollTop() > statsTop) {
                    animateCounters();
                    countersStarted = true;
                }
            });
        });
    })(window.jQuery);
})();
