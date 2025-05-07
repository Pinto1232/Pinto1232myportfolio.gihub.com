// Mobile-specific fixes for the portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Fix for hamburger menu
    fixHamburgerMenu();

    // Fix for About Me section on mobile
    fixAboutMeSection();
});

// Fix hamburger menu functionality
function fixHamburgerMenu() {
    const navToggler = document.querySelector('.nav-toggler');
    const nav = document.querySelector('.nav');

    if (!navToggler || !nav) return;

    // Remove any existing event listeners by cloning
    const newNavToggler = navToggler.cloneNode(true);
    navToggler.parentNode.replaceChild(newNavToggler, navToggler);

    // Add new event listener with a more robust implementation
    newNavToggler.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Toggle active class on the toggler
        this.classList.toggle('active');

        // Toggle open class on the nav
        nav.classList.toggle('open');

        console.log('Hamburger menu clicked, nav open state:', nav.classList.contains('open'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        // If the click is outside the nav and the toggler, and the nav is open
        if (!e.target.closest('.nav') &&
            !e.target.closest('.nav-toggler') &&
            nav.classList.contains('open')) {

            // Close the nav
            nav.classList.remove('open');
            newNavToggler.classList.remove('active');

            console.log('Clicked outside, closing nav');
        }
    });

    // Close menu when clicking on nav items
    const navItems = document.querySelectorAll('.nav-item a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            nav.classList.remove('open');
            newNavToggler.classList.remove('active');

            console.log('Nav item clicked, closing nav');
        });
    });
}

// Fix About Me section for mobile
function fixAboutMeSection() {
    // Ensure the book animation works properly on mobile
    const book = document.querySelector('.book');
    if (!book) return;

    // Add animation class when book comes into view
    setTimeout(() => {
        book.classList.add('book-animated');
    }, 300);

    // Handle the My Story button on mobile
    const myStoryBtn = document.getElementById('my-story-toggle');
    const rightPage = document.querySelector('.book-page-right');

    if (myStoryBtn && rightPage) {
        // Function to handle mobile vs desktop display
        const handleResponsiveDisplay = () => {
            if (window.innerWidth <= 768) {
                // On mobile: hide the right page initially and show the button
                rightPage.style.display = 'none';
                myStoryBtn.style.display = 'block';
            } else {
                // On desktop: always show the right page and hide the button
                rightPage.style.display = 'block';
                myStoryBtn.style.display = 'none';
            }
        };

        // Set initial state
        handleResponsiveDisplay();

        // Toggle the right page when clicking the My Story button (mobile only)
        myStoryBtn.addEventListener('click', function() {
            // Only apply this functionality on mobile
            if (window.innerWidth <= 768) {
                const isVisible = rightPage.style.display !== 'none';

                if (isVisible) {
                    // Hide the right page
                    rightPage.style.display = 'none';
                    // Change the icon to down arrow
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-chevron-down';
                    }
                } else {
                    // Show the right page
                    rightPage.style.display = 'block';
                    // Change the icon to up arrow
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-chevron-up';
                    }
                }

                console.log('My Story button clicked, visibility:', !isVisible);
            }
        });

        // Update on window resize
        window.addEventListener('resize', handleResponsiveDisplay);
    }

    // Make sure the book page flip works on desktop
    if (window.innerWidth > 768) {
        const leftPage = document.querySelector('.book-page-left');
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

                console.log('Book flipped:', book.classList.contains('flipped'));
            });
        }
    }

    // We've already added a resize handler with the handleResponsiveDisplay function
}
