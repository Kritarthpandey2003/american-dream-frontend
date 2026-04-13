document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for Stat Counters
    const stats = document.querySelectorAll('.stat-number');
    const statsObserverOptions = {
        threshold: 0.5
    };

    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerText = Math.floor(progress * (end - start) + start).toLocaleString();
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
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, statsObserverOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // 2. HUD Navigation State Management
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.hud-links a');
    const carrier = document.querySelector('.cinematic-carrier');

    const navObserverOptions = {
        root: carrier,
        threshold: 0.6
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    // 3. Smooth Non-linear Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetEntry = document.querySelector(targetId);
            targetEntry.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 4. Parallax Effect for Background Videos
    carrier.addEventListener('scroll', () => {
        const scrolled = carrier.scrollTop;
        const bgVideos = document.querySelectorAll('.bg-video');
        bgVideos.forEach(video => {
            if (video.parentElement.classList.contains('active')) {
                video.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        });
    });

    // 5. Inquire Button Transformation (Micro-interaction)
    const inquireBtn = document.querySelector('.cta-pulse');
    inquireBtn.addEventListener('click', () => {
        inquireBtn.innerText = "Requesting Package...";
        inquireBtn.style.background = "#FFFFFF";
        inquireBtn.style.color = "#000000";
        
        setTimeout(() => {
            alert("Digital Sales Pitch Package sent to your device. Welcome to the future of retail.");
            inquireBtn.innerText = "Inquire";
            inquireBtn.style.background = "var(--accent)";
            inquireBtn.style.color = "var(--primary)";
        }, 1500);
    });

});
