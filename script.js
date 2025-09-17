// ===== MOBILE NAVIGATION TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    console.log('Hamburger button:', hamburgerBtn);
    console.log('Mobile nav:', mobileNav);
    
    if (hamburgerBtn && mobileNav) {
        // Simple click event without preventDefault to ensure it works
        hamburgerBtn.addEventListener('click', function(e) {
            console.log('Hamburger clicked - event fired');
            
            const isActive = mobileNav.classList.contains('active');
            console.log('Current state - isActive:', isActive);
            
            if (isActive) {
                // Close menu
                hamburgerBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                console.log('Menu closed');
            } else {
                // Open menu
                hamburgerBtn.classList.add('active');
                mobileNav.classList.add('active');
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                console.log('Menu opened');
            }
        });
        
        // Also add touch event for mobile
        hamburgerBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            console.log('Hamburger touched - event fired');
            
            const isActive = mobileNav.classList.contains('active');
            
            if (isActive) {
                hamburgerBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                console.log('Menu closed via touch');
            } else {
                hamburgerBtn.classList.add('active');
                mobileNav.classList.add('active');
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                console.log('Menu opened via touch');
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = mobileNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                console.log('Menu closed via nav link');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileNav.classList.contains('active') && 
                !hamburgerBtn.contains(e.target) && 
                !mobileNav.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                console.log('Menu closed via outside click');
            }
        });
        
        // Test if elements are properly connected
        console.log('Mobile navigation initialized successfully');
        
        // Test button clickability
        hamburgerBtn.style.cursor = 'pointer';
        hamburgerBtn.style.userSelect = 'none';
        
        // Add a simple test - change background color on click to verify it's working
        hamburgerBtn.addEventListener('click', function() {
            console.log('Button click detected!');
            // Temporary visual feedback
            this.style.backgroundColor = 'rgba(44, 95, 95, 0.1)';
            setTimeout(() => {
                this.style.backgroundColor = 'transparent';
            }, 200);
        });
        
    } else {
        console.error('Hamburger button or mobile nav not found');
        console.error('hamburgerBtn:', hamburgerBtn);
        console.error('mobileNav:', mobileNav);
    }
});

// ===== SMOOTH SCROLLING AND INTERACTIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for the 3D graphic
    const graphic3d = document.querySelector('.trading-terminal');
    const hero = document.querySelector('.hero');
    
    // Mouse movement parallax effect (desktop only)
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            if (graphic3d) {
                const moveX = (mouseX - 0.5) * 10;
                const moveY = (mouseY - 0.5) * 10;
                
                graphic3d.style.transform = `translateY(${moveY}px) translateX(${moveX}px)`;
            }
        });
    }
    
    // Scroll-based animations
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // Parallax effect for background
        document.body.style.backgroundPosition = `center ${rate}px`;
        
        // Hide scroll indicator when scrolling starts
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            if (scrolled > 50) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
                scrollIndicator.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
                scrollIndicator.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            }
        }
        
        // Fade in animation for elements
        const elements = document.querySelectorAll('.hero-text, .trading-terminal');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
    
    // ===== BEFORE/AFTER SLIDER LOGIC =====
    const compareWrappers = document.querySelectorAll('.compare-wrapper');
    compareWrappers.forEach(wrapper => {
        const after = wrapper.querySelector('.compare-after');
        const slider = wrapper.querySelector('.compare-slider');
        if (!after || !slider) return;

        let queued = false;
        let nextValue = Number(slider.value);

        const schedule = () => {
            if (queued) return;
            queued = true;
            requestAnimationFrame(() => {
                const clamped = Math.max(0, Math.min(100, nextValue));
                after.style.width = clamped + '%';
                queued = false;
            });
        };

        // Initialize
        schedule();

        // Input change (continuous drag)
        slider.addEventListener('input', (e) => {
            nextValue = Number(e.target.value);
            schedule();
        });

        // Click to move slider
        wrapper.addEventListener('click', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            nextValue = Math.round(percent);
            slider.value = String(nextValue);
            schedule();
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.hero-text, .trading-terminal, .nav-link');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Cursor trail effect (desktop only)
    if (window.innerWidth > 1024) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(44, 95, 95, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
        });
        
        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.nav-link, .logo, .btn-primary, .btn-secondary');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)';
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'radial-gradient(circle, rgba(44, 95, 95, 0.8) 0%, transparent 70%)';
            });
        });
    }
    
    // Typing animation for the main headline
    const headline = document.querySelector('.main-headline');
    if (headline) {
        const text = headline.textContent;
        headline.textContent = '';
        headline.style.borderRight = '2px solid rgba(44, 95, 95, 0.7)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                headline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    headline.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 1024) {
            const hamburgerBtn = document.getElementById('hamburgerBtn');
            const mobileNav = document.getElementById('mobileNav');
            
            if (hamburgerBtn && mobileNav) {
                hamburgerBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for mousemove events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to mousemove events
document.addEventListener('mousemove', throttle(function(e) {
    // Mouse tracking code here
}, 16)); // ~60fps

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(function() {
    // Scroll handling code here
}, 10));
