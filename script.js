document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for Stat Counters
    const stats = document.querySelectorAll('.stat-number');
    const statsObserverOptions = {
        threshold: 0.5
    };

    const animateValue = (obj, start, end, duration, suffix = "") => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerText = Math.floor(progress * (end - start) + start).toLocaleString() + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const suffix = entry.target.getAttribute('data-suffix') || "";
                animateValue(entry.target, 0, target, 2000, suffix);
                observer.unobserve(entry.target);
            }
        });
    }, statsObserverOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // 2. Deck Navigation & State Management
    const slides = document.querySelectorAll('.slide');
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const carrier = document.getElementById('deck-canvas');
    const progressBar = document.getElementById('progress-bar');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const menuToggle = document.getElementById('menu-toggle');
    const deckNav = document.getElementById('deck-nav');

    let currentSlideIndex = 0;

    const updateDeckState = (index) => {
        // Update Sidebar
        sidebarItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        // Update Progress Bar
        const progress = ((index + 1) / slides.length) * 100;
        progressBar.style.height = `${progress}%`;

        currentSlideIndex = index;
    };

    const navObserverOptions = {
        root: carrier,
        threshold: 0.6
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(slides).indexOf(entry.target);
                slides.forEach(s => s.classList.remove('active'));
                entry.target.classList.add('active');
                updateDeckState(index);
            }
        });
    }, navObserverOptions);

    slides.forEach(slide => navObserver.observe(slide));

    // 3. Navigation Controls
    const scrollToSlide = (index) => {
        if (index >= 0 && index < slides.length) {
            slides[index].scrollIntoView({ behavior: 'smooth' });
        }
    };

    sidebarItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSlide(index);
            if (window.innerWidth <= 1024) {
               deckNav.classList.remove('open');
            }
        });
    });

    prevBtn.addEventListener('click', () => scrollToSlide(currentSlideIndex - 1));
    nextBtn.addEventListener('click', () => scrollToSlide(currentSlideIndex + 1));

    // 4. Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            scrollToSlide(currentSlideIndex + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollToSlide(currentSlideIndex - 1);
        }
    });

    // 5. Mobile Menu Logic
    menuToggle.addEventListener('click', () => {
        deckNav.classList.toggle('open');
    });

    // 6. Parallax Effect (Refined)
    carrier.addEventListener('scroll', () => {
        const scrolled = carrier.scrollTop;
        const activeSlide = slides[currentSlideIndex];
        const video = activeSlide.querySelector('.bg-video');
        if (video) {
            const offset = (scrolled - activeSlide.offsetTop) * 0.3;
            video.style.transform = `translateY(${offset}px)`;
        }
    });

    // 7. Inquire Button Transformation
    const inquireBtns = document.querySelectorAll('.cta-sidebar, .cta-pulse');
    inquireBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const originalText = btn.innerText;
            btn.innerText = "Requesting Package...";
            
            setTimeout(() => {
                alert("Digital Sales Pitch Package sent. Welcome to the future of retail.");
                btn.innerText = originalText;
            }, 1000);
        });
    });


});
