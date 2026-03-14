/* ============================================
   MANJEET SINGH — EXTRAORDINARY PORTFOLIO v2
   Particles, Custom Cursor, 3D Tilt, Split-Text
   ============================================ */

(function () {
    'use strict';

    // ============================================
    // PARTICLE NETWORK CANVAS
    // ============================================
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h, particles, mouse;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        mouse = { x: w / 2, y: h / 2 };

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 1.8 + 0.5;
                this.alpha = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(123, 92, 255, ${this.alpha})`;
                ctx.fill();
            }
        }

        function initParticles() {
            const count = Math.min(80, Math.floor((w * h) / 15000));
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const alpha = (1 - dist / 150) * 0.12;
                        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
                // Mouse connection
                const mdx = particles[i].x - mouse.x;
                const mdy = particles[i].y - mouse.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < 200) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    const alpha = (1 - mDist / 200) * 0.2;
                    ctx.strokeStyle = `rgba(123, 92, 255, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            drawLines();
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            resize();
            initParticles();
        });

        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        resize();
        initParticles();
        animate();
    }

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (cursorDot && cursorRing && window.innerWidth > 768) {
        let cx = 0, cy = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            cx = e.clientX;
            cy = e.clientY;
            cursorDot.style.left = cx - 4 + 'px';
            cursorDot.style.top = cy - 4 + 'px';
        });

        function animateRing() {
            ringX += (cx - ringX - 20) * 0.12;
            ringY += (cy - ringY - 20) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .bento-card, .channel-card, .contact-card, .ai-tool-item');
        hoverTargets.forEach((el) => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });

        // Click animation
        document.addEventListener('mousedown', () => cursorDot.classList.add('click'));
        document.addEventListener('mouseup', () => cursorDot.classList.remove('click'));
    }

    // ============================================
    // SCROLL REVEAL (Intersection Observer)
    // ============================================
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    revealEls.forEach((el) => revealObs.observe(el));

    // ============================================
    // SPLIT-TEXT ANIMATION
    // ============================================
    const splitTextEls = document.querySelectorAll('.split-text');
    splitTextEls.forEach((el) => {
        const text = el.textContent;
        el.innerHTML = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.classList.add('char');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${i * 0.03}s`;
            el.appendChild(span);
        });
    });

    const splitObs = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    splitObs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );
    splitTextEls.forEach((el) => splitObs.observe(el));

    // ============================================
    // NAVBAR SCROLL & ACTIVE LINK
    // ============================================
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function handleScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach((sec) => {
            if (window.scrollY >= sec.offsetTop - 140) {
                current = sec.id;
            }
        });
        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ============================================
    // HAMBURGER MENU
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // TYPING ANIMATION
    // ============================================
    const typedEl = document.getElementById('typed-text');
    if (typedEl) {
        const phrases = [
            'Full-Stack Developer',
            'Java + Spring Boot',
            'React & Modern UI',
            'YouTube Content Creator',
            'AI-Powered Innovation'
        ];
        let pi = 0, ci = 0, deleting = false;

        function typeLoop() {
            const phrase = phrases[pi];
            if (!deleting) {
                typedEl.textContent = phrase.substring(0, ci + 1);
                ci++;
                if (ci === phrase.length) {
                    deleting = true;
                    setTimeout(typeLoop, 2000);
                    return;
                }
                setTimeout(typeLoop, 80);
            } else {
                typedEl.textContent = phrase.substring(0, ci - 1);
                ci--;
                if (ci === 0) {
                    deleting = false;
                    pi = (pi + 1) % phrases.length;
                    setTimeout(typeLoop, 350);
                    return;
                }
                setTimeout(typeLoop, 40);
            }
        }

        setTimeout(typeLoop, 800);
    }

    // ============================================
    // SKILLS FILTERING
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            skillCards.forEach((card) => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    void card.offsetHeight;
                    card.style.animation = 'cardFadeIn 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ============================================
    // 3D TILT EFFECT ON CARDS
    // ============================================
    const tiltCards = document.querySelectorAll('.skill-card, .project-card');

    if (window.innerWidth > 768) {
        tiltCards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
            });
        });
    }

    // ============================================
    // ANIMATED COUNTERS
    // ============================================
    const counters = document.querySelectorAll('[data-count]');
    const counterObs = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count, 10);
                    const suffix = el.dataset.suffix || '+';
                    let current = 0;
                    const step = Math.max(1, Math.ceil(target / 50));
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        el.textContent = current + suffix;
                    }, 30);
                    counterObs.unobserve(el);
                }
            });
        },
        { threshold: 0.5 }
    );
    counters.forEach((el) => counterObs.observe(el));

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // DYNAMIC ANIMATION KEYFRAME INJECTION
    // ============================================
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
    @keyframes cardFadeIn {
      from { opacity: 0; transform: translateY(20px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;
    document.head.appendChild(dynamicStyles);
})();
