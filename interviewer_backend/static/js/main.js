document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Premium Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right');
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Ultra-Premium Interactive Effects ---

    // Utility: Linear Interpolation (lerp) for smooth movement
    const lerp = (start, end, factor) => start + (end - start) * factor;

    // 1. Custom Liquid Cursor
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    let mouseX = 0, mouseY = 0; // Target position
    let cursorX = 0, cursorY = 0; // Current position
    let followerX = 0, followerY = 0; // Follower current position

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Interaction state for cursor
        const target = e.target;
        const isClickable = target.closest('a, button, .feature-card, .testimonial-card');
        if (isClickable) {
            document.body.classList.add('cursor-active');
        } else {
            document.body.classList.remove('cursor-active');
        }
    });

    // 2. Friction-based Parallax & Hover Shine
    const heroBg = document.querySelector('.hero-bg');
    const cards = document.querySelectorAll('.feature-card, .testimonial-card');

    let bgX = 0, bgY = 0;

    const animate = () => {
        // Smooth Cursor Following
        cursorX = lerp(cursorX, mouseX, 0.2);
        cursorY = lerp(cursorY, mouseY, 0.2);
        followerX = lerp(followerX, mouseX, 0.1);
        followerY = lerp(followerY, mouseY, 0.1);

        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }
        if (follower) {
            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;
        }

        // Friction Parallax for Hero
        if (heroBg) {
            bgX = lerp(bgX, (mouseX - window.innerWidth / 2) / 30, 0.05);
            bgY = lerp(bgY, (mouseY - window.innerHeight / 2) / 30, 0.05);
            heroBg.style.transform = `translate(${bgX}px, ${bgY}px) scale(1.05)`;
        }

        requestAnimationFrame(animate);
    };
    animate();

    // 3. Reactive Card Shine & Magnetic Effect
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update CSS variables for shine
            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

            // 3D Tilt Logic
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    // 4. Advanced Magnetic Buttons
    const magneticElements = document.querySelectorAll('.btn, .logo, .nav-link');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            el.style.transform = `translate(${deltaX * 0.35}px, ${deltaY * 0.35}px)`;
            if (el.classList.contains('btn')) {
                el.style.transform += ` scale(1.05)`;
            }
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    console.log('AI Interviewer Ultra-Premium Transitions Loaded');
});
