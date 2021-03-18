//START   ---       HEADER BACKGROUND
window.onscroll = function () {
    let headerBackground = document.querySelector('.header-menu');
    if (window.pageYOffset >= 50) {
        headerBackground.classList.add('background-dark');
    }
    if (window.pageYOffset === 0) {
        headerBackground.classList.remove('background-dark');
    }
}

//START   ---       FOOTER SCROLL UP
let btnUp = document.querySelector('.btn-up');
btnUp.addEventListener('click', function (){
    window.scrollTo(top);
});




