/**
 * toggle navbar
 */

const navBarToggler = document.querySelector(".nav-toggler");
navBarToggler.addEventListener("click", toggleMyNav);

function toggleMyNav() {
    navBarToggler.classList.toggle("active")
    document.querySelector(".nav").classList.toggle("open")
}

/**Close nav when item is clicked */
document.addEventListener("click", function (e) {
    if (e.target.closest(".nav-item")) {
        toggleMyNav();
    }
});



















/**
 *  Loader
 */
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
    setInterval(loader, 2000);
}

window.onload = fadeOut;