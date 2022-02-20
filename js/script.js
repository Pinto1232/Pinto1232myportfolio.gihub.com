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
 * Portfolio Gallery
 */

 let list = document.querySelectorAll('.list');
 let itemBox = document.querySelectorAll('.itemBox');


 for(let i = 0; i<list.length; i++){
     list[i].addEventListener('click', function()
     {
         for(let j = 0; j< list.length; j++){
             list[j].classList.remove('active')
         }
         this.classList.add('active')

         let dataFilter = this.getAttribute('data-filter')
         for(let k = 0; k <itemBox.length; k++){
            itemBox[k].classList.remove('active')
            itemBox[k].classList.add('hide')

            if(itemBox[k].getAttribute('data-item') == dataFilter || dataFilter  == "all"){
                itemBox[k].classList.remove('hide')
                itemBox[k].classList.add('active')
            }
         }
     })
 }
 


















/**
 *  Loader
 */
/* function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
    setInterval(loader, 2000);
}

window.onload = fadeOut; */