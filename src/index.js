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

    function addTask(task) {
        tasks.push(task);
    }

    return { tasks , addTask }
});

const displayController = (() => {
    const container = document.querySelector('.content');

    function drawListToScreen() {
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

            container.appendChild(div);
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

    form.addEventListener('submit', () => {
        const task = form.querySelector('#task').value;
        const deadline = form.querySelector('#deadline').value;
        const todo = new Task(task, deadline);
    });

    cancelBtn.addEventListener('click', () => {
        form.reset();
        popup.classList.toggle('open');
    });
})();

class Task {
    constructor(task, deadline, completed = false) {
        this.task = task;
        this.deadline = deadline;
        this.completed;
    }

    addToList(list) {
        list.push(this);
    }

    removeFromList(list) {
        list.splice(this);
    }
}

const taskList = taskListHandler();
const display = displayController();

const task1 = new Task('Task 1', '12/24/1997');

taskList.addTask(task1);

display.drawListToScreen();