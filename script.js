document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. CINEMATIC PRELOADER ===
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 2500); // Wait for logo animation to finish

    // === 2. CUSTOM LUXURY CURSOR ===
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate update for dot
        dot.style.top = `${mouseY}px`;
        dot.style.left = `${mouseX}px`;
    });

    // Lerp (Linear Interpolation) for smooth trailing ring
    const renderCursor = () => {
        ringX += (mouseX - ringX) * 0.15; // Delay factor
        ringY += (mouseY - ringY) * 0.15;
        
        ring.style.top = `${ringY}px`;
        ring.style.left = `${ringX}px`;
        
        requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Cursor Hover States
    const interactables = document.querySelectorAll('a, button, .hub-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });


    // === 3. HUB ROUTING & 3D PARALLAX TILT ===
    const hub = document.getElementById('atlas-hub');
    const cards = document.querySelectorAll('.hub-card');
    const closeBtns = document.querySelectorAll('.close-btn');

    cards.forEach(card => {
        // Routing
        card.addEventListener('click', () => {
            const targetId = card.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);
            
            hub.classList.remove('active');
            
            setTimeout(() => {
                targetModal.classList.add('active');
                if (targetId === 'deep-scale') startParticles();
            }, 300);
        });

        // 3D Parallax Tilt
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg
            const rotateY = ((x - centerX) / centerX) * 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.deep-dive');
            modal.classList.remove('active');
            
            if (modal.id === 'deep-scale') stopParticles();
            
            setTimeout(() => {
                hub.classList.add('active');
            }, 500);
        });
    });

    // === 4. THE SPOTLIGHT INTERACTION ===
    const avenueModal = document.getElementById('deep-avenue');
    const spotlightOverlay = document.getElementById('spotlight-overlay');

    if (avenueModal && spotlightOverlay) {
        const updateSpotlight = (x, y) => {
            spotlightOverlay.style.setProperty('--mouse-x', `${x}px`);
            spotlightOverlay.style.setProperty('--mouse-y', `${y}px`);
        };

        avenueModal.addEventListener('mousemove', (e) => updateSpotlight(e.clientX, e.clientY));
        avenueModal.addEventListener('touchmove', (e) => {
            if(e.touches.length > 0) {
                updateSpotlight(e.touches[0].clientX, e.touches[0].clientY);
            }
        });
        
        spotlightOverlay.style.setProperty('--mouse-x', `-1000px`);
        spotlightOverlay.style.setProperty('--mouse-y', `-1000px`);
    }

    // === 5. "DIGITAL TWIN" PARTICLE ENGINE (Scale Section) ===
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let particlesArray = [];
    let animationId = null;

    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = 'rgba(212, 175, 55, 0.5)'; // Gold particles
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < 150; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        animationId = requestAnimationFrame(animateParticles);
    }

    function startParticles() {
        if (!canvas) return;
        initParticles();
        animateParticles();
    }

    function stopParticles() {
        if (animationId) cancelAnimationFrame(animationId);
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

});
