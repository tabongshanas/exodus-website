document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');

    // Set Active Navigation Link
    const currentPath = window.location.pathname;
    const allLinks = document.querySelectorAll('.nav-links a');
    allLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Navbar & Progress Scroll Effect
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progress = document.getElementById('scrollProgress');
        if (progress) progress.style.width = scrolled + "%";

        if (window.scrollY > 50) {
            navbar.style.padding = '15px 0';
            if (body.classList.contains('light-mode')) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        } else {
            navbar.style.padding = '25px 0';
            if (body.classList.contains('light-mode')) {
                navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            }
        }
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const icon = themeToggle.querySelector('i');

            if (body.classList.contains('light-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light');
                navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark');
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            }
        });
    }

    // Mobile Menu Toggle
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.add('active');
            body.style.overflow = 'hidden';
        });
    }

    const closeBtn = document.querySelector('.mobile-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            navLinks.classList.remove('active');
            body.style.overflow = 'auto';
        });
    }

    // Product Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');

                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Contact Form Handling (Mock)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const originalBtnText = contactForm.querySelector('button').textContent;
            contactForm.querySelector('button').textContent = 'Message Sent!';
            contactForm.querySelector('button').style.background = '#28a745';

            setTimeout(() => {
                contactForm.reset();
                contactForm.querySelector('button').textContent = originalBtnText;
                contactForm.querySelector('button').style.background = 'var(--secondary-color)';
                alert(`Thank you, ${name}! Your message has been sent successfully.`);
            }, 2000);
        });
    }

    // Subtle Reveal Animations
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Hero Video Transition Logic
    const heroVideoContainer = document.querySelector('.hero-video-container');
    const heroVideo = document.getElementById('heroVideo');

    if (heroVideoContainer && heroVideo) {
        setTimeout(() => {
            heroVideoContainer.classList.add('active');
            heroVideo.play().catch(err => console.log("Video play blocked:", err));

            setTimeout(() => {
                heroVideoContainer.classList.remove('active');
                setInterval(() => {
                    heroVideoContainer.classList.add('active');
                    heroVideo.play();
                    setTimeout(() => {
                        heroVideoContainer.classList.remove('active');
                    }, 12000);
                }, 18000);
            }, 12000);
        }, 2000);
    }

    // Product Modal Logic
    const modal = document.getElementById('productModal');
    const viewBtns = document.querySelectorAll('.view-details-btn');
    const closeBtnModal = document.querySelector('.close-modal');

    if (modal && viewBtns.length > 0) {
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();

                const title = btn.getAttribute('data-title');
                const brand = btn.getAttribute('data-brand');
                const price = btn.getAttribute('data-price');
                const engine = btn.getAttribute('data-engine');
                const hp = btn.getAttribute('data-hp');
                const desc = btn.getAttribute('data-desc');
                const brandInfo = btn.getAttribute('data-brand-info');
                const imgSrc = btn.closest('.product-card').querySelector('img').src;

                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalBrand').textContent = brand;
                document.getElementById('modalPrice').textContent = price;
                document.getElementById('modalEngine').textContent = engine;
                document.getElementById('modalHP').textContent = hp;
                document.getElementById('modalDesc').textContent = desc;
                document.getElementById('modalBrandInfo').textContent = brandInfo;
                document.getElementById('modalImg').src = imgSrc;

                modal.classList.add('active');
                body.style.overflow = 'hidden';
            });
        });

        if (closeBtnModal) {
            closeBtnModal.addEventListener('click', () => {
                modal.classList.remove('active');
                body.style.overflow = 'auto';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    }

    // Service Overlay Logic
    const serviceOverlay = document.getElementById('serviceOverlay');
    const learnMoreBtns = document.querySelectorAll('.learn-more-service');
    const closeOverlayBtn = document.querySelector('.close-service-overlay');
    const closeOverlayBtnBottom = document.querySelector('.close-service-btn');

    if (serviceOverlay && learnMoreBtns.length > 0) {
        learnMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const title = btn.getAttribute('data-title');
                const desc = btn.getAttribute('data-desc');

                document.getElementById('serviceOverlayTitle').textContent = title;
                document.getElementById('serviceOverlayDesc').textContent = desc;

                serviceOverlay.classList.add('active');
                body.style.overflow = 'hidden';
            });
        });

        const hideOverlay = () => {
            serviceOverlay.classList.remove('active');
            body.style.overflow = 'auto';
        };

        if (closeOverlayBtn) closeOverlayBtn.addEventListener('click', hideOverlay);
        if (closeOverlayBtnBottom) closeOverlayBtnBottom.addEventListener('click', hideOverlay);

        window.addEventListener('click', (e) => {
            if (e.target === serviceOverlay) hideOverlay();
        });
    }

    // Moving Background Car Trigger
    setTimeout(() => {
        const bgCar = document.getElementById('movingCar');
        if (bgCar) {
            bgCar.classList.add('animate');
        }
    }, 5000);
});
