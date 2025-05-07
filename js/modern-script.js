// Modern Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initPortfolioFilter();
    initSkillsFilter();
    initScrollToTop();
    initFormValidation();
    initAnimations();
    ensureImagesLoad();
    fixFluidLayout();
    initBookEffect();
});

// Ensure all images load properly
function ensureImagesLoad() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        // Add error handling for images
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const parent = this.parentElement;
            if (parent && parent.classList.contains('img-team')) {
                parent.style.backgroundColor = 'rgba(22, 33, 62, 0.8)';

                // Create placeholder text
                const placeholder = document.createElement('div');
                placeholder.className = 'img-placeholder';
                placeholder.textContent = this.alt || 'Image';
                placeholder.style.display = 'flex';
                placeholder.style.alignItems = 'center';
                placeholder.style.justifyContent = 'center';
                placeholder.style.height = '100%';
                placeholder.style.color = 'var(--secondary)';
                placeholder.style.fontWeight = 'bold';

                parent.appendChild(placeholder);
            }
        });

        // Force reload if image is cached but broken
        if (img.complete && img.naturalHeight === 0) {
            img.src = img.src;
        }
    });
}

// Fix any potential layout issues
function fixFluidLayout() {
    // Ensure container widths are correct
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.style.boxSizing = 'border-box';
        container.style.width = '100%';
    });

    // Fix any potential overflow issues
    document.body.style.overflowX = 'hidden';

    // Ensure all grid items have proper width
    const gridItems = document.querySelectorAll('.card, .stack-item');
    gridItems.forEach(item => {
        item.style.width = '100%';
        item.style.boxSizing = 'border-box';
    });

    // Add resize handler to recalculate layouts
    window.addEventListener('resize', function() {
        const portfolioContainer = document.querySelector('.container-card');
        const stackContainer = document.querySelector('.container-stack');

        if (portfolioContainer) {
            portfolioContainer.style.display = 'none';
            setTimeout(() => {
                portfolioContainer.style.display = 'grid';
            }, 10);
        }

        if (stackContainer) {
            stackContainer.style.display = 'none';
            setTimeout(() => {
                stackContainer.style.display = 'grid';
            }, 10);
        }
    });
}

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('.header');
    const navToggler = document.querySelector('.nav-toggler');
    const nav = document.querySelector('.nav');

    // Add scrolled class to header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile navigation toggle
    navToggler.addEventListener('click', function() {
        navToggler.classList.toggle('active');
        nav.classList.toggle('open');
    });

    // Close mobile nav when clicking on a nav item
    document.querySelectorAll('.nav-item a').forEach(item => {
        item.addEventListener('click', function() {
            navToggler.classList.remove('active');
            nav.classList.remove('open');
        });
    });
}

// Smooth scrolling for anchor links
function initScrollEffects() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Portfolio filtering functionality
function initPortfolioFilter() {
    const filterItems = document.querySelectorAll('.filter-item');
    const portfolioItems = document.querySelectorAll('.card');

    // Initialize all cards with data-category attribute if missing
    portfolioItems.forEach(card => {
        if (!card.getAttribute('data-category')) {
            card.setAttribute('data-category', 'website');
        }
    });

    // Set initial state - all visible
    portfolioItems.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    });

    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all filter items
            filterItems.forEach(filter => filter.classList.remove('active'));

            // Add active class to clicked filter
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filter portfolio items
            portfolioItems.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            // Force layout recalculation to ensure proper grid flow
            const container = document.querySelector('.container-card');
            if (container) {
                container.style.display = 'none';
                setTimeout(() => {
                    container.style.display = 'grid';
                }, 10);
            }
        });
    });
}

// Skills filtering functionality
function initSkillsFilter() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const skillItems = document.querySelectorAll('.stack-item');

    // Initialize all skill items with data-type attribute if missing
    skillItems.forEach(item => {
        if (!item.getAttribute('data-type')) {
            item.setAttribute('data-type', 'frontend');
        }
    });

    // Set initial state - show frontend items by default
    const defaultCategory = 'frontend';
    skillItems.forEach(item => {
        if (item.getAttribute('data-type') === defaultCategory) {
            item.style.display = 'flex';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });

    // Set active class on default tab
    categoryTabs.forEach(tab => {
        if (tab.getAttribute('data-category') === defaultCategory) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            // Filter skill items
            skillItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-type') === category) {
                    item.style.display = 'flex';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            // Force layout recalculation to ensure proper grid flow
            const container = document.querySelector('.container-stack');
            if (container) {
                container.style.display = 'none';
                setTimeout(() => {
                    container.style.display = 'grid';
                }, 10);
            }
        });
    });
}

// Scroll to top button functionality
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.querySelector('.thank-you-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                removeError(name);
            }

            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(email);
            }

            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                removeError(message);
            }

            if (isValid) {
                // Show success message
                alert('Your message has been sent!');
                contactForm.reset();
            }
        });
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');

        errorElement.className = 'error-message';
        errorElement.textContent = message;

        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }

        formGroup.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');

        if (errorElement) {
            formGroup.removeChild(errorElement);
        }

        formGroup.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

// Animations
function initAnimations() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width;
                entry.target.style.transition = 'width 1s ease-in-out';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => {
        bar.style.width = '0';
        observer.observe(bar);
    });

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.fade-in');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                elementObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        elementObserver.observe(element);
    });
}

// Book Effect
function initBookEffect() {
    const book = document.querySelector('.book');
    if (!book) return;

    // Add animation class when book comes into view
    const bookObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    book.classList.add('book-animated');
                }, 300);
                bookObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    bookObserver.observe(book);

    // Add 3D effect on mouse move
    const bookContainer = document.querySelector('.book-container');
    if (bookContainer && window.innerWidth > 992) {
        bookContainer.addEventListener('mousemove', function(e) {
            const rect = bookContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Limit rotation to a small amount
            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((y - centerY) / centerY) * -5;

            // Apply rotation to the book
            book.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });

        // Reset rotation when mouse leaves
        bookContainer.addEventListener('mouseleave', function() {
            book.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }

    // Add page turn effect for mobile
    if (window.innerWidth <= 992) {
        const leftPage = document.querySelector('.book-page-left');
        const rightPage = document.querySelector('.book-page-right');
        const spine = document.querySelector('.book-spine');

        if (leftPage && rightPage && spine) {
            spine.addEventListener('click', function() {
                book.classList.toggle('flipped');

                if (book.classList.contains('flipped')) {
                    leftPage.style.transform = 'rotateY(-180deg)';
                    leftPage.style.zIndex = '0';
                    rightPage.style.zIndex = '1';
                } else {
                    leftPage.style.transform = 'rotateY(0deg)';
                    leftPage.style.zIndex = '1';
                    rightPage.style.zIndex = '0';
                }
            });
        }
    }
}
