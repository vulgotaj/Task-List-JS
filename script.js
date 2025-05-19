document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector('#menu');
    const menuButton = document.querySelector('#menu_button');
    const closeButton = document.querySelector('#close_menu');
    const menuOverlay = document.querySelector('#menu_overlay');

    menuButton.addEventListener('click', () => {
        menu.classList.remove('-translate-x-full');
        menu.classList.add("active");
        menuOverlay.style.display = "block";
    });

    closeButton.addEventListener('click', () => {
        menu.classList.remove("active");
        menu.classList.add('-translate-x-full');
        menuOverlay.style.display = "none";
    });

    menuOverlay.addEventListener('click', () => {
        menu.classList.remove("active");
        menu.classList.add('-translate-x-full');
        menuOverlay.style.display = "none";
    });
});
