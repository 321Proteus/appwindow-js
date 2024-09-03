class AppWindow {

    constructor(name, width, height, id) {

        this.height = height;
        this.width = width;
        this.name = name;
        this.id = id;

    }

    create(html) {

        const windowElement = document.createElement("div");
        windowElement.className = "app";

        windowElement.style.width = this.width + "px";
        windowElement.style.height = this.height + "px";

        const windowContent = document.createElement("div");
        windowContent.className = "window-content";
        if (html) windowContent.insertAdjacentElement("beforeend", html);
        windowElement.appendChild(windowContent);

        document.getElementById("window-container").appendChild(windowElement)

    }

}