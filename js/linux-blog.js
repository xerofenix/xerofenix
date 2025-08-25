// JavaScript for Linux Blog Interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Distribution category tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const categoryPanels = document.querySelectorAll('.category-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            categoryPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const categoryId = this.getAttribute('data-category');
            const targetPanel = document.getElementById(categoryId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.stat-fill');
    
    const animateProgressBar = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                
                observer.unobserve(progressBar);
            }
        });
    };

    const progressObserver = new IntersectionObserver(animateProgressBar, {
        threshold: 0.5
    });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Scroll animations
    const scrollElements = document.querySelectorAll('.content-section, .info-card, .distro-card, .comparison-card, .step');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('animate-on-scroll', 'animated');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('animated');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initial animation check
    handleScrollAnimation();

    // Terminal typing effect
    const terminals = document.querySelectorAll('.terminal-body');
    
    terminals.forEach(terminal => {
        const lines = terminal.querySelectorAll('.terminal-line');
        let currentLine = 0;
        
        const typeTerminalLine = () => {
            if (currentLine < lines.length) {
                lines[currentLine].style.opacity = '1';
                currentLine++;
                setTimeout(typeTerminalLine, 800);
            }
        };
        
        // Start typing effect when terminal comes into view
        const terminalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reset and start animation
                    lines.forEach(line => line.style.opacity = '0');
                    currentLine = 0;
                    setTimeout(typeTerminalLine, 500);
                    terminalObserver.unobserve(terminal);
                }
            });
        }, { threshold: 0.5 });
        
        terminalObserver.observe(terminal);
    });

    // Distro card hover effects
    const distroCards = document.querySelectorAll('.distro-card');
    
    distroCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Desktop environment mockup interactions
    const deMockups = document.querySelectorAll('.de-mockup');
    
    deMockups.forEach(mockup => {
        mockup.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Tooltip functionality for feature icons
    const featureIcons = document.querySelectorAll('.feature i, .component i');
    
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.color = 'var(--accent-color)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = '';
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection && scrolled < heroSection.offsetHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });

    // Copy code functionality (if any code blocks exist)
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy code';
        
        copyButton.addEventListener('click', function() {
            const text = block.textContent;
            navigator.clipboard.writeText(text).then(() => {
                this.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
        
        const container = block.parentElement;
        container.style.position = 'relative';
        container.appendChild(copyButton);
    });

    // Search functionality (basic)
    const createSearchBox = () => {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search content..." class="search-input">
                <div class="search-results"></div>
            </div>
        `;
        
        const navbar = document.querySelector('.navbar .container');
        if (navbar) {
            navbar.appendChild(searchContainer);
        }
        
        // Search functionality
        const searchInput = searchContainer.querySelector('.search-input');
        const searchResults = searchContainer.querySelector('.search-results');
        
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            const sections = document.querySelectorAll('.content-section');
            let results = [];
            
            sections.forEach(section => {
                const title = section.querySelector('h2, h3');
                const content = section.textContent.toLowerCase();
                
                if (content.includes(query)) {
                    results.push({
                        title: title ? title.textContent : 'Section',
                        element: section
                    });
                }
            });
            
            displaySearchResults(results, searchResults);
        });
    };

    const displaySearchResults = (results, container) => {
        if (results.length === 0) {
            container.innerHTML = '<div class="search-result">No results found</div>';
        } else {
            container.innerHTML = results.map(result => 
                `<div class="search-result" data-target="${result.element.id}">${result.title}</div>`
            ).join('');
            
            // Add click handlers to search results
            container.querySelectorAll('.search-result').forEach(result => {
                result.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-target');
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                    container.style.display = 'none';
                });
            });
        }
        
        container.style.display = 'block';
    };

    // Initialize search (uncomment if needed)
    // createSearchBox();

    // Button click animations
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-timeline');
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Architecture diagram animations
    const archLayers = document.querySelectorAll('.arch-layer');
    
    archLayers.forEach((layer, index) => {
        const layerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-layer');
                    }, index * 200);
                }
            });
        }, { threshold: 0.5 });
        
        layerObserver.observe(layer);
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            showEasterEgg();
            konamiCode = [];
        }
    });

    function showEasterEgg() {
        const easterEgg = document.createElement('div');
        easterEgg.className = 'easter-egg';
        easterEgg.innerHTML = `
            <div class="easter-egg-content">
                <div class="tux-dance">🐧</div>
                <h3>Welcome to the Linux Family!</h3>
                <p>You found the hidden Tux! 🎉</p>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        
        document.body.appendChild(easterEgg);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (easterEgg.parentElement) {
                easterEgg.remove();
            }
        }, 5000);
    }

    // Performance monitoring
    const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.entryType === 'navigation') {
                console.log(`Page load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
            }
        });
    });

    if (typeof PerformanceObserver !== 'undefined') {
        perfObserver.observe({ entryTypes: ['navigation'] });
    }

    // Theme switcher (future enhancement)
    const createThemeToggle = () => {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        
        const navbar = document.querySelector('.navbar .container');
        if (navbar) {
            navbar.appendChild(themeToggle);
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // Save preference
            localStorage.setItem('darkMode', isDark);
        });
        
        // Load saved preference
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme === 'true') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    };

    // Initialize theme toggle (uncomment if needed)
    // createThemeToggle();

    console.log('Linux Blog JavaScript loaded successfully! 🐧');
});

// Additional CSS for JavaScript-enhanced features
const additionalCSS = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: var(--shadow-medium);
        padding: 2rem;
        z-index: 1000;
    }

    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    .animate-timeline {
        animation: slideInFromSide 0.6s ease-out;
    }

    @keyframes slideInFromSide {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .animate-layer {
        animation: slideInUp 0.6s ease-out;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .easter-egg {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }

    .easter-egg-content {
        background: white;
        padding: 3rem;
        border-radius: var(--border-radius);
        text-align: center;
        max-width: 400px;
        animation: scaleIn 0.3s ease;
    }

    .tux-dance {
        font-size: 4rem;
        animation: dance 1s ease-in-out infinite;
    }

    @keyframes dance {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes scaleIn {
        from { transform: scale(0.7); }
        to { transform: scale(1); }
    }

    .search-container {
        position: relative;
        display: none; /* Hidden by default */
    }

    .search-box {
        position: relative;
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 25px;
        padding: 0.5rem 1rem;
        backdrop-filter: blur(10px);
    }

    .search-input {
        border: none;
        background: transparent;
        color: var(--text-primary);
        padding: 0.5rem;
        margin-left: 0.5rem;
        outline: none;
        width: 200px;
    }

    .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-medium);
        z-index: 1000;
        display: none;
        max-height: 300px;
        overflow-y: auto;
    }

    .search-result {
        padding: 1rem;
        cursor: pointer;
        transition: var(--transition);
        border-bottom: 1px solid var(--border-color);
    }

    .search-result:hover {
        background: var(--bg-secondary);
    }

    .theme-toggle {
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: var(--transition);
    }

    .theme-toggle:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    .copy-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.5rem;
        border-radius: 4px;
        cursor: pointer;
        opacity: 0.7;
        transition: var(--transition);
    }

    .copy-button:hover {
        opacity: 1;
    }

    img.loaded {
        animation: fadeIn 0.3s ease;
    }

    @media (max-width: 768px) {
        .search-container {
            width: 100%;
            margin-top: 1rem;
        }

        .search-input {
            width: 100%;
        }
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);