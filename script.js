document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector('#menu');
    const menuButton = document.querySelector('#menu_button');
    const closeButton = document.querySelector('#close_menu');

    menuButton.addEventListener('click', () => {
        menu.classList.remove('-translate-x-full');
        menu.classList.add("active");
    });

    closeButton.addEventListener('click', () => {
        menu.classList.remove("active");
        menu.classList.add('-translate-x-full');
    });

    menuOverlay.addEventListener('click', () => {
        menu.classList.remove("active");
        menu.classList.add('-translate-x-full');
    });
});
