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
                itemBox[k].classList.remove('hide')
                itemBox[k].classList.add('active')
            }
         }
     })
}
 
/* Modal  */

let openBtn = document.getElementById('open-btn');
let openBtns = document.getElementById('open-btns');
let openBtnb = document.getElementById('open-btns-b');
// select the modal-background
let modalBackground = document.getElementById('modal-background');
let modalBackgroundC = document.getElementById('modal-background-c');
let modalBackgroundb = document.getElementById('modal-background-b');
// select the close-btn 
let closeBtn = document.getElementById('close-btn');
let closeBtns = document.getElementById('close-btn-c');
let closeBtnb = document.getElementById('close-btn-b');

// shows the modal when the user clicks open-btn
openBtn.addEventListener('click', function (event)
{
 event.preventDefault()
  modalBackground.style.display = 'block';
});


openBtns.addEventListener('click', function (event)
{
 event.preventDefault()
  modalBackgroundC.style.display = 'block';
});



openBtnb.addEventListener('click', function (event)
{
 event.preventDefault()
  modalBackgroundb.style.display = 'block';
});


// hides the modal when the user clicks close-btn
closeBtn.addEventListener('click', function (event)
{
    event.preventDefault()
  modalBackground.style.display = 'none';
});





// hides the modal when the user clicks close-btn
closeBtns.addEventListener('click', function (event)
{
    event.preventDefault()
  modalBackgroundC.style.display = 'none';
});


// hides the modal when the user clicks close-btn
closeBtnb.addEventListener('click', function (event)
{
    event.preventDefault()
  modalBackgroundb.style.display = 'none';
});

// hides the modal when the user clicks outside the modal
window.addEventListener('click', function(event) {
  // check if the event happened on the modal-background
  if (event.target === modalBackground) {
    // hides the modal
    modalBackground.style.display = 'none';
    }
    
    if (event.target === modalBackgroundC) {
    // hides the modal
    modalBackgroundC.style.display = 'none';
    }
    
     if (event.target === modalBackgroundb) {
    // hides the modal
    modalBackgroundb.style.display = 'none';
  }
});














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