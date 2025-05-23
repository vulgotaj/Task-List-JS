const modal = document.querySelector('#create-modal');
const modalOpener = document.querySelector('#modal-button');
const menu = document.querySelector('#menu');
const menuButton = document.querySelector('#menu_button');
const closeButton = document.querySelector('#close_menu');
const menuOverlay = document.querySelector('#menu_overlay');

// ------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    menuButton.addEventListener('click', openMenu);
    closeButton.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);
});

modalOpener.addEventListener('click', openModal)
modal.addEventListener('click', closeModal)
    
// ------------------------------------------------------------------------

function openModal() {
    modal.classList.remove('hidden');             
    modal.classList.add('flex'); 
}

function closeModal(e) {
    const cancelButton = document.querySelector('#cancel-button')
    if(e.target === modal || e.target === cancelButton) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }
}

function openMenu() {
    menu.classList.remove('-translate-x-full');
    menu.classList.add("active");
    menuOverlay.style.display = 'block'
}

function closeMenu() {
    menu.classList.remove("active");
    menu.classList.add('-translate-x-full');
    menuOverlay.style.display = 'none';
}