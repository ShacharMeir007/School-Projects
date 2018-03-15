//setting
var snakeX = 2;
var snakeY = 2;
var height = 30;
var width = 30;
var interval = 75;
var increment = 1;
var foodpoints = 4;
var start = false;
var lastGames = [1];
lastGames[0] = 0;
var personalBest = 0;

//game variables
var length = 2;
var tailX = [1];
var tailY = [1];
tailX[0] = snakeX;
tailY[0] = snakeY;
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


function run() {
    init();
}

function init() {
    if(document.getElementById("version").getAttribute("class") == "hacked"){
        document.getElementById("speed").value = 75;
        document.getElementById("wall").checked = true;
        document.getElementById("collapse").checked = true;
    }
    int = setInterval(gameLoop, interval);
    createMap();
    createSnake();
    createFood();
    for(var i = 0; i < length; i++){
        updateTail();
        snakeX++;
        set(snakeX, snakeY, "snake");
    }
}

function createMap() {
    document.write("<table class='gameTable' id='gameBord'>");

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

    if(direction != -1 && (key == 119 || key == 87) && running)
        tempdir = 0;
    //if key is S set direction down
    else if(direction != 0 && (key == 115 || key == 83) && running)
        tempdir = -1;
    //if key is A set direction left
    else if(direction != 2 && (key == 97 || key == 65) && running)
        tempdir = 1;
    //if key is D set direction right
    else if(direction != 1 && (key == 100 || key == 68) && running)
        tempdir = 2;
    if(!running && start)
        running = true;
    if(!start && (key == 100 || keey == 68)) {
        running = true;
        start = true;
        tempdir = 2;

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
    settings();
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
        endGame();
    }

    if(wall) {
        if (crashWall())
           endGame();
    }
    else
        wallSwitch();


    if(snakeX == foodX && snakeY == foodY){
        grow(increment);
        createFood();
        score += foodpoints * (75 / interval);
        updateScore(score);
    }
    set(snakeX, snakeY, "snakeHead");
    set(tailX[0], tailY[0], "snake");

    document.getElementById("score").innerHTML = "score: " + (score - (score % 1));
}

function endGame() {
    updateScore(score);


    snakeX = 1;
    snakeY = 2;
    height = 30;
    width = 30;
    increment = 1;
    foodpoints = 4;
    start = false;

//game variables
    length = 2;
    tailX = [snakeX];
    tailY = [snakeY];
    running = false;
    gameOver = false;
    direction = -1;//up = 0 , down = -1 , left = 1, right = 2
    score = 0;


    document.getElementById("score").innerHTML = "press SPACE to restart";
    emptyMap();

    for(var i = 0; i < length+1; i++){
        updateTail();
        snakeX++;
        set(snakeX, snakeY, "snake");
    }
}

function updateScore(s) {
    s = s - (s % 1);
    lastGames[lastGames.length] = s;
    if (s > personalBest) {
        personalBest = s;
        document.getElementById("best").innerHTML = "Best score: " + personalBest;
    }
}

function emptyMap() {
    for( var y = 0; y < height; y++) {
        for( var x = 0; x < width; x++){
            if(x == 0 || x == width -1 || y == 0 || y == height -1) {
                document.getElementById(x + "-" + y).setAttribute("class", "wall");
            }else {
                document.getElementById(x + "-" + y).setAttribute("class", "blank");
            }
        }
    }
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
        if(interval != document.getElementById(("speed").value)) {
            interval = document.getElementById("speed").value;
            clearInterval(int);
            int = setInterval(gameLoop, interval);
        }
    }else
    {
        collapse = true;
        wall= true;
        interval = 100;
    }
}

run();