document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const icon = themeToggleBtn.querySelector('i');

    // Check local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        htmlElement.setAttribute('data-theme', currentTheme);
        updateIcon(currentTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        const current = htmlElement.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.className = 'ri-sun-line';
        } else {
            icon.className = 'ri-moon-line';
        }
    }

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Active Navigation Link (Scroll Spy)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // -100 to handle the fixed header offset
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // 4. Mobile Menu Toggle (Simple implementation)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Note: In a full production site, toggle a class on .nav-links 
            // and add CSS to show it as a dropdown or modal.
            // For this single-page demo, we focus on desktop primarily.
            alert("Mobile menu clicked (Expand functionality here via CSS class toggle)");
        });
    }
});

    document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Function to handle scroll
    const scrollCarousel = (direction) => {
        // Get the width of one card + the gap
        const cardWidth = track.querySelector('.card').offsetWidth;
        const gap = 30; // Matches CSS gap
        const scrollAmount = cardWidth + gap;

        if (direction === 'left') {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Event Listeners
    prevBtn.addEventListener('click', () => scrollCarousel('left'));
    nextBtn.addEventListener('click', () => scrollCarousel('right'));
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- CAROUSEL LOGIC ---
    const track = document.querySelector('.spotlight-track');
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.next-spotlight');
    const prevBtn = document.querySelector('.prev-spotlight');
    const dots = document.querySelectorAll('.spotlight-dot');
    
    let currentIndex = 0;

    const updateSlide = (index) => {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('current-slide');
        });
        // Add active class to new slide
        slides[index].classList.add('current-slide');

        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        if(dots[index]) dots[index].classList.add('active');
    };

    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex > slides.length - 1) currentIndex = 0; // Loop back
            updateSlide(currentIndex);
        });
    }

    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) currentIndex = slides.length - 1; // Loop to end
            updateSlide(currentIndex);
        });
    }

    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlide(currentIndex);
        });
    });

    // --- 3D TILT LOGIC (Applied to ALL tilt cards) ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    const sensitivity = 25; // Lower is more extreme

    tiltCards.forEach(cardWrapper => {
        const cardInner = cardWrapper.querySelector('.tilt-inner');

        cardWrapper.addEventListener('mousemove', (e) => {
            const rect = cardWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateY = (x / rect.width) * sensitivity;
            const rotateX = -(y / rect.height) * sensitivity;

            cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        cardWrapper.addEventListener('mouseleave', () => {
            cardInner.style.transform = `rotateX(0deg) rotateY(0deg)`;
            cardInner.style.transition = 'transform 0.5s ease';
            setTimeout(() => {
                cardInner.style.transition = 'transform 0.1s ease-out';
            }, 500);
        });
    });

});



    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // 1. Toggle Menu Open/Close
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Icon Switch (Menu <-> Close)
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('ri-menu-4-line', 'ri-close-line');
        } else {
            icon.classList.replace('ri-close-line', 'ri-menu-4-line');
        }
    });

    // 2. Close Menu when a link is clicked (UX Best Practice)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('ri-close-line', 'ri-menu-4-line');
            }
        });
    });

