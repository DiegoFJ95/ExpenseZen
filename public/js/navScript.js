const body = document.querySelector("body");
const themeToggle = document.querySelector(".nav-toggle");
const lightIcon = document.querySelector(".light-mode-icon")
const darkIcon = document.querySelector(".dark-mode-icon")
const navButtons = document.querySelectorAll(".nav-button")

const route = window.location.pathname.split("/")[1]


let theme = localStorage.getItem("theme");
if(!theme){
    localStorage.setItem("theme", "light");
}

if(theme){
    if(theme == "dark"){
        body.classList.replace("light", "dark");
        lightIcon.style.display = "none";
        darkIcon.style.display = "flex";
    }
    else if(theme == "light"){
        darkIcon.style.display = "none";
        lightIcon.style.display = "flex";
    }
}

themeToggle.addEventListener("click", () => { 
    if(theme){
        if(localStorage.getItem("theme") == "light"){
            body.classList.replace("light", "dark");
            localStorage.setItem("theme", "dark");
            lightIcon.style.display = "none";
            darkIcon.style.display = "flex";
        }
    
        else if(localStorage.getItem("theme") == "dark"){
            body.classList.replace("dark", "light");
            localStorage.setItem("theme", "light");
            darkIcon.style.display = "none";
            lightIcon.style.display = "flex";
        }
    }

    // body.classList.remove("light");
    // body.classList.add("dark");
    
});



// Highlight current route in navbar

if (route == "dashboard"){
    const dashboard = navButtons[0];
    dashboard.classList.add("selected-page");
}
else if (route == "transactions"){
    const transactions = navButtons[1];
    transactions.classList.add("selected-page");
}
else if (route == "budgets"){
    const budgets = navButtons[2];
    budgets.classList.add("selected-page");
}
else if (route == "help"){
    const help = navButtons[3];
    help.classList.add("selected-page");
}
