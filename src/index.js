const windowContainer = document.getElementById("window-container");
windowContainer.onmousemove = handleCursor;
windowContainer.onmouseleave = endCursor;
windowContainer.onmouseup = endCursor;

const buttons = document.getElementsByClassName("btn-menu");
for (const button of buttons) {

    var app = null;
    button.onclick = async function() {

        const app = new AppWindow("Test", 500, 300, AppWindow.stackIndex);
        const content = document.createElement("div");
        content.textContent = button.innerHTML;

        app.create();

        const html = `<div style="width:100%;height:100%;">test</div>`
        app.loadAsHTML(html)
        app.initEvents();

    }
}