var canvas = document.getElementById("pongCanvas");
canvas.width = 500;
canvas.height = 300;
var c = canvas.getContext('2d');
c.fillStyle = "#00b000";

var interval;
var plate_size = {width: 6, height: 50};
var platePosision = 5;
var keys = [];
var running = false;
var AItargetY = 0;
var score = 0;
var goalPoint = 4;
var lastGames = [0];
var personalBest = 0;

var Kup = 87;//w
var Kdown = 83;//s

var Lplate = {
    x:platePosision,
    y:10,
    w:plate_size.width,
    h:plate_size.height,
    speed: 6,
    direction: 0};
var Rplate = {
    x:canvas.width - (platePosision + plate_size.width),
    y:0,
    w:plate_size.width,
    h:plate_size.height,
    speed: 5,
    direction: 0};
var ball = {x:canvas.width - (platePosision + plate_size.width), y:plate_size.width/2, w:5, h:5, Xdirection:-1, Ydirection:1, speed:5, YspeedBoost:0.7};

function run() {
    interval = setInterval(gameLoop, 50);
}

function gameLoop() {
    draw(false);
    if(running) {

        updateBall();
        updatePlayer();
        updateAI();
        updateData();

    }
    draw(true)
}

function updateData() {
    document.getElementById("score").innerHTML = "Score: " + score;
}

function updatePlayer() {
    //set direction by keys
    {
        if(keys[Kup])
            Lplate.direction = -1;
        else if(keys[Kdown])
            Lplate.direction = 1;
        else
            Lplate.direction = 0;
    }
    //move by direction
    switch (Lplate.direction){
        case 1:
            Lplate.y += Lplate.speed;
            break;
        case -1:
            Lplate.y -= Lplate.speed;
            break;
    }
}

function updateAI() {
    AItargetY = ball.y + ball.h/2 - Rplate.h/2;
    //set direction by target
    {
        if(AItargetY > Rplate.y + Rplate.speed*2)
            Rplate.direction = 1;
        else if(AItargetY < Rplate.y - Rplate.speed*2)
            Rplate.direction = -1;
        else Rplate.direction = 0;
    }
    //move by direction
    switch (Rplate.direction){
        case 1:
            Rplate.y += Rplate.speed;
            break;
        case -1:
            Rplate.y -= Rplate.speed;
            break;
    }

    //Rplate.y = Math.floor(AItargetY);
}

function updateBall() {
    //move the ball by direction
    {
        if (ball.Xdirection === 1)
            ball.x += ball.speed;
        if (ball.Xdirection === -1)
            ball.x -= ball.speed;
        if (ball.Ydirection === 1)
            ball.y += Math.floor(ball.speed * ball.YspeedBoost);
        if (ball.Ydirection === -1)
            ball.y -= Math.floor(ball.speed * ball.YspeedBoost);
    }
    //change direction by max & min Y
    {
        if (ball.y < 0) {
            ball.Ydirection = 1;
            ball.y += Math.floor(ball.YspeedBoost * ball.speed * 2);
        }
        if ((ball.y + ball.h) > canvas.height) {
            ball.Ydirection = -1;
            ball.y -= Math.floor(ball.YspeedBoost * ball.speed * 2);
        }
    }
    //get points
    {
        if (ball.x < 0) {
            ball.x += ball.speed;
            ball.Xdirection = 1;
            ball.Ydirection = 0;
            updateScore(-goalPoint);
            if(score < 0) {
                lastGames[lastGames.length] = 0;
                updateScore(0);
            }
        }
        if ((ball.x + ball.w) > canvas.width) {
            ball.x -= ball.speed;
            ball.Xdirection = -1;
            ball.Ydirection = 0;
            updateScore(goalPoint);
        }
    }
    //touching players
    {
        //Left player
        if (ball.x < (Lplate.x + Lplate.w) && (ball.y + ball.h) > Lplate.y && ball.y < (Lplate.y + Lplate.h)) {
            ball.x += ball.speed;
            ball.Xdirection = 1;
            ball.YspeedBoost = Math.abs( (ball.y - (Lplate.y + Lplate.h/2)) / (Lplate.h/2) * 1.2 );
            switch (Lplate.direction){
                case  1: ball.Ydirection =  1; ball.YspeedBoost*= 1.5; break;
                case -1: ball.Ydirection = -1; ball.YspeedBoost*= 1.5; break;
            }
        }
        //Right AI
        if (ball.x + ball.w > Rplate.x && (ball.y + ball.h) > Rplate.y && ball.y < (Rplate.y + Rplate.h)) {
            ball.x -= ball.speed;
            ball.Xdirection = -1;
            ball.YspeedBoost = Math.abs( (ball.y - (Rplate.y + Rplate.h/2)) / (Rplate.h/2) * 1.7 );
            switch (Rplate.direction){
                case  1: ball.Ydirection =  1; ball.YspeedBoost*= 1.3; break;
                case -1: ball.Ydirection = -1; ball.YspeedBoost*= 1.3; break;
            }
        }
    }
}

function draw(fill) {
    if(fill){
        c.fillRect(ball.x, ball.y, ball.w, ball.h);
        c.fillRect(Lplate.x, Lplate.y, Lplate.w, Lplate.h);
        c.fillRect(Rplate.x, Rplate.y, Rplate.w, Rplate.h);
    }else{
        c.clearRect(ball.x, ball.y, ball.w, ball.h);
        c.clearRect(Lplate.x, Lplate.y, Lplate.w, Lplate.h);
        c.clearRect(Rplate.x, Rplate.y, Rplate.w, Rplate.h);
    }

}
function updateScore(s) {
    s = s - (s % 1);
    lastGames[lastGames.length] = s;
    score = lastGames[lastGames.length];
    if (s > personalBest) {
        personalBest = s;
        document.getElementById("best").innerHTML = "Best score: " + personalBest;
    }
}

//key events
{
    window.addEventListener("keydown", downkey, false);
    function downkey(e) {
        keys[e.keyCode] = true;

        if (!running && e.keyCode !== 32)
            running = true;

        if (e.keyCode === 32 && running)
            running = false;
    }
    window.addEventListener("keyup", upkey, false);
    function upkey(e) {
        keys[e.keyCode] = false;
    }
}
run();