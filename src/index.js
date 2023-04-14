import "./styles.css";
import "/images/menu.svg";
import "/images/home.svg";
import "/images/inbox.svg";
import "/images/today.svg";
import "/images/calendar_month.svg";

const sideBar = (() => {
  const headerHeight = document.querySelector("header").offsetHeight;
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.top = headerHeight + "px";
})();
