import "./styles.css";
import "/images/menu.svg";
import "/images/home.svg";
import "/images/inbox.svg";
import "/images/today.svg";
import "/images/calendar_month.svg";
import "/images/add.svg"
import { format, isToday, isWithinInterval, addDays } from 'date-fns'

const sideBar = (() => {
    const header = document.querySelector('header');
    const headerHeight = getComputedStyle(header).getPropertyValue('height');
    document.documentElement.style.setProperty('--header-height', headerHeight);

    let openBar = true;
    const menuBtn = document.querySelector('#menuBtn');
    const buttons = document.querySelectorAll('.sidebar button .btn-text');
    const body = document.querySelector('body');
    const sidebar = document.querySelector('.sidebar');
    const leftPadding = document.querySelector('.sidebar ul');
    menuBtn.addEventListener('click', () => {
        if(openBar) {
            buttons.forEach(button => {
            button.style.fontSize = '0';
            });
            openBar = false;
            body.style.gridTemplateColumns = '3.3vw 7fr';
            sidebar.style.width = '3.3vw';
            leftPadding.style.paddingInlineStart = '0px'
        } else { 
            buttons.forEach(button => {
                button.style.fontSize = '13px';
            });
            openBar = true;
            body.style.gridTemplateColumns = '20vw 7fr';
            sidebar.style.width = '20vw';
            leftPadding.style.paddingInlineStart = '40px';
        }
    });
})();

const taskListHandler = (() => {
    let tasks = [];

    function addTask(task) {
        tasks.push(task);
    }

    return { tasks , addTask }
});

const displayController = (() => {
    let searchSelection = 'inbox';
    let selectedButton = null;

    const container = document.querySelector('.content');
    const buttons = document.querySelectorAll('.sidebar button');

    window.addEventListener('load', () => {
        const inboxButton = buttons[0];
        inboxButton.classList.add('selected');
        selectedButton = inboxButton;
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
        if (selectedButton) {
            selectedButton.classList.remove('selected');
        }
        button.classList.add('selected');
        selectedButton = button;

        const buttonName = button.textContent.trim();
        searchSelection = buttonName;
        drawListToScreen(searchSelection);
        console.log(searchSelection);
        });
    });

    function drawListToScreen(filter) {
        container.innerText = '';
        taskList.tasks.forEach((todo, index) => {
            const div = document.createElement('div');
            const taskName = document.createElement('h4');
            const deadlineDate = document.createElement('p');
            const completedBox = document.createElement('input');
            completedBox.setAttribute('type', 'checkbox');

            taskName.textContent = todo.task;
            deadlineDate.textContent = format(todo.deadline, 'MM/dd/yyyy');
            completedBox.checked = task.completed;

            div.appendChild(completedBox);
            div.appendChild(taskName);
            div.appendChild(deadlineDate);
            div.classList.add('taskItem');
            deadlineDate.classList.add('deadlineDate');
            console.log(todo)

            if(filter === 'Today') {
                if(isToday(new Date(todo.deadline))) {
                    container.appendChild(div);
                }
            } else if(filter === 'Inbox') {
                container.appendChild(div);
            } else if(filter === 'Upcoming') {
                const startDate = new Date();
                const endDate = addDays(startDate, 7);
                if(isWithinInterval(new Date(todo.deadline), { start: startDate, end: endDate })) {
                    container.appendChild(div);
                }
            }

        });
    }

    return { drawListToScreen , searchSelection }
});

const addTaskPopup = (() => {
    const addTaskBtn = document.querySelector('#addTaskBtn');
    const popup = document.querySelector('#popup');
    const form = document.querySelector('#addTaskForm');
    const cancelBtn = document.querySelector("#cancelTaskBtn");

    addTaskBtn.addEventListener('click', () => {
        popup.classList.toggle('open');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = form.querySelector('#task').value;
        const deadline = form.querySelector('#deadline').value;
        const todo = new Task(task, deadline);
        taskList.addTask(todo);
        form.reset();
        popup.classList.toggle('open');
        display.drawListToScreen('Inbox');
    });

    cancelBtn.addEventListener('click', () => {
        form.reset();
        popup.classList.toggle('open');
    });
});

class Task {
    constructor(task, deadline, completed = false) {
        this.task = task;
        this.deadline = new Date(deadline);
        this.completed;
    }
}

const taskList = taskListHandler();
const display = displayController();
const popup = addTaskPopup();

const task1 = new Task('Task 1', '5-14-2023');
const task2 = new Task('Task 2', '1-01-2022');
const task3 = new Task('Task 3', '07-20-2000');
const task4 = new Task('Task 4', '05-24-2024');
const task5 = new Task('Task 5', '04-30-2023');

taskList.addTask(task1);
taskList.addTask(task2);
taskList.addTask(task3);
taskList.addTask(task4);
taskList.addTask(task5);

display.drawListToScreen('Inbox');
