let currentlyDragged = null;
let appRect = null;
let isDragging = false;
let startX = 0;
let startY = 0;

function initCursor(e) {

    console.log("Mouse down");

    if (e.target.className == "window-title") {
        
        currentlyDragged = this;
        appRect = this.baseRect;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

    } else if (e.target.className == "window-content") {

        currentlyDragged = this;
        startX = e.clientX;
        startY = e.clientY;

    } else return;

}

function handleCursor(e) {

    if (currentlyDragged && isDragging) {

        currentlyDragged.container.style.left = e.clientX - (startX - appRect.left) + "px";
        currentlyDragged.container.style.top = e.clientY - (startY - appRect.top) + "px";

    }

}

function endCursor(e) {
    
    if (isDragging) console.log("Mouse up");
    else console.log("Mouse out");

    isDragging = false;
    currentlyDragged = null;

}