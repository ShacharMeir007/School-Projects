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
    var mapSize = {w: 53, h: 25};
    mapSize.w += 2;
    mapSize.h += 2;
    //pixels
    var pxsize = {w: 13, h: 13};
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
    //system
    var running = false;
    //settings
    var wallCrash = false;
    var collapse = false;
    var intervalTime = 75;
    //graphics
    var rainbow = false;
    var disco = false;
}
//keys settings
{
    var pressedKeys = [0];
    var keysmemory = 0;
    //keys
    var up = 87;//w
    var down = 83;//s
    var right = 68;//d
    var left = 65;//a
}
function run() {
    if(document.getElementById("version").getAttribute("class") === "hacked"){
        document.getElementById("speed").value = 75;
        document.getElementById("wallCrash").checked = true;
        document.getElementById("collapse").checked = true;
        document.getElementById("rainbow").checked = false;
        document.getElementById("disco").checked = false;
    }
    createMap();
    restart();
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
//Main game loop
function gameLoop() {
    draw(false);
    if(running) {
    //while running ________
        updateTail();
        updateSnake();
        checkCollapse();
        checkWall();
        checkFood();
    //______________________
    }
    updateSettings();
    draw(true);
}
//snake
{
    function updateSnake() {
        //set direction by key
        if (keysmemory >= 0) {
            if (pressedKeys[0] === up && snake[0].direction !== 3)
                snake[0].direction = 1;//up
            else if (pressedKeys[0] === right && snake[0].direction !== 4)
                snake[0].direction = 2;//right
            else if (pressedKeys[0] === down && snake[0].direction !== 1)
                snake[0].direction = 3;//down
            else if (pressedKeys[0] === left && snake[0].direction !== 2)
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

    function checkFood() {
        if(snake[0].x === food.x && snake[0].y === food.y) {
            grow(1);
            updateScore(4);
            createFood();
        }
    }

    function checkCollapse() {
        if(getType(snake[0].x, snake[0].y) === "snake" && collapse){
            endGame();
        }
    }

    function checkWall() {
        if (getType(snake[0].x, snake[0].y) === "wall")
            switch (wallCrash) {
                case true:
                    endGame();
                    break;
                case  false:
                    wallSwitch();
                    break;
            }
    }

    function wallSwitch() {
        if(snake[0].x === 0)
            snake[0].x = mapSize.w-2;
        if(snake[0].x === mapSize.w-1)
            snake[0].x = 1;
        if(snake[0].y === 0)
            snake[0].y = mapSize.h-2;
        if(snake[0].y === mapSize.h-1)
            snake[0].y = 1;

    }

    function endGame() {
        running = false;
        clearInterval(interval);
        restart();
    }

    function restart() {
        score = 0;
        lastGame = [0];
        lastGame[0] = 0;
        running = false;

        length = 1;
        snake = [length];
        snake[0] = {x: 2, y: 2, direction: 2};

        updateData();
        updateScore(1);
        grow(2);
        for(var i = 0; i < length-1; i++) {
            updateTail();
            snake[0].x++;
        }
        createFood();
        interval = setInterval(gameLoop, intervalTime);
    }
}
//data
{
    function updateData() {
        document.getElementById("score").innerHTML = "Score: " + score;
        document.getElementById("best").innerHTML = "Best score: " + personalBest;
    }

    function updateScore(s) {
        score += (s % 1);
        lastGame[lastGame.length] = score;
        if (score > personalBest)
            personalBest = score;
    }

    function updateSettings() {
        if (document.getElementById("version").getAttribute("class") === "hacked") {

            //update collapse
            collapse = document.getElementById("collapse").checked;

            //update wallCrash
            wallCrash = document.getElementById("wallCrash").checked;

            //update interval time
            if (intervalTime !== document.getElementById(("speed").value)) {
                intervalTime = document.getElementById("speed").value;
                clearInterval(interval);
                interval = setInterval(gameLoop, intervalTime);
            }

            //update graphics
            rainbow = document.getElementById("rainbow").checked;
            disco = document.getElementById("disco").checked;
        } else {
            //settings
            collapse = true;
            wallCrash = true;
            intervalTime = 75;
            //graphics
            rainbow = false;
            disco = false;
        }
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


        for (var s = 1; s < snake.length; s++)
            if (snake[s].x === x && snake[s].y === y)
                return "snake";

        if(snake[0].x === x && snake[0].y === y)
            return "head";

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
//fill type var
    {
        var maxColor = 255;
        var minColor = 0;
        var maxAlpha = 1;
        var minAlpha = 0;
    }
    function draw(fill) {
        if (fill) {
            //settings
            {
                if (rainbow) {
                    maxColor = 0;
                    minColor = 1;
                } else {
                    maxColor = 255;
                    minColor = 0;
                }
                if (disco) {
                    maxAlpha = 0.3;
                    minAlpha = 1;
                } else {
                    maxAlpha = 1;
                    minAlpha = 0;
                }
            }
            //snake tail
            for (var i = 1; i < snake.length; i++) {
                Fill(snake[i].x, snake[i].y, "rgba(" +
                    ((i * 2) * minColor) + "," +
                    (255 - (i * 2) * minColor + maxColor) + "," +
                    ((i * 5) * minColor) + "," +
                    (((i+1) % 2) * minAlpha + maxAlpha) + ")");
            }
            //food
            Fill(food.x, food.y, "#ff0000");
            //wall
            for (var n = 1; n < wall.length; n++) {
                Fill(wall[n].x, wall[n].y, "#bbbbbb");
            }
            //snake head
            Fill(snake[0].x, snake[0].y, "#00fff0");
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

