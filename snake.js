// Poängberäkning
// Efter 5 godisar = 5 poäng, gör ormen ett steg längre


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
var pieceSize = 40;
var points = 0;
var increasSnakeLength = false;
var scoreElement;

function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 600;
    scoreElement = document.getElementById('score');
    loadImages();
    initSnake();
    initCandy();
    gameCycle();
}  

function detectEatingCandy() {
    if(candyX == first.x && candyY == first.y) {
        ++points;
        //document.write(points);
        if (points % 5 == 0){
            increasSnakeLength = true;
        }
        //poäng
        // if 5 gör ormen längre
        initCandy();
    }
} 

function initCandy(){
    candyX = Math.floor((Math.random() * canvas.width / pieceSize ));
    candyY = Math.floor((Math.random() * canvas.height / pieceSize ));
}

function initSnake() {
    first = new Coord(2,0);
    first.setNext(new Coord(1,0));
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
    handleCanvasEdges();
    detectEatingCandy();
    
    if (!increasSnakeLength) {
        removeOldTail();
    } else {
        increasSnakeLength = false;
    }

    setTimeout("gameCycle()", DELAY);
}

document.onkeydown = function(event) {
    if(event.keyCode == 39) {
        handleRightArrowKeyboardEvent();
    }
    else if (event.keyCode == 37) {
        handleLeftArrowKeyboardEvent();
    }
}

function handleCanvasEdges() {
    if (first.x == canvas.width / pieceSize) {
        first.x = 0;
    }
    else if (first.x == -1) {
        first.x = canvas.width / pieceSize - 1;
    }
    else if (first.y == -1) {
        first.y = canvas.height / pieceSize - 1;
    }
    else if (first.y == canvas.height / pieceSize) {
        first.y = 0;
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
    var newHead = new Coord(first.x + xDirection, first.y + yDirection);
    newHead.next = first;
    first = newHead;
}

function doDrawing() {
    scoreElement.innerHTML = "Score: " + points;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawSnake();

    ctx.drawImage(snakeCandy, candyX * pieceSize, candyY * pieceSize);
}

function drawSnake() {
    var current = first;
    do {
        ctx.drawImage(snakeBody, current.x * pieceSize, current.y * pieceSize);
        current = current.next;
    } while (current != null);
}

