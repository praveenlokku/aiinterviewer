document.addEventListener('DOMContentLoaded', () => {
    // --- Ultra-Premium Interactive Effects ---
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    const cards = document.querySelectorAll('.card');
    const btnPrimary = document.querySelector('.btn-primary');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const target = e.target;
        if (target.closest('a, button, .card')) {
            document.body.classList.add('cursor-active');
        } else {
            document.body.classList.remove('cursor-active');
        }
    });

    const animateCursors = () => {
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
        requestAnimationFrame(animateCursors);
    };
    animateCursors();

    // 3D Card Tilt & Shine interaction
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
        });
    });

    // Magnetic Primary Button
    if (btnPrimary) {
        btnPrimary.addEventListener('mousemove', (e) => {
            const rect = btnPrimary.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.35;
            const deltaY = (e.clientY - centerY) * 0.35;
            btnPrimary.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
        });
        btnPrimary.addEventListener('mouseleave', () => {
            btnPrimary.style.transform = 'translate(0, 0) scale(1)';
        });
    }

    // Reveal Observer for entrance animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    console.log('AI Interviewer Dashboard Premium Experience Loaded');
});
