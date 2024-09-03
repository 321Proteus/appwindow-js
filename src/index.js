const buttons = document.getElementsByClassName("btn-menu");
for (const button of buttons) {

    var app = null;
    button.onclick = async function() {
        createWindow(500, 300);
    }
}

function createWindow(width, height) {

    const windowElement = document.createElement("div");

    windowElement.style.width = width + "px";
    windowElement.style.height = height + "px";
    windowElement.className = "app";

    const windowContent = document.createElement("div");
    windowContent.insertAdjacentHTML("beforeend", "<div>Test</div>")
    windowContent.className = "window-content";
    windowElement.appendChild(windowContent);

    document.getElementById("window-container").appendChild(windowElement);

}