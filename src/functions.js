let currentlyDragged = null;
let appRect = null;
let isDragging = false;
let isContainer = false;

let caller = null, previousCaller;

let startX = 0;
let startY = 0;

let isBorder = false;
let isResize = false;
let resizeLeft = 0;
let resizeTop = 0;
let borderLeft = 0;
let borderTop = 0;

function initCursor(e) {

    // console.log("Mouse down");
    // console.log(e.target);

    currentlyDragged = this;

    startX = e.clientX;
    startY = e.clientY;

    appRect = this.baseRect;

    updateQueue(this);
    applyQueue();

    if (e.target.className == "window-title") {

        console.log("button pressed in title bar");
        isDragging = true;
        return;

    }

    checkResize.bind(e.target);


    if (!borderLeft && !borderTop) {

        console.log("button pressed in iFrame");

    } else {

        console.log("button pressed on border at", startX, startY, "so actual start is ", startX + appRect.left, startY + appRect.top + 20);

       if (e.target.className != "app") isContainer = false;

        setResizeDirection();

    } 


}

function handleEnter() {

    isContainer = false;
    console.log("Button moved to window");

}

function handleLeave() {

    if (!currentlyDragged) {
        isContainer = true;
        console.log("Button moved to container");
    }

}

function handleCursor(pos) {

    if (currentlyDragged) {

        caller = pos.target;
        if (previousCaller !== caller) {
            console.log(previousCaller, caller);
            previousCaller = caller;
        }

        var dx = 0, dy = 0;

        if (!isContainer) {
            dx += appRect.left;
            dy += appRect.top + 20;
        }

        if (isResize) {
                
            var resizeX = (pos.clientX - dx - startX) * resizeLeft;
            var resizeY = (pos.clientY - dy - startY) * resizeTop;

            console.log(pos.clientX, pos.clientY, resizeX, resizeY, caller);

            if (resizeLeft === 1) {
                currentlyDragged.container.style.left = appRect.left + resizeX + "px";
                currentlyDragged.container.style.width = appRect.width - resizeX + "px";
            } else if (resizeLeft === -1) {
                currentlyDragged.container.style.width = appRect.width - resizeX + "px";
            }

            if (resizeTop === 1) {
                currentlyDragged.container.style.top = appRect.top + resizeY + "px";
                currentlyDragged.container.style.height = appRect.height - resizeY + "px";
            } else if (resizeTop === -1) {
                currentlyDragged.container.style.height = appRect.height - resizeY + "px";
            }
                

        }

        else if (isDragging) {

            currentlyDragged.container.style.left = pos.clientX - (startX - appRect.left) + "px";
            currentlyDragged.container.style.top = pos.clientY - (startY - appRect.top) + "px";

        } 

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

function setCursorStyle() {

    var firstLetter = (borderTop == 1) ? 'n' : (borderTop) ? 's' : '';
    var secondLetter = (borderLeft == 1) ? 'w' : (borderLeft) ? 'e' : '';
    var string = (firstLetter || secondLetter) ? firstLetter + secondLetter + "-resize" : "auto";
    this.style.cursor = string;

}

function setResizeDirection() {

    resizeLeft = borderLeft;
    resizeTop = borderTop;
    isResize = isBorder;

    // console.log(resizeLeft, resizeTop);

}

function checkResize(e) {

    var borders = this.getBoundingClientRect();

    var left = e.clientX - borders.left;
    var top = e.clientY - borders.top;

    var elementWidth = (this.style.width) ? this.style.width : window.getComputedStyle(this).width;
    var elementHeight = (this.style.height) ? this.style.height : window.getComputedStyle(this).height;

    elementWidth = elementWidth.slice(0, elementWidth.indexOf("p"));
    elementHeight = elementHeight.slice(0, elementHeight.indexOf("p"));

    var lewo = left < 5;
    var prawo = elementWidth - left < 5;
    var gora = top < 5;
    var dol = elementHeight - top < 5;

    isBorder = true;

    if (!currentlyDragged) {
        if (prawo) {
            borderLeft = -1;
            borderTop = gora ? 1 : dol ? -1 : 0;
        } else if (lewo) {
            borderLeft = 1;
            borderTop = gora ? 1 : dol ? -1 : 0;
        } else if (gora) {
            borderLeft = 0;
            borderTop = 1;
        } else if (dol) {
            borderLeft = 0;
            borderTop = -1;
        } else {
            borderLeft = 0;
            borderTop = 0;
            isBorder = false;
        }        
    }

    // console.log(borderLeft, borderTop, isBorder)

}