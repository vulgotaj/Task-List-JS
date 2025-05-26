const modal = document.querySelector('#create-modal');
const modalOpener = document.querySelector('#modal-button');
// ----------------------------------
const menu = document.querySelector('#menu');
const menuButton = document.querySelector('#menu_button');  
const closeButton = document.querySelector('#close_menu');
const menuOverlay = document.querySelector('#menu_overlay');
// ----------------------------------
const taskNum = document.querySelector('#task-num');
const taskName = document.querySelector('#task-name');
const taskDate = document.querySelector('#task-date');
const taskDesc = document.querySelector('#task-desc');
const createTaskBtn = document.querySelector('#create-button');
const taskList = document.querySelector('#task-list');

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
    modal.classList.add('flex');                          // ABRIR MODAL CRIADOR DE TAREFAS
}

function closeModal(e) {
    const cancelButton = document.querySelector('#cancel-button')
    if(e.target === modal || e.target === cancelButton) {
        modal.classList.remove('flex');                 // FECHAR MODAL CRIADOR DE TAREFAS
        modal.classList.add('hidden');
    }
}

function openMenu() {
    menu.classList.remove('-translate-x-full');         // ABRIR O MENU LATERAL
    menu.classList.add("active");
    menuOverlay.style.display = 'block'
}

function closeMenu() {
    menu.classList.remove("active");                    // FECHAR O MENU LATERAL
    menu.classList.add('-translate-x-full');
    menuOverlay.style.display = 'none';
}

function divCreator() {
    const div = document.createElement('div');         // CRIADOR DE DIV
    return div;
}

function taskCreator(taskNum, taskName, taskDate, taskDesc) {
    const div = divCreator();
    div.setAttribute('id', 'task-card');
    div.setAttribute('class', 'mx-auto bg-white rounded-xl py-10 px-4 flex flex-col items-center max-w-xs');
    div.innerHTML =  
            `<p class="font-bold mb-5">${taskNum}</p>

            <p class="mb-3 text-lg">${taskName}</p>
            <p class="mb-2">${taskDate}</p>
            <p class="mb-4 border border-gray-300 p-1">${taskDesc}</p>

            <div id="user-actions" class="flex justify-center gap-8">
                <button class="bg-red-700 px-2 py-1 rounded-md text-white font-bold cursor-pointer transition-all hover:bg-red-900">Cancelar</button>
                <button class="bg-gray-400 px-2 py-1 rounded-md text-white font-bold cursor-pointer transition-all hover:bg-gray-900">Editar</button>
                <button class="bg-green-600 px-2 py-1 rounded-md text-white font-bold cursor-pointer transition-all hover:bg-green-900">Finalizar</button>
            </div>`
    taskList.appendChild(div);
}

createTaskBtn.addEventListener('click', () => {
    if (!taskNum.value || !taskName.value || !taskDate.value || !taskDesc.value) return;
    taskCreator(taskNum.value, taskName.value, taskDate.value, taskDesc.value);
})