import "./styles.css";
import "/images/menu.svg";
import "/images/home.svg";
import "/images/inbox.svg";
import "/images/today.svg";
import "/images/calendar_month.svg";

const sideBar = (() => {
    const header = document.querySelector('header');
    const headerHeight = getComputedStyle(header).getPropertyValue('height');
    document.documentElement.style.setProperty('--header-height', headerHeight);
})();
