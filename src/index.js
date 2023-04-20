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

const addTask = (() => {
    const addTaskBtn = document.querySelector('#addTaskBtn');
    const popup = document.querySelector('#popup');

    addTaskBtn.addEventListener('click', () => {
        popup.classList.toggle('open');
    })
})();
