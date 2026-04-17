document.addEventListener('DOMContentLoaded', () => {
    
    const slides = document.querySelectorAll('.slide');
    const navLinks = document.querySelectorAll('.nav-link');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    
    let currentSlideIndex = 0;

    // --- Slide State Management ---
    const updateDeckState = (index) => {
        if (index < 0 || index >= slides.length) return;
        
        // Remove active class from previous
        slides[currentSlideIndex].classList.remove('active');
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Update to new index
        currentSlideIndex = index;
        
        // Add active class to new
        slides[currentSlideIndex].classList.add('active');
        if(navLinks[currentSlideIndex]) {
            navLinks[currentSlideIndex].classList.add('active');
        }

        // Trigger Animations if entering stats slide
        if (slides[currentSlideIndex].id === 'scale') {
            runStatsAnimation();
        }
    };

    // --- Navigation Controls ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetIndex = parseInt(link.getAttribute('data-index'));
            updateDeckState(targetIndex);
        });
    });

    prevBtn.addEventListener('click', () => updateDeckState(currentSlideIndex - 1));
    nextBtn.addEventListener('click', () => updateDeckState(currentSlideIndex + 1));

    // --- Keyboard Navigation ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            updateDeckState(currentSlideIndex + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            updateDeckState(currentSlideIndex - 1);
        }
    });

    // --- Stats Counter Animation ---
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false; // Run only once

    const animateValue = (obj, start, end, duration, suffix = "") => {
        let startTimestamp = null;
        let isFormatted = end > 1000;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let currentVal = Math.floor(progress * (end - start) + start);
            
            obj.innerText = (isFormatted ? currentVal.toLocaleString() : currentVal) + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const runStatsAnimation = () => {
        if (hasAnimatedStats) return;
        
        // Define targets manually for simplicity in this struct
        const targets = [
            { el: stats[0], val: 3000000, suffix: "" },
            { el: stats[1], val: 40, suffix: "M+" },
            { el: stats[2], val: 15, suffix: " MINS" }
        ];

        targets.forEach(t => animateValue(t.el, 0, t.val, 2000, t.suffix));
        hasAnimatedStats = true;
    };

});
