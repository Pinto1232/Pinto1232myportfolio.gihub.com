/**
 * toggle navbar
 */

const navBarToggler = document.querySelector(".nav-toggler");
navBarToggler.addEventListener("click", toggleMyNav);

function toggleMyNav(){
    document.querySelector(".nav").classList.toggle("open")
}