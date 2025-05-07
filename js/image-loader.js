/**
 * Image Loader Script
 * Handles image loading and fallbacks for card images
 * Fixes case sensitivity issues with image paths
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all card images
    const cardImages = document.querySelectorAll('.card-img img');

    // Add loading class to all card image containers
    cardImages.forEach(img => {
        const container = img.parentElement;
        container.classList.add('loading');

        // Fix case sensitivity issues
        const originalSrc = img.getAttribute('src');
        const imgName = originalSrc.split('/').pop(); // Get just the filename

        // Try both uppercase and lowercase extensions
        const baseName = imgName.split('.')[0];
        const possibleExtensions = ['.png', '.PNG', '.jpg', '.JPG', '.jpeg', '.JPEG', '.gif', '.GIF'];

        // Remove loading class when image loads successfully
        img.onload = function() {
            container.classList.remove('loading');
            console.log(`Successfully loaded: ${img.src}`);
        };

        // Try alternative case if image fails to load
        img.onerror = function() {
            console.error(`Failed to load image: ${img.src}`);

            // Try alternative extensions
            let loaded = false;

            for (let ext of possibleExtensions) {
                if (loaded) break;

                const testSrc = `img/${baseName}${ext}`;

                // Create a test image to check if this version exists
                const testImg = new Image();
                testImg.onload = function() {
                    if (!loaded) {
                        img.src = testSrc;
                        loaded = true;
                        console.log(`Found alternative: ${testSrc}`);
                    }
                };

                testImg.src = testSrc;
            }

            // If all else fails, use a fallback image
            setTimeout(() => {
                if (container.classList.contains('loading')) {
                    img.src = 'img/logo.png'; // Use your logo as fallback
                    console.log('Using fallback image');
                }
            }, 1000);
        };
    });

    // Force reload images that might be cached
    setTimeout(() => {
        cardImages.forEach(img => {
            const currentSrc = img.src;
            img.src = '';
            setTimeout(() => {
                img.src = currentSrc;
            }, 10);
        });
    }, 100);
});
