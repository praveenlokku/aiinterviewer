document.addEventListener('DOMContentLoaded', () => {
    // --- Ultra-Premium Interactive Effects ---
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    const authCard = document.querySelector('.auth-card');
    const submitBtn = document.getElementById('submit-btn');

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

    // 3D Card Tilt & Shine interaction
    if (authCard) {
        authCard.addEventListener('mousemove', (e) => {
            const rect = authCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            authCard.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            authCard.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            authCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        authCard.addEventListener('mouseleave', () => {
            authCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // Magnetic Submit Button
    if (submitBtn) {
        submitBtn.addEventListener('mousemove', (e) => {
            const rect = submitBtn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.35;
            const deltaY = (e.clientY - centerY) * 0.35;
            submitBtn.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
        });
        submitBtn.addEventListener('mouseleave', () => {
            submitBtn.style.transform = 'translate(0, 0) scale(1)';
        });
    }

    // Reveal Observer for staggered entrance
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

    // --- Existing Features ---
    const signupForm = document.getElementById('signup-form');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm-password');
    const togglePasswordBtn = document.querySelector('.auth-password-toggle');
    const strengthBar = document.querySelector('.auth-strength-bar');
    const strengthText = document.querySelector('.auth-strength-text');
    const btnText = submitBtn?.querySelector('.btn-text');
    const loader = submitBtn?.querySelector('.loader');

    // Password Visibility Toggle
    if (togglePasswordBtn) togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        confirmInput.setAttribute('type', type);

        const icon = togglePasswordBtn.querySelector('i');
        icon.setAttribute('data-lucide', type === 'password' ? 'eye' : 'eye-off');
        lucide.createIcons();
    });

    // Password Strength Checker
    if (strengthBar && strengthText) {
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            let score = 0;
            let color = '#5C7C89';
            let label = '';

            if (password.length > 0) {
                if (password.length >= 8) score++;
                if (/[A-Z]/.test(password)) score++;
                if (/[0-9]/.test(password)) score++;
                if (/[^A-Za-z0-9]/.test(password)) score++;

                switch (score) {
                    case 1: color = '#e57373'; label = 'Weak'; break;
                    case 2: color = '#fbbf24'; label = 'Fair'; break;
                    case 3: color = '#1F4959'; label = 'Good'; break;
                    case 4: color = '#1F4959'; label = 'Strong'; break;
                }
            }

            strengthBar.style.setProperty('--strength-width', `${(score / 4) * 100}%`);
            strengthBar.style.setProperty('--strength-color', color);
            strengthText.textContent = label;
            strengthText.style.color = color;
        });
    }

    // Inline Validation: Confirm Password
    const validatePasswords = () => {
        const confirmError = document.getElementById('confirm-error');
        if (confirmInput.value !== '' && confirmInput.value !== passwordInput.value) {
            confirmError.textContent = 'Passwords do not match';
            confirmInput.style.borderColor = '#e57373';
            return false;
        } else {
            confirmError.textContent = '';
            confirmInput.style.borderColor = 'var(--border)';
            return true;
        }
    };

    confirmInput.addEventListener('input', validatePasswords);
    passwordInput.addEventListener('input', validatePasswords);

    // Form Submission
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validatePasswords()) return;

            if (submitBtn) submitBtn.disabled = true;
            if (btnText) btnText.textContent = 'Creating Account...';
            // Simulating API call
            setTimeout(() => {
                if (submitBtn) submitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Create account';
                signupForm.submit();
            }, 1500);
        });
    }
});