// Simple Modal JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple Modal JS loaded');
    initSimpleModals();
});

function initSimpleModals() {
    // Get all modal elements
    const modals = document.querySelectorAll('.simple-modal');

    // Get all modal trigger buttons
    const modalTriggers = document.querySelectorAll('[data-modal-target]');

    // Get all close buttons
    const closeButtons = document.querySelectorAll('.simple-modal-close');

    console.log(`Found ${modals.length} modals, ${modalTriggers.length} triggers, and ${closeButtons.length} close buttons`);

    // Add click event to all modal triggers
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the target modal ID
            const modalId = this.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);

            if (modal) {
                console.log(`Opening modal: ${modalId}`);
                openModal(modal);
            } else {
                console.error(`Modal with ID ${modalId} not found`);
            }
        });
    });

    // Add click event to all close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Find the parent modal
            const modal = this.closest('.simple-modal');

            if (modal) {
                console.log(`Closing modal: ${modal.id}`);
                closeModal(modal);
            }
        });
    });

    // Close modal when clicking outside the content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            // If the click is directly on the modal background (not on its children)
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Find any open modal
            const openModal = document.querySelector('.simple-modal[style*="display: flex"]');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

function openModal(modal) {
    if (!modal) return;

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    // Display the modal
    modal.style.display = 'flex';

    // Ensure images load properly
    const modalImage = modal.querySelector('.simple-modal-image img');
    if (modalImage) {
        // Force image reload if needed
        const currentSrc = modalImage.src;
        if (currentSrc) {
            // Add a small random parameter to force reload if needed
            if (currentSrc.indexOf('?') === -1) {
                modalImage.src = currentSrc + '?t=' + new Date().getTime();
            }

            // Add load event to ensure proper display
            modalImage.onload = function() {
                this.style.opacity = '1';
            };
        }
    }

    // Focus the first focusable element
    setTimeout(() => {
        const focusableElement = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElement) {
            focusableElement.focus();
        }
    }, 100);
}

function closeModal(modal) {
    if (!modal) return;

    // Hide the modal
    modal.style.display = 'none';

    // Restore body scrolling
    document.body.style.overflow = '';
}

// Direct access functions for legacy support
window.openSimpleModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        openModal(modal);
    }
};

window.closeSimpleModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        closeModal(modal);
    }
};
