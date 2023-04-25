import "./styles.css";
import "/images/menu.svg";
import "/images/home.svg";
import "/images/inbox.svg";
import "/images/today.svg";
import "/images/calendar_month.svg";
import "/images/add.svg"

const sideBar = (() => {
    const header = document.querySelector('header');
    const headerHeight = getComputedStyle(header).getPropertyValue('height');
    document.documentElement.style.setProperty('--header-height', headerHeight);
})();

const taskListHandler = (() => {
    let tasks = [];
    let orderedTasks = [];
    const today = new Date();

    function addTask(task) {
        tasks.push(task);
    }

    return { tasks , orderedTasks ,addTask }
});

const displayController = (() => {
    const container = document.querySelector('.content');
    const today = new Date().toLocaleDateString();

    function drawListToScreen(filter) {
        container.innerText = '';
        taskList.tasks.forEach((todo, index) => {
            const div = document.createElement('div');
            const taskName = document.createElement('h4');
            const deadlineDate = document.createElement('p');
            const completedBox = document.createElement('input');
            completedBox.setAttribute('type', 'checkbox');

            taskName.textContent = todo.task;
            deadlineDate.textContent = todo.deadline;
            completedBox.checked = task.completed;

            div.appendChild(completedBox);
            div.appendChild(taskName);
            div.appendChild(deadlineDate);
            div.classList.add('taskItem');
            deadlineDate.classList.add('deadlineDate');

            if(filter === 'today') {
                if(todo.deadline === today) {
                    container.appendChild(div);
                }
            } else if(filter === 'inbox') {
                container.appendChild(div);
            }

        });
    }

    return { drawListToScreen }
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
        display.drawListToScreen();
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

const task1 = new Task('Task 1', '12-24-1997');
const task2 = new Task('Task 2', '12-24-1996');
const task3 = new Task('Task 3', '12-24-2000');
const task4 = new Task('Task 4', '12-24-2021');
const task5 = new Task('Task 5', '04-25-2023');

taskList.addTask(task1);
taskList.addTask(task2);
taskList.addTask(task3);
taskList.addTask(task4);
taskList.addTask(task5);

display.drawListToScreen('inbox');
