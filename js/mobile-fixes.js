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
    
    // Make sure the book page flip works on mobile
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
                
                console.log('Book flipped:', book.classList.contains('flipped'));
            });
        }
    }
}
