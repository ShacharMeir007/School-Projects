//canvas settings
{
    var canvas = document.getElementById("snakeCanvas");
    canvas.width = 1;
    canvas.height = 1;
    var c = canvas.getContext('2d');
}
//objects
{
    //map
    var mapSize = {w: 50, h: 30};
    mapSize.w += 2;
    mapSize.h += 2;
    //pixels
    var pxsize = {w: 15, h: 15};
    var padding = {w: 1, h: 1};
    //snake
    var length = 1;
    var snake = [length];
    snake[0] = {x: 1, y: 1, direction: 2};
    //food
    var food = {x: 0, y: 0};
    //wall
    var wall = [length];
    wall[0] = {x: 0, y: 0};
}
//var
{
    //score
    var score = 0;
    var lastGame = [0];
    lastGame[0] = 0;
    var personalBest = 0;
    //key
    var pressedKeys = [0];
    var keysmemory = 0;
    //system
    var running = false;
}

function run() {
    createMap();
    updateData();
    updateScore(1);
    grow(2);
    for(var i = 0; i < length-1; i++) {
        updateTail();
        snake[0].x++;
    }
    createFood();
    interval = setInterval(gameLoop, 75);
}
//creations
{
    function createMap() {
        canvas.width = pxsize.w * mapSize.w;
        canvas.height = pxsize.h * mapSize.h;

        for (var x = 0; x < mapSize.w; x++)
            for (var y = 0; y < mapSize.h; y++)
                if (x === 0 || y === 0 || x === mapSize.w - 1 || y === mapSize.h - 1)
                    wall[wall.length] = {x: x, y: y};
    }

    function createFood() {
        var found = false;
        var foodTry = {x: 5, y: 5};

        while (!found && snake.length < (mapSize.w - 2) * (mapSize.h - 2)) {
            foodTry.x = rand(1, mapSize.w - 1);
            foodTry.y = rand(1, mapSize.h - 1);
            if (getType(foodTry.x, foodTry.y) === "empty") {
                found = true;
                food.x = foodTry.x;
                food.y = foodTry.y;
            }
        }
    }
}
//main game loop
function gameLoop() {
    draw(false);
    if(running) {
    //while running ________
        updateTail();
        updateSnake();
    //______________________
    }
    draw(true);
}
//snake
{
    function updateSnake() {
        //set direction by key
        if (keysmemory >= 0) {
            if (pressedKeys[0] === 38 && snake[0].direction !== 3)
                snake[0].direction = 1;//up
            else if (pressedKeys[0] === 39 && snake[0].direction !== 4)
                snake[0].direction = 2;//right
            else if (pressedKeys[0] === 40 && snake[0].direction !== 1)
                snake[0].direction = 3;//down
            else if (pressedKeys[0] === 37 && snake[0].direction !== 2)
                snake[0].direction = 4;//left
            for (var i = 0; i < pressedKeys.length; i++)
                pressedKeys[i] = pressedKeys[i + 1];
            keysmemory--;
        }
        //move by direction
        switch (snake[0].direction) {
            case 1:
                snake[0].y--;
                break;
            case 2:
                snake[0].x++;
                break;
            case 3:
                snake[0].y++;
                break;
            case 4:
                snake[0].x--;
                break;
        }
    }

    function updateTail() {
        for (var i = snake.length - 1; i > 0; i--) {
            snake[i] = {x: snake[i - 1].x, y: snake[i - 1].y, direction: -1};
        }

    }

    function grow(l) {
        for (var i = 0; i < l; i++)
            snake[length + i] = {x: -1, y: i, direction: -1};
        length += l;
    }
}
//data
{
    function updateData() {
        //document.getElementById("score").innerHTML = "Score: " + score;
        //document.getElementById("best").innerHTML = "Best score: " + personalBest;
    }

    function updateScore(s) {
        s = s - (s % 1);
        lastGame[lastGame.length] = s;
        score = lastGame[lastGame.length];
        if (s > personalBest)
            personalBest = s;
    }
}
//additional function
{
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    function getType(x, y) {
        for (var w = 0; w < wall.length; w++)
            if (wall[w].x === x && wall[w].y === y)
                return "wall";

        for (var s = 0; s < snake.length; s++)
            if (snake[s].x === x && snake[s].y === y)
                return "snake";

        if (food.x === x && food.y === y)
            return "food";

        return "empty";
    }

    function Fill(x, y, color) {
        c.fillStyle = color;
        c.fillRect(
            /*x:*/  (x * pxsize.w) + padding.w,
            /*y:*/  (y * pxsize.h) + padding.h,
            /*w:*/  pxsize.w - padding.w,
            /*h:*/  pxsize.h - padding.h);
    }

    function draw(fill) {
        if (fill) {
            Fill(snake[0].x, snake[0].y, "#00fff0");
            for (var i = 1; i < snake.length; i++)
                Fill(snake[i].x, snake[i].y, "#00ff00");
            Fill(food.x, food.y, "#ff0000");
            for (var n = 1; n < wall.length; n++)
                Fill(wall[n].x, wall[n].y, "#bbbbbb");
        } else {
            c.clearRect(0, 0, canvas.width, canvas.height);
        }

    }
}
//key events
{
    window.addEventListener("keydown", downkey, false);
    function downkey(e) {
        if (!running && e.keyCode !== 32)
            running = true;

        if (e.keyCode === 32 && running)
            running = false;

        if(pressedKeys[keysmemory] !== e.keyCode && keysmemory < 2) {
            keysmemory++;
            pressedKeys[keysmemory] = e.keyCode;
        }
    }
}
run();

