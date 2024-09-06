class AppWindow {

    constructor(name, width, height, id) {

        this.baseRect = {
            left: window.innerWidth / 2 - width / 2 + 20, // delete the 20px if you want to include the titlebar in the total length
            top: window.innerHeight / 2 - height / 2,
            width: width,
            height: height,
            isFullscreen: false
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
        fullscreenButton.onclick = () => this.toggleFullscreen();
        titlebarButtons.appendChild(fullscreenButton);

        const exitButton = document.createElement("img");
        exitButton.classList.add("btn-titlebar", "btn-exit");
        exitButton.src = "../images/exit.png";
        exitButton.onclick = () => this.hide();
        titlebarButtons.appendChild(exitButton);

        const windowContent = document.createElement("iframe");
        windowContent.className = "window-content";
        windowElement.appendChild(windowContent);

        windowContent.onload = () => {
            windowContent.contentDocument.body.style.margin = "0px";
            windowContent.contentDocument.body.style.userSelect = "none";
        }

        this.container = windowElement;
        this.titleBar = titleBar;

        document.getElementById("window-container").appendChild(windowElement);
        AppWindow.windowStack.push(this);
        applyQueue();
        
        AppWindow.stackIndex++;

    }

    loadAsHTML(html) {

        const iframe = this.container.lastChild;
        iframe.contentDocument.body.insertAdjacentHTML("beforeend", html);

    }

    loadAsFile(path) {

        const iframe = this.container.lastChild;
        iframe.src = path;

    }

    loadAsRemoteFile(path) {

        const iframe = this.container.lastChild;
        iframe.src = path;

    }

    initEvents() {

        this.container.onmousedown = initCursor.bind(this);
        this.container.onmouseup = endCursor;
        this.container.onmousemove = e => {
            checkResize.bind(this.container)(e);
            setCursorStyle.bind(this.container)();
        }
        
        var frame = this.container.lastChild;
        frame.contentDocument.body.onmousedown = initCursor.bind(this);
        frame.contentDocument.body.onmousemove = e => {
            checkResize.bind(frame.contentDocument.body)(e);
            setCursorStyle.bind(frame.contentDocument.body)();
        }
        frame.contentDocument.body.onmouseup = endCursor;

    }

    endEvents() {

        this.container.onmousedown = null;
        this.container.onmouseup = null;

    }

    hide() {
        console.log(this)
        this.container.style.display = "none";
        this.endEvents();
    }

    toggleFullscreen() {
        
        if (!this.baseRect.isFullScreen) {

            var windowContainer = document.getElementById("window-container");
            this.container.style.left = "0px";
            this.container.style.top = window.getComputedStyle(windowContainer)["top"];
            this.container.style.width = windowContainer.clientWidth + "px";
            this.container.style.height = windowContainer.clientHeight + "px";

        } else {

            this.container.style.left = this.baseRect.left + "px";
            this.container.style.top = this.baseRect.top + "px";
            this.container.style.width = this.baseRect.width + "px";
            this.container.style.height = this.baseRect.height + "px";

        }

        this.baseRect.isFullScreen = !this.baseRect.isFullScreen;

    }


}

AppWindow.stackIndex = 1;
AppWindow.windowStack = [];