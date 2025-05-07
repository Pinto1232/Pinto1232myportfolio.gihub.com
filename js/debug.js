// Debug script to help identify issues with modals and card images

document.addEventListener('DOMContentLoaded', function() {
    console.log("Debug script loaded");
    
    // Check if modal elements exist
    setTimeout(() => {
        checkModalElements();
        checkCardImages();
    }, 500);
});

function checkModalElements() {
    console.log("Checking modal elements...");
    
    // Check modal containers
    const modalBackground = document.getElementById('modal-background');
    const modalBackgroundC = document.getElementById('modal-background-c');
    const modalBackgroundB = document.getElementById('modal-background-b');
    
    console.log("Modal containers:", {
        "Car Crew Modal": modalBackground ? "Found" : "Not found",
        "cDesign Modal": modalBackgroundC ? "Found" : "Not found",
        "ClickShop Modal": modalBackgroundB ? "Found" : "Not found"
    });
    
    // Check modal buttons
    const openBtn = document.getElementById('open-btn');
    const openBtns = document.getElementById('open-btns');
    const openBtnsB = document.getElementById('open-btns-b');
    
    console.log("Modal open buttons:", {
        "Car Crew Button": openBtn ? "Found" : "Not found",
        "cDesign Button": openBtns ? "Found" : "Not found",
        "ClickShop Button": openBtnsB ? "Found" : "Not found"
    });
    
    // Check close buttons
    const closeBtn = document.getElementById('close-btn');
    const closeBtnC = document.getElementById('close-btn-c');
    const closeBtnB = document.getElementById('close-btn-b');
    
    console.log("Modal close buttons:", {
        "Car Crew Close": closeBtn ? "Found" : "Not found",
        "cDesign Close": closeBtnC ? "Found" : "Not found",
        "ClickShop Close": closeBtnB ? "Found" : "Not found"
    });
    
    // Add click handlers to modal buttons for testing
    if (openBtn) {
        openBtn.addEventListener('click', function() {
            console.log("Car Crew button clicked");
        });
    }
    
    if (openBtns) {
        openBtns.addEventListener('click', function() {
            console.log("cDesign button clicked");
        });
    }
    
    if (openBtnsB) {
        openBtnsB.addEventListener('click', function() {
            console.log("ClickShop button clicked");
        });
    }
}

function checkCardImages() {
    console.log("Checking card images...");
    
    // Get all card image containers
    const cardImages = document.querySelectorAll('.card-img');
    console.log(`Found ${cardImages.length} card image containers`);
    
    // Check each card image
    cardImages.forEach((cardImg, index) => {
        const computedStyle = window.getComputedStyle(cardImg);
        const backgroundImage = computedStyle.backgroundImage;
        const cardClass = cardImg.className.split(' ')[1] || 'unknown';
        
        console.log(`Card ${index + 1} (${cardClass}):`, 
            backgroundImage !== 'none' ? 
            "Has background image" : 
            "No background image");
        
        // If no background image, add a placeholder
        if (backgroundImage === 'none') {
            cardImg.style.backgroundColor = '#394168';
            cardImg.style.display = 'flex';
            cardImg.style.alignItems = 'center';
            cardImg.style.justifyContent = 'center';
            
            // Add placeholder text
            const placeholder = document.createElement('span');
            placeholder.textContent = cardClass;
            placeholder.style.color = '#fff';
            placeholder.style.fontSize = '1rem';
            placeholder.style.padding = '1rem';
            
            // Clear existing content and add placeholder
            cardImg.innerHTML = '';
            cardImg.appendChild(placeholder);
        }
    });
}

// Add click event to all project links
document.addEventListener('click', function(e) {
    if (e.target.closest('.project-link')) {
        const link = e.target.closest('.project-link');
        console.log("Project link clicked:", link.id || "No ID");
    }
});
