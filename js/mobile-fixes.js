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

        // Function to toggle the My Story content
        const toggleMyStory = function(event) {
            // Prevent default behavior
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            // Only apply this functionality on mobile
            if (window.innerWidth <= 768) {
                const isVisible = rightPage.style.display !== 'none';

                if (isVisible) {
                    // First remove the visible class for fade-out effect
                    rightPage.classList.remove('visible');

                    // After animation completes, hide the element
                    setTimeout(() => {
                        rightPage.style.display = 'none';
                    }, 300);

                    // Change the icon to down arrow
                    const icon = myStoryBtn.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-chevron-down';
                    }
                } else {
                    // First display the element
                    rightPage.style.display = 'block';

                    // Force a reflow to ensure the transition works
                    rightPage.offsetHeight;

                    // Add the visible class for fade-in effect
                    rightPage.classList.add('visible');

                    // Change the icon to up arrow
                    const icon = myStoryBtn.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-chevron-up';
                    }

                    // Scroll to the content
                    setTimeout(() => {
                        rightPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                }

                console.log('My Story button toggled, visibility:', !isVisible);
            }
        };

        // Add click event listener
        myStoryBtn.addEventListener('click', toggleMyStory);

        // Add touch event listeners for mobile
        myStoryBtn.addEventListener('touchstart', function(e) {
            // Add active class for visual feedback
            this.classList.add('active');
        });

        myStoryBtn.addEventListener('touchend', function(e) {
            // Remove active class
            this.classList.remove('active');
            // Toggle the content
            toggleMyStory(e);
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
