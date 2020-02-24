const north = {dx:  0, dy: -1}; // from z.B. (x, 5) to (x, 4) ^
const east  = {dx:  1, dy:  0}; // right
const south = {dx:  0, dy:  1}; // down
const west  = {dx: -1, dy:  0}; // left

let direction = north; 

const clockwise = [north, east, south, west, north]; // from one to each other -> next steps clockwise
const countercw = [north, west, south, east, north]; // gegen Uhrzeigersinn

let snake = [
    {x: 10, y: 5}, // startposition
    {x: 10, y: 6},
    {x: 10, y: 7},
    {x: 10, y: 8},
];
let food = {x: 15, y: 15}; // first position of food

const snakeEquals = (a, b) => a.x === b.x && a.y === b.y;

function changeDirection(orientation) {
    direction = orientation[orientation.indexOf(direction) + 1];
}

/* Game loop */
function start() {
    const canvas  = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const rightArrow = 39;
    const leftArrow  = 37;
    window.onkeydown = event => {
        const orientation = (event.keyCode === rightArrow) ? clockwise : countercw; // if right arrow -> Uhrzeigersinn
        changeDirection(orientation);
    };

    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 5);
}

/* Calculate the next Board */
function nextBoard() {
    const maxX = 20;
    const maxY = 20;
    const oldHead = snake[0];

    function inBounds(x, max) {
        if (x < 0)   { return max - 1 }
        if (x > max) { return 0 }
        return x
    }

    // calculate the new head
    const head = {
        x: inBounds(oldHead.x + direction.dx, maxX),
        y: inBounds(oldHead.y + direction.dy, maxY)
    };

    if (snakeEquals(food, head)) {  // have we found any food?
        food.x = Math.floor(Math.random() * 20);   // place new food at random location
        food.y = Math.floor(Math.random() * 20);
    } else { // no food found => no growth despite new head 
        snake.pop(); // remove last element
    }
    snake.unshift(head); // put head at front of the list
}

function display(context) {
    // clear
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // draw all elements
    context.fillStyle = "cyan";
    snake.forEach(element =>
        fillBox(context, element)
    );
    context.fillStyle = "green";
    fillBox(context, snake[0]);
    // draw food
    context.fillStyle = "red";
    fillBox(context, food);
}

function fillBox(context, element) {
    context.fillRect(element.x * 20 + 1, element.y * 20 + 1, 18, 18);
}


