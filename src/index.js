document.getElementById("window-container").onmousemove = handleCursor;
document.getElementById("window-container").onmouseleave = endCursor;

const buttons = document.getElementsByClassName("btn-menu");
for (const button of buttons) {

    var app = null;
    button.onclick = async function() {

        const app = new AppWindow("Test", 500, 300, 1);
        const content = document.createElement("div");
        content.textContent = button.innerHTML;

        app.create(content);
        app.initEvents();

    }
}