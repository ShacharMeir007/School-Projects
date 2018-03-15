//setting
var snakeX = 2;
var snakeY = 2;
var height = 32;
var width = 30;
var interval = 100;
var increment = 1;
var foodpoints = 4;
var start = false;

//game variables
var length = 2;
var tailX = [snakeX];
var tailY = [snakeY];
var foodX;
var foodY;
var running = false;
var gameOver = false;
var direction = -1;//up = 0 , down = -1 , left = 1, right = 2
var int;
var tempdir = direction;
var score = 0;
var collapse=true;
var wall=true;


/**
* entry point of the game.
*/
function run() {
    init();
}

function init() {
    if(document.getElementById("version").getAttribute("class") == "hacked"){
        document.getElementById("speed").value = 100;
        document.getElementById("wall").checked = true;
        document.getElementById("collapse").checked = true;
    }
    createMap();
    createSnake();
    createFood();
}

function createMap() {
    document.write("<table>");

    for( var y = 0; y < height; y++) {
        document.write("<tr>");
        for( var x = 0; x < width; x++){
            if(x == 0 || x == width -1 || y == 0 || y == height -1) {
                document.write("<td class='wall' id='" + x + "-" + y + "'></td>");
            }else {
                document.write("<td class='blank' id='" + x + "-" + y + "'></td>");
            }
        }
        document.write("</tr>");
    }

    document.write("</table>");
}

function createSnake(){
    set(snakeX, snakeY, "snake");
}

function get(x, y) {
    return document.getElementById(x + "-" + y);
}

function set(x, y, value) {
    get(x, y).setAttribute("class" , value);
}

function rand(min, max) {
    return Math.floor(Math.random()*(max-min) + min)
}

function getType(x, y) {
    return get(x, y).getAttribute("class");
}

function createFood() {
    var found = false;
    while(!found && (length < (width - 2) * (height - 2) + 1)){
        var FoodX = rand(1, width-1);
        var FoodY = rand(1, height-1);
        if(getType(FoodX, FoodY) == "blank"){
            found = true;
        }
    }
    set(FoodX, FoodY, "food");
    foodX = FoodX;
    foodY = FoodY;
}

window.addEventListener("keypress", function key(event){
    //if key is W set direction up
    var key = event.keyCode;
    if(key == 0)//make sure that key work
        key = event.which;

    if(direction != -1 && (key == 119 || key == 87))
        tempdir = 0;
    //if key is S set direction down
    else if(direction != 0 && (key == 115 || key == 83))
        tempdir = -1;
    //if key is A set direction left
    else if(direction != 2 && (key == 97 || key == 65))
        tempdir = 1;
    //if key is D set direction right
    else if(direction != 1 && (key == 100 || key == 68))
        tempdir = 2;
    if(!running) {
        running = true;
        if (!start && (key == 100 || keey == 68)) {
            settings();
            int = setInterval(gameLoop, interval);
            start = true;
            tempdir = 2;
        }
    }
    else if(key == 32)
        running = false;
});


function gameLoop() {
    if(running && !gameOver)
        update();
    else if(gameOver)
        clearInterval(int);
}

function update() {
    direction = tempdir;
    updateTail();
    set(tailX[length],tailY[length],"blank");
    resetWall();
    set(foodX, foodY, "food");
    //updates the position of the snake according to the direction
    switch (direction){
        case 0:
            snakeY--;
            break;
        case -1:
            snakeY++;
            break;
        case 1:
            snakeX--;
            break;
        case 2:
            snakeX++;
            break;
    }

    if(crashSnake()&&collapse){
        gameOver = true;
    }

    if(wall) {
        if (crashWall())
            gameOver = true;
    }
    else
        wallSwitch();


    if(snakeX == foodX && snakeY == foodY){
        grow(increment);
        createFood();
        score += foodpoints;
    }
    set(snakeX, snakeY, "snake");

    document.getElementById("score").innerHTML = "score: " + score;
}

function grow(n) {
    length += n;
    /*for( var i = length - increment; i < length; i++){
        snakeY[i] = snakeY[length - increment - 1];
        snakeX[i] = snakeX[length - increment - 1];
    }*/
}

function updateTail() {
    for(var i = length; i > 0; i--){
        tailY[i] = tailY[i-1];
        tailX[i] = tailX[i-1];
    }
    tailX[0] = snakeX;
    tailY[0] = snakeY;
}

function crashWall() {
    if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1)
        return true;
    else
        return false;
}

function wallSwitch() {
    if(snakeY == 0 && direction == 0)
        snakeY = height - 2;
    if(snakeY == (height - 1) && direction == -1)
        snakeY = 1;
    if(snakeX == 0 && direction == 1)
        snakeX = width - 2;
    if(snakeX == (width - 1) && direction == 2)
        snakeX = 1;
}

function resetWall() {
    for( var y = 0; y < height; y++)
        for( var x = 0; x < width; x++)
            if(x == 0 || x == width -1 || y == 0 || y == height -1)
                set(x, y, "wall");
}

function crashSnake(){
    for(var i = tailX.length-1; i >=0; i--){
        if(snakeX == tailX[i] && snakeY == tailY[i]){
            return true;
            break;
        }
    }
    return false;
}

function settings() {
    if(document.getElementById("version").getAttribute("class") == "hacked"){
        collapse = document.getElementById("collapse").checked;
        wall = document.getElementById("wall").checked;
        interval = document.getElementById("speed").value;
    }else
    {
        collapse = true;
        wall= true;
        interval = 100;
    }
}

run();