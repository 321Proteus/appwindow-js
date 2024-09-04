class AppWindow {

    constructor(name, width, height, id) {

        this.baseRect = {
            left: window.innerWidth / 2 - width / 2 + 20, // delete the 20px if you want to include the titlebar in the total length
            top: window.innerHeight / 2 - height / 2,
            width: width,
            height: height
        };
        
        this.name = name;
        this.id = id;
        this.container = null;
        this.titleBar = null;

    }

    create(html) {

        const windowElement = document.createElement("div");
        windowElement.className = "app";

        windowElement.style.left = this.baseRect.left + "px";
        windowElement.style.top = this.baseRect.top + "px";
        windowElement.style.width = this.baseRect.width + "px";
        windowElement.style.height = this.baseRect.height + "px";

        const titleBar = document.createElement("div");
        titleBar.className = "title-bar";
        windowElement.appendChild(titleBar);
        titleBar.insertAdjacentHTML("beforeend", `<div class=window-title>${this.name}</div>`);

        const titlebarButtons = document.createElement("div");
        titlebarButtons.className = "titlebar-buttons";
        titleBar.appendChild(titlebarButtons)

        const fullscreenButton = document.createElement("img");
        fullscreenButton.classList.add("btn-titlebar", "btn-full");
        fullscreenButton.src = "../images/fullscreen.png";
        titlebarButtons.appendChild(fullscreenButton);

        const exitButton = document.createElement("img");
        exitButton.classList.add("btn-titlebar", "btn-exit");
        exitButton.src = "../images/exit.png";
        exitButton.onclick = () => this.hide;
        titlebarButtons.appendChild(exitButton);

        const windowContent = document.createElement("div");
        windowContent.className = "window-content";
        if (html) windowContent.insertAdjacentElement("beforeend", html);
        windowElement.appendChild(windowContent);

        this.container = windowElement;
        this.titleBar = titleBar;

        document.getElementById("window-container").appendChild(windowElement);
        AppWindow.windowStack.set(AppWindow.stackIndex, this);
        AppWindow.stackIndex++;

    }

    initEvents() {

        this.container.onmousedown = initCursor.bind(this);
        this.container.onmouseup = endCursor;

    }

    endEvents() {

    }

    hide() {
        console.log(this)
        this.container.style.display = "none";
        this.endEvents();
    }

}

AppWindow.stackIndex = 1;
AppWindow.windowStack = new Map();