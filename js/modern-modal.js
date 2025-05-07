// Modern Modal Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all other scripts have loaded
    setTimeout(() => {
        initModals();
    }, 100);
});

function initModals() {
    console.log("Initializing modals...");

    // Car Crew Modal
    const openBtn = document.getElementById('open-btn');
    const closeBtn = document.getElementById('close-btn');
    const modal = document.getElementById('modal-background');

    if (openBtn && modal) {
        console.log("Found Car Crew modal elements");

        // Remove any existing event listeners
        const newOpenBtn = openBtn.cloneNode(true);
        if (openBtn.parentNode) {
            openBtn.parentNode.replaceChild(newOpenBtn, openBtn);
        }

        // Add new event listener
        newOpenBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Opening Car Crew modal");

            // Support both old and new modal styles
            if (modal.style) {
                modal.style.display = 'block';
            }

            // Use the new modal opening function
            openModal(modal);
        });

        if (closeBtn) {
            // Remove any existing event listeners
            const newCloseBtn = closeBtn.cloneNode(true);
            if (closeBtn.parentNode) {
                closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            }

            // Add new event listener
            newCloseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log("Closing Car Crew modal");
                closeModal(modal);
            });
        }
    }

    // cDesign Modal
    const openBtns = document.getElementById('open-btns');
    const closeBtnC = document.getElementById('close-btn-c');
    const modalC = document.getElementById('modal-background-c');

    if (openBtns && modalC) {
        console.log("Found cDesign modal elements");

        // Remove any existing event listeners
        const newOpenBtns = openBtns.cloneNode(true);
        if (openBtns.parentNode) {
            openBtns.parentNode.replaceChild(newOpenBtns, openBtns);
        }

        // Add new event listener
        newOpenBtns.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Opening cDesign modal");

            // Support both old and new modal styles
            if (modalC.style) {
                modalC.style.display = 'block';
            }

            // Use the new modal opening function
            openModal(modalC);
        });

        if (closeBtnC) {
            // Remove any existing event listeners
            const newCloseBtnC = closeBtnC.cloneNode(true);
            if (closeBtnC.parentNode) {
                closeBtnC.parentNode.replaceChild(newCloseBtnC, closeBtnC);
            }

            // Add new event listener
            newCloseBtnC.addEventListener('click', function(e) {
                e.preventDefault();
                console.log("Closing cDesign modal");
                closeModal(modalC);
            });
        }
    }

    // ClickShop Modal
    const openBtnsB = document.getElementById('open-btns-b');
    const closeBtnB = document.getElementById('close-btn-b');
    const modalB = document.getElementById('modal-background-b');

    if (openBtnsB && modalB) {
        console.log("Found ClickShop modal elements");

        // Remove any existing event listeners
        const newOpenBtnsB = openBtnsB.cloneNode(true);
        if (openBtnsB.parentNode) {
            openBtnsB.parentNode.replaceChild(newOpenBtnsB, openBtnsB);
        }

        // Add new event listener
        newOpenBtnsB.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Opening ClickShop modal");

            // Support both old and new modal styles
            if (modalB.style) {
                modalB.style.display = 'block';
            }

            // Use the new modal opening function
            openModal(modalB);
        });

        if (closeBtnB) {
            // Remove any existing event listeners
            const newCloseBtnB = closeBtnB.cloneNode(true);
            if (closeBtnB.parentNode) {
                closeBtnB.parentNode.replaceChild(newCloseBtnB, closeBtnB);
            }

            // Add new event listener
            newCloseBtnB.addEventListener('click', function(e) {
                e.preventDefault();
                console.log("Closing ClickShop modal");
                closeModal(modalB);
            });
        }
    }

    // Add click handlers to all project links
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        if (link.id === 'open-btn' || link.id === 'open-btns' || link.id === 'open-btns-b') {
            console.log("Found project link with ID:", link.id);
        }
    });
}

    // Close modal when clicking outside
    document.addEventListener('click', function(event) {
        const modals = [modal, modalC, modalB];

        modals.forEach(function(m) {
            if (m && event.target === m) {
                closeModal(m);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = [modal, modalC, modalB];

            modals.forEach(function(m) {
                if (m && m.classList.contains('active')) {
                    closeModal(m);
                }
            });
        }
    });

// Function to open modal
function openModal(modal) {
    if (!modal) {
        console.error("Modal not found");
        return;
    }

    console.log("Opening modal:", modal.id);

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    // Support both old and new modal styles
    modal.style.display = 'block'; // For old style

    // Reset any previous transforms or styles
    const modalContent = modal.querySelector('.card-modal');
    if (modalContent) {
        console.log("Found modal content");
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translateY(30px)';

        // Ensure images are loaded properly
        const modalImage = modalContent.querySelector('.brand img');
        if (modalImage) {
            console.log("Found modal image");
            // Force image reload if needed
            const currentSrc = modalImage.src;
            modalImage.src = '';
            setTimeout(() => {
                modalImage.src = currentSrc;
            }, 10);

            // Add load event to ensure proper display
            modalImage.onload = function() {
                this.style.opacity = '1';
            };
        }

        // Show modal with animation for new style
        setTimeout(() => {
            modal.style.display = 'flex'; // For new style
            modal.classList.add('active');

            // Scroll to top of modal content
            modalContent.scrollTop = 0;
        }, 10);
    } else {
        console.log("No modern modal content found, using legacy style");
        // For old style modals
        modal.style.display = 'block';
    }

    // Add focus trap
    trapFocus(modal);

    // Announce to screen readers
    announceModal('Modal opened');

    // Adjust modal position for mobile
    if (window.innerWidth <= 768) {
        window.scrollTo(0, 0);
    }

    // Adjust modal for current screen size
    adjustModalForScreenSize(modal);

    // Add event listener to close when clicking outside
    setTimeout(() => {
        const handleOutsideClick = function(event) {
            if (event.target === modal) {
                closeModal(modal);
                modal.removeEventListener('click', handleOutsideClick);
            }
        };

        modal.addEventListener('click', handleOutsideClick);
    }, 100);
}

// Function to close modal
function closeModal(modal) {
    if (!modal) {
        console.error("Modal not found");
        return;
    }

    console.log("Closing modal:", modal.id);

    // Get modal content for animation
    const modalContent = modal.querySelector('.card-modal');
    if (modalContent) {
        console.log("Found modal content for closing");
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translateY(30px)';

        // Hide modal with animation for new style
        modal.classList.remove('active');
        setTimeout(() => {
            // Support both old and new modal styles
            modal.style.display = 'none';

            // Restore body scrolling
            document.body.style.overflow = '';

            // Reset any image loading issues
            const modalImages = modal.querySelectorAll('.brand img');
            modalImages.forEach(img => {
                img.style.opacity = '';
            });
        }, 300);
    } else {
        console.log("No modern modal content found, using legacy style for closing");
        // For old style modals
        modal.style.display = 'none';

        // Restore body scrolling
        document.body.style.overflow = '';
    }

    // Announce to screen readers
    announceModal('Modal closed');
}

// Function to trap focus inside modal
function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus the first element
    setTimeout(() => {
        firstElement.focus();
    }, 100);

    // Trap focus in modal
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// Function to announce modal state to screen readers
function announceModal(message) {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.classList.add('sr-only');
    announcer.textContent = message;

    document.body.appendChild(announcer);

    setTimeout(() => {
        document.body.removeChild(announcer);
    }, 1000);
}

// Add modal functionality to all project cards
function addModalToCards() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const projectLink = card.querySelector('.project-link');
        if (!projectLink) return;

        // Get project category
        const category = card.getAttribute('data-category') || 'website';

        // Set appropriate modal target based on category or other attributes
        let modalTarget;
        if (projectLink.id === 'open-btn') {
            modalTarget = document.getElementById('modal-background');
        } else if (projectLink.id === 'open-btns') {
            modalTarget = document.getElementById('modal-background-c');
        } else if (projectLink.id === 'open-btns-b') {
            modalTarget = document.getElementById('modal-background-b');
        }

        if (modalTarget) {
            projectLink.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(modalTarget);
            });
        }
    });
}

// Initialize modal functionality for cards
document.addEventListener('DOMContentLoaded', function() {
    addModalToCards();

    // Add window resize handler for modals
    window.addEventListener('resize', function() {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            adjustModalForScreenSize(activeModal);
        }
    });
});

// Function to adjust modal for current screen size
function adjustModalForScreenSize(modal) {
    if (!modal) return;

    const modalContent = modal.querySelector('.card-modal');
    if (!modalContent) return;

    // Adjust for mobile
    if (window.innerWidth <= 768) {
        modal.style.alignItems = 'flex-start';
        modalContent.style.margin = '2rem auto';

        // Ensure modal content is not taller than viewport
        const viewportHeight = window.innerHeight;
        const maxHeight = viewportHeight - 40; // 40px for margins
        modalContent.style.maxHeight = maxHeight + 'px';
    } else {
        // Reset for desktop
        modal.style.alignItems = 'center';
        modalContent.style.margin = 'auto';
        modalContent.style.maxHeight = '';
    }

    // Ensure image displays properly
    const brandSection = modalContent.querySelector('.brand');
    const infoSection = modalContent.querySelector('.info');

    if (brandSection && infoSection) {
        if (window.innerWidth <= 992) {
            // For tablet and mobile (stacked layout)
            brandSection.style.width = '100%';
            infoSection.style.width = '100%';

            // Adjust image height based on screen size
            if (window.innerWidth <= 576) {
                brandSection.style.minHeight = '200px';
            } else if (window.innerWidth <= 768) {
                brandSection.style.minHeight = '250px';
            } else {
                brandSection.style.minHeight = '350px';
            }
        } else {
            // For desktop (side-by-side layout)
            brandSection.style.width = '';
            infoSection.style.width = '';
            brandSection.style.minHeight = '400px';
        }
    }
}
