document.addEventListener('DOMContentLoaded', () => {
    // --- Ultra-Premium Interactive Effects ---
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    const authCard = document.querySelector('.auth-card');
    const authBtn = document.querySelector('.auth-btn');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const target = e.target;
        if (target.closest('a, button, input, select')) {
            document.body.classList.add('cursor-active');
        } else {
            document.body.classList.remove('cursor-active');
        }
    });

    const animate = () => {
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
        requestAnimationFrame(animate);
    };
    animate();

    // 3D Card Tilt & Shine
    if (authCard) {
        authCard.addEventListener('mousemove', (e) => {
            const rect = authCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            authCard.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            authCard.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            authCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        authCard.addEventListener('mouseleave', () => {
            authCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // Magnetic Button
    if (authBtn) {
        authBtn.addEventListener('mousemove', (e) => {
            const rect = authBtn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.3;
            const deltaY = (e.clientY - centerY) * 0.3;
            authBtn.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
        });
        authBtn.addEventListener('mouseleave', () => {
            authBtn.style.transform = 'translate(0, 0) scale(1)';
        });
    }

    // Reveal on Scroll / Page Load
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

    // Existing Functionality
    const form = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.auth-password-toggle');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', type === 'password' ? 'eye' : 'eye-off');
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            const user = document.getElementById('username');
            const pwd = document.getElementById('password');
            if (!user?.value?.trim()) {
                e.preventDefault();
                user?.focus();
                return;
            }
            if (!pwd?.value) {
                e.preventDefault();
                pwd?.focus();
                return;
            }
        });
    }
});
