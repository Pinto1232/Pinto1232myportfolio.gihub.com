// Direct Modal Fix
// This script directly manipulates the DOM to ensure modals work

document.addEventListener('DOMContentLoaded', function() {
    console.log("Direct modal fix loaded");

    // Wait for everything to load
    setTimeout(fixModals, 500);
});

function fixModals() {
    // Get all modal elements
    const carCrewModal = document.getElementById('modal-background');
    const cDesignModal = document.getElementById('modal-background-c');
    const clickShopModal = document.getElementById('modal-background-b');

    // Get all button elements
    const carCrewBtn = document.getElementById('open-btn');
    const cDesignBtn = document.getElementById('open-btns');
    const clickShopBtn = document.getElementById('open-btns-b');

    // Get all close button elements
    const carCrewCloseBtn = document.getElementById('close-btn');
    const cDesignCloseBtn = document.getElementById('close-btn-c');
    const clickShopCloseBtn = document.getElementById('close-btn-b');

    console.log("Direct fix - Modal elements:", {
        carCrewModal: carCrewModal ? "Found" : "Not found",
        cDesignModal: cDesignModal ? "Found" : "Not found",
        clickShopModal: clickShopModal ? "Found" : "Not found"
    });

    // Direct fix for Car Crew modal
    if (carCrewBtn && carCrewModal) {
        // Create a completely new button
        const newBtn = document.createElement('a');
        newBtn.id = 'open-btn';
        newBtn.className = 'project-link';
        newBtn.innerHTML = carCrewBtn.innerHTML;

        // Replace the old button
        carCrewBtn.parentNode.replaceChild(newBtn, carCrewBtn);

        // Add direct event listener
        newBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Direct fix - Opening Car Crew modal");

            // Reset any previous styles
            carCrewModal.style.opacity = '0';

            // Show the modal
            carCrewModal.style.display = 'flex';

            // Force a reflow to ensure the transition works
            void carCrewModal.offsetWidth;

            // Add active class and set opacity
            carCrewModal.classList.add('active');
            carCrewModal.style.opacity = '1';

            // Prevent body scrolling
            document.body.style.overflow = 'hidden';

            // Center the modal content
            const modalContent = carCrewModal.querySelector('#modal');
            if (modalContent) {
                modalContent.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }

            return false;
        };
    }

    // Direct fix for cDesign modal
    if (cDesignBtn && cDesignModal) {
        // Create a completely new button
        const newBtn = document.createElement('a');
        newBtn.id = 'open-btns';
        newBtn.className = 'project-link';
        newBtn.innerHTML = cDesignBtn.innerHTML;

        // Replace the old button
        cDesignBtn.parentNode.replaceChild(newBtn, cDesignBtn);

        // Add direct event listener
        newBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Direct fix - Opening cDesign modal");

            // Reset any previous styles
            cDesignModal.style.opacity = '0';

            // Show the modal
            cDesignModal.style.display = 'flex';

            // Force a reflow to ensure the transition works
            void cDesignModal.offsetWidth;

            // Add active class and set opacity
            cDesignModal.classList.add('active');
            cDesignModal.style.opacity = '1';

            // Prevent body scrolling
            document.body.style.overflow = 'hidden';

            // Center the modal content
            const modalContent = cDesignModal.querySelector('#modal-c');
            if (modalContent) {
                modalContent.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }

            return false;
        };
    }

    // Direct fix for ClickShop modal
    if (clickShopBtn && clickShopModal) {
        // Create a completely new button
        const newBtn = document.createElement('a');
        newBtn.id = 'open-btns-b';
        newBtn.className = 'project-link';
        newBtn.innerHTML = clickShopBtn.innerHTML;

        // Replace the old button
        clickShopBtn.parentNode.replaceChild(newBtn, clickShopBtn);

        // Add direct event listener
        newBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Direct fix - Opening ClickShop modal");

            // Reset any previous styles
            clickShopModal.style.opacity = '0';

            // Show the modal
            clickShopModal.style.display = 'flex';

            // Force a reflow to ensure the transition works
            void clickShopModal.offsetWidth;

            // Add active class and set opacity
            clickShopModal.classList.add('active');
            clickShopModal.style.opacity = '1';

            // Prevent body scrolling
            document.body.style.overflow = 'hidden';

            // Center the modal content
            const modalContent = clickShopModal.querySelector('#modal-b');
            if (modalContent) {
                modalContent.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }

            return false;
        };
    }

    // Direct fix for close buttons
    if (carCrewCloseBtn) {
        carCrewCloseBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Direct fix - Closing Car Crew modal");
            carCrewModal.style.display = 'none';
            carCrewModal.classList.remove('active');
            document.body.style.overflow = '';
            return false;
        };
    }

    if (cDesignCloseBtn) {
        cDesignCloseBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Direct fix - Closing cDesign modal");
            cDesignModal.style.display = 'none';
            cDesignModal.classList.remove('active');
            document.body.style.overflow = '';
            return false;
        };
    }

    if (clickShopCloseBtn) {
        clickShopCloseBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Direct fix - Closing ClickShop modal");
            clickShopModal.style.display = 'none';
            clickShopModal.classList.remove('active');
            document.body.style.overflow = '';
            return false;
        };
    }

    // Close modal when clicking outside
    window.onclick = function(e) {
        if (e.target === carCrewModal) {
            carCrewModal.style.display = 'none';
            carCrewModal.classList.remove('active');
            document.body.style.overflow = '';
        } else if (e.target === cDesignModal) {
            cDesignModal.style.display = 'none';
            cDesignModal.classList.remove('active');
            document.body.style.overflow = '';
        } else if (e.target === clickShopModal) {
            clickShopModal.style.display = 'none';
            clickShopModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Close modal with Escape key
    document.onkeydown = function(e) {
        if (e.key === 'Escape') {
            if (carCrewModal && getComputedStyle(carCrewModal).display !== 'none') {
                carCrewModal.style.display = 'none';
                carCrewModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            if (cDesignModal && getComputedStyle(cDesignModal).display !== 'none') {
                cDesignModal.style.display = 'none';
                cDesignModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            if (clickShopModal && getComputedStyle(clickShopModal).display !== 'none') {
                clickShopModal.style.display = 'none';
                clickShopModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    };
}
