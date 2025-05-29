const modal = document.querySelector('#create-modal');
const modalOpener = document.querySelector('#modal-button');
const cancelButton = document.querySelector('#cancel-button')

const menu = document.querySelector('#menu');
const menuButton = document.querySelector('#menu_button');  
const closeButton = document.querySelector('#close_menu');
const menuOverlay = document.querySelector('#menu_overlay');

const taskNum = document.querySelector('#task-num');
const taskName = document.querySelector('#task-name');
const taskDate = document.querySelector('#task-date');
const taskDesc = document.querySelector('#task-desc');
const createTaskBtn = document.querySelector('#create-button');
const taskList = document.querySelector('#task-list');

const menuItems = document.querySelectorAll('#menu-nav li');

let tasks = [];
let currentFilter = 'todos';

// -----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    menuButton.addEventListener('click', openMenu);
    closeButton.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const text = item.innerText.trim();
            if (text.includes('Em andamento')) currentFilter = 'pendente';
            else if (text.includes('Concluídas')) currentFilter = 'finalizada';
            else if (text.includes('Canceladas')) currentFilter = 'cancelada';
            else currentFilter = 'todos';
            renderTasks();
            closeMenu();
        });
    });
});

modalOpener.addEventListener('click', openModal);

modal.addEventListener('click', (e) => {
    if(e.target === modal || e.target === cancelButton) closeModal();    
});

createTaskBtn.addEventListener('click', () => {
    if (!taskNum.value || !taskName.value || !taskDate.value || !taskDesc.value) return;
    taskCreator(taskNum.value, taskName.value, taskDate.value, taskDesc.value);
});

// --------------------------

function openModal() {
    modal.classList.remove('hidden');             
    modal.classList.add('flex');                          
}

function closeModal() {
    modal.classList.remove('flex');                
    modal.classList.add('hidden');
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

function divCreator() {
    const div = document.createElement('div');         
    return div;
}

function inputCleaner() {
    taskNum.value = ""
    taskName.value = ""                                
    taskDate.value = ""
    taskDesc.value = ""
}

function updateTaskStatus(taskNum, newStatus) {
    const task = tasks.find(t => t.taskNum == taskNum);
    if (task) {
        task.status = newStatus;
        renderTasks();
    }
}

function addTaskListeners(div, taskNum) {
    div.querySelector('.cancel-btn').addEventListener('click', () => {
        updateTaskStatus(taskNum, 'cancelada');
    });

    div.querySelector('.finalize-btn').addEventListener('click', () => {
        updateTaskStatus(taskNum, 'finalizada');
    });

    div.querySelector('.edit-btn').addEventListener('click', () => {
        const task = tasks.find(t => t.taskNum == taskNum);
        if (task) {
            taskName.value = task.taskName;
            taskDate.value = task.taskDate;
            taskDesc.value = task.taskDesc;
            taskNum.value = task.taskNum;
            openModal();
        }
    });
}

function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

function createTaskCard(task) {
    const { taskNum, taskName, taskDate, taskDesc, status } = task;

    const borderColors = {
        pendente: 'border-yellow-400',
        finalizada: 'border-green-600',
        cancelada: 'border-red-700',
    };

    const div = divCreator();
    div.setAttribute('id', 'task-card');
    div.setAttribute('class', `mx-auto bg-white rounded-xl py-10 px-4 flex flex-col items-center max-w-xs border-4 ${borderColors[status]} h-[300px]`);
    div.innerHTML = `
        <p class="font-bold mb-5">T-${taskNum}</p>
        <p class="mb-3 text-lg">${taskName}</p>
        <p class="mb-2">${formatDate(taskDate)}</p>
        <p class="mb-4 border border-gray-300 p-1 max-h-32 overflow-y-auto w-full">${taskDesc}</p>
        <div class="flex justify-center gap-8">
            <button class="cancel-btn bg-red-700 px-2 py-1 rounded-md text-white font-bold cursor-pointer transition-all hover:bg-red-900">Cancelar</button>
            <button class="edit-btn bg-gray-400 px-2 py-1 rounded-md text-white font-bold cursor-pointer transition-all hover:bg-gray-900">Editar</button>
            <button class="finalize-btn bg-green-600 px-2 py-1 rounded-md text-white font-bold cursor-pointer transition-all hover:bg-green-900">Finalizar</button>
        </div>`;

    addTaskListeners(div, taskNum);
    return div;
}

function renderTasks() {
    taskList.innerHTML = '';
    const filtered = tasks.filter(task => {
        if (currentFilter === 'todos') return true;
        return task.status === currentFilter;
    });

    filtered.forEach(task => {
        const card = createTaskCard(task);
        taskList.appendChild(card);
    });
}

function taskCreator(taskNum, taskName, taskDate, taskDesc) {
    tasks.push({ taskNum, taskName, taskDate, taskDesc, status: 'pendente' });
    renderTasks();
    inputCleaner();
    closeModal();
}
