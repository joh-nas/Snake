class Coord {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.next = null;
    }

    setNext(coord){
        this.next = coord;
    }
}

var canvas;
var ctx;
var snakeBody;
var snakeCandy;
var xDirection = 1;
var yDirection = 0;
const DELAY = 140;
var first;

function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    
    loadImages();
    initSnake();
    gameCycle();
}    

function initSnake() {
    first = new Coord(80,0);
    first.setNext(new Coord(40,0));
    first.next.setNext(new Coord(0,0));
}

function loadImages() {
    
    snakeBody = new Image();
    snakeBody.src = 'snakeBody.png';    
    
    snakeCandy = new Image();
    snakeCandy.src = 'snakeCandy.png'; 
}

function gameCycle() {
    doDrawing();
    addNewHead();
    removeOldTail();

    setTimeout("gameCycle()", DELAY);
}

document.onkeydown = function(event){
    if(event.keyCode == 39) {
        handleRightArrowKeyboardEvent();
    }
    else if (event.keyCode == 37) {
        handleLeftArrowKeyboardEvent();
    }
}

function handleLeftArrowKeyboardEvent() {
    if (xDirection == 1) {
        xDirection = 0;
        yDirection = -1;
    }
    else if (xDirection == -1) {
        xDirection = 0;
        yDirection = 1;
    }
    else if (yDirection == -1) {
        xDirection = -1;
        yDirection = 0;
    }
    else if (yDirection == 1) {
        xDirection = 1;
        yDirection = 0;
    }
}

function handleRightArrowKeyboardEvent() {
    if (xDirection == 1) {
        xDirection = 0;
        yDirection = 1;
    }
    else if (xDirection == -1) {
        xDirection = 0;
        yDirection = -1;
    }
    else if (yDirection == -1) {
        xDirection = 1;
        yDirection = 0;
    }
    else if (yDirection == 1) {
        xDirection = -1;
        yDirection = 0;
    }
}

function removeOldTail(){
    var current = first;
    while(current.next != null){
        prev = current ;
        current = current.next;
    }

    prev.next = null;
}

function addNewHead() {
    var newHead = new Coord(first.x + 40 * xDirection, first.y + 40 * yDirection);
    newHead.next = first;
    first = newHead;
}

function doDrawing() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawSnake();

    ctx.drawImage(snakeCandy, 400, 400);
}

function drawSnake() {
    var current = first;
    do {
        ctx.drawImage(snakeBody, current.x, current.y);
        current = current.next;
    } while (current != null);
}

