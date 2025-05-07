// Fixed Modal Functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log("Fixed modal script loaded");
    
    // Wait for all elements to be fully loaded
    setTimeout(initializeModals, 300);
});

function initializeModals() {
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
    
    console.log("Modal elements:", {
        carCrewModal: carCrewModal ? "Found" : "Not found",
        cDesignModal: cDesignModal ? "Found" : "Not found",
        clickShopModal: clickShopModal ? "Found" : "Not found"
    });
    
    console.log("Button elements:", {
        carCrewBtn: carCrewBtn ? "Found" : "Not found",
        cDesignBtn: cDesignBtn ? "Found" : "Not found",
        clickShopBtn: clickShopBtn ? "Found" : "Not found"
    });
    
    // Set up Car Crew modal
    if (carCrewBtn && carCrewModal) {
        // Remove existing event listeners by cloning
        const newCarCrewBtn = carCrewBtn.cloneNode(true);
        carCrewBtn.parentNode.replaceChild(newCarCrewBtn, carCrewBtn);
        
        // Add new event listener
        newCarCrewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Car Crew button clicked - opening modal");
            openModalFixed(carCrewModal);
            return false;
        });
    }
    
    // Set up cDesign modal
    if (cDesignBtn && cDesignModal) {
        // Remove existing event listeners by cloning
        const newCDesignBtn = cDesignBtn.cloneNode(true);
        cDesignBtn.parentNode.replaceChild(newCDesignBtn, cDesignBtn);
        
        // Add new event listener
        newCDesignBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("cDesign button clicked - opening modal");
            openModalFixed(cDesignModal);
            return false;
        });
    }
    
    // Set up ClickShop modal
    if (clickShopBtn && clickShopModal) {
        // Remove existing event listeners by cloning
        const newClickShopBtn = clickShopBtn.cloneNode(true);
        clickShopBtn.parentNode.replaceChild(newClickShopBtn, clickShopBtn);
        
        // Add new event listener
        newClickShopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("ClickShop button clicked - opening modal");
            openModalFixed(clickShopModal);
            return false;
        });
    }
    
    // Set up close buttons
    if (carCrewCloseBtn) {
        carCrewCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModalFixed(carCrewModal);
        });
    }
    
    if (cDesignCloseBtn) {
        cDesignCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModalFixed(cDesignModal);
        });
    }
    
    if (clickShopCloseBtn) {
        clickShopCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModalFixed(clickShopModal);
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === carCrewModal) {
            closeModalFixed(carCrewModal);
        } else if (e.target === cDesignModal) {
            closeModalFixed(cDesignModal);
        } else if (e.target === clickShopModal) {
            closeModalFixed(clickShopModal);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (carCrewModal && getComputedStyle(carCrewModal).display !== 'none') {
                closeModalFixed(carCrewModal);
            }
            if (cDesignModal && getComputedStyle(cDesignModal).display !== 'none') {
                closeModalFixed(cDesignModal);
            }
            if (clickShopModal && getComputedStyle(clickShopModal).display !== 'none') {
                closeModalFixed(clickShopModal);
            }
        }
    });
}

function openModalFixed(modal) {
    if (!modal) {
        console.error("Modal not found");
        return;
    }
    
    console.log("Opening modal:", modal.id);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Display the modal
    modal.style.display = 'flex';
    
    // Add active class for animation
    setTimeout(() => {
        modal.classList.add('active');
        
        // Ensure modal content is visible
        const modalContent = modal.querySelector('.card-modal');
        if (modalContent) {
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
            
            // Ensure images are loaded properly
            const modalImage = modalContent.querySelector('.brand img');
            if (modalImage) {
                modalImage.style.opacity = '1';
            }
        }
    }, 10);
    
    // Adjust for mobile
    if (window.innerWidth <= 768) {
        window.scrollTo(0, 0);
    }
}

function closeModalFixed(modal) {
    if (!modal) {
        console.error("Modal not found");
        return;
    }
    
    console.log("Closing modal:", modal.id);
    
    // Remove active class for animation
    modal.classList.remove('active');
    
    // Hide the modal after animation
    setTimeout(() => {
        modal.style.display = 'none';
        
        // Restore body scrolling
        document.body.style.overflow = '';
    }, 300);
}
