let currentlyDragged = null;
let appRect = null;
let isDragging = false;
let startX = 0;
let startY = 0;

function initCursor(e) {

    console.log("Mouse down");

    updateQueue(this);
    applyQueue();

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

    if (currentlyDragged) currentlyDragged.baseRect = {
        left: removePixels(currentlyDragged.container.style.left),
        top: removePixels(currentlyDragged.container.style.top),        
        width: removePixels(currentlyDragged.container.style.width),
        height: removePixels(currentlyDragged.container.style.height)
    }

    isDragging = false;
    currentlyDragged = null;

}

function updateQueue(element) {

    var oldPosition = AppWindow.windowStack.indexOf(element);

    for (var i = oldPosition; i < AppWindow.windowStack.length - 1; i++) {
        AppWindow.windowStack[i] = AppWindow.windowStack[i+1];
    }        

    AppWindow.windowStack[AppWindow.windowStack.length - 1] = element;

}

function applyQueue() {
    
    for (var i=0;i<AppWindow.windowStack.length;i++) {
        AppWindow.windowStack[i].container.style.zIndex = i + 1;
    }

}