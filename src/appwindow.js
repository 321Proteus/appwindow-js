class AppWindow {

    constructor(name, width, height, id) {

        this.height = height + 20; // delete the 20px if you want to include the titlebar in the total length
        this.width = width;
        this.name = name;
        this.id = id;
        this.container = null;
        this.titleBar = null;

    }

    create(html) {

        const windowElement = document.createElement("div");
        windowElement.className = "app";

        windowElement.style.width = this.width + "px";
        windowElement.style.height = this.height + "px";

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

        document.getElementById("window-container").appendChild(windowElement)

    }

    initEvents() {

        this.container.onmousedown = handleMouseDown;

    }

    endEvents() {

    }

    hide() {
        console.log(this)
        this.container.style.display = "none";
        this.endEvents();
    }

}