/**
 * toggle navbar
 */

const navBarToggler = document.querySelector(".nav-toggler");
navBarToggler.addEventListener("click", toggleMyNav);

function toggleMyNav(){
    navBarToggler.classList.toggle("active")
    document.querySelector(".nav").classList.toggle("open")
}

/**Close nav when item is clicked */
document.addEventListener("click", function(e){
    if (e.target.closest(".nav-item")) {
        toggleMyNav();
    }
})