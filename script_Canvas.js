var fps = 24;
canvas = document.getElementById("Canvas");
context = canvas.getContext("2d");
var img = new Image();
img.src = "img/cartes.png";
var Number = 0; 
var NumberOfCkicks = 0;
var CardSpCode = null;
var Sp = null;
var NumberOfAllOpens = 0;
var canvasCovered = false;

var cards  = {
    0:  { x : 0, y : 0 },
    1:  { x : 192, y : 0 },
    2:  { x : 384, y: 0 },
    3:  { x: 575,  y: 0 },
    4:  { x: 768,  y: 0 },
    5:  { x: 960,  y: 0 },
    6:  { x: 1151, y: 0 },
    7:  { x: 1343, y: 0 },
    8:  { x: 0,    y: 0 },
    9:  { x: 192,  y: 0 },
    10: { x: 384,  y: 0 },
    11: { x: 575,  y: 0 },
    12: { x: 768,  y: 0 },
    13: { x: 960,  y: 0 },
    14: { x: 1151, y: 0 },
    15: { x: 1343, y: 0 }
};
var places = {
    0:  { x: 5,   y: 0 },
    1:  { x: 196, y: 0 },
    2:  { x: 387, y: 0 },
    3:  { x: 578, y: 0 },
    4:  { x: 5,   y: 280 },
    5:  { x: 196, y: 280 },
    6:  { x: 387, y: 280 },
    7:  { x: 578, y: 280 },
    8:  { x: 5,   y: 560 },
    9:  { x: 196, y: 560 },
    10: { x: 387, y: 560 },
    11: { x: 578, y: 560 },
    12: { x: 5,   y: 840 },
    13: { x: 196, y: 840 },
    14: { x: 387, y: 840 },
    15: { x: 578, y: 840 }
}

var randomCardPlaces = [];

for (var i = 0; i <= 15; i++) {
    randomCardPlaces.push(places[i]);
}
randomCardPlaces.sort(function() {
    return 0.5 - Math.random()
});

var StartKey = new start();
console.log(StartKey.position);

img.onload = function() {
    for (var i = 0; i <= 15; i++) {
        Cardss[i].state = CARD_OPENED_STATE;
        Cardss[i].render();
    }
    setTimeout(CloseOpenCards, 2000);
}

var CARD_OPENED_STATE = 1;
var CARD_CLOSED_STATE = 0;
var CARD_ALLOPENED_STATE = 2;

var CardF = function(x0, y0, i) {
    this.cardCode = i;
    this.x = x0;
    this.y = y0;
    this.width = 190;
    this.height = 280;
    this.state = CARD_CLOSED_STATE;
    this.onClick = function() {
        this.render();
    }
    this.render = function() {
        console.log("state" + this.state);
        if (this.state == CARD_OPENED_STATE) {
            context.drawImage(img, cards[i].x, cards[i].y, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        if (this.state == CARD_CLOSED_STATE) {
            context.drawImage(img, 390, 1120, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        if (this.state == CARD_ALLOPENED_STATE) {
            context.drawImage(img, cards[i].x, cards[i].y, this.width, this.height, this.x, this.y, this.width, this.height);
            context.fillStyle = "rgba(255, 0, 0, 0.5)";
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}



//Массив из карт
var Cardss = [];

for (var i = 0; i < 8; i++) {
    var card1 = new CardF(randomCardPlaces[i].x, randomCardPlaces[i].y, i);
    var card2 = new CardF(randomCardPlaces[15 - i].x, randomCardPlaces[15 - i].y, i);
    Cardss.push(card1);
    Cardss.push(card2);
};

//Нажатие на карты
canvas.onclick = function() {
    if (canvasCovered) {
        return;
    }
    var mouseX = event.pageX - canvas.offsetLeft;
    var mouseY = event.pageY - canvas.offsetTop;
    if ((mouseX > StartKey.x) && (mouseX < (StartKey.x + StartKey.width)) && (mouseY > StartKey.y) && (mouseY < (StartKey.y + StartKey.height))) {
        StartKey.position = true;
        var timer = new Timer();
        var lastTime = new Date().getTime();

        function gameLoop() {
            if (gameWin.Number == 10) {
                return;
            }
            if (gameLose.Number == 10) {
                return;
            }
            var currentTime = new Date().getTime();
            var deltaTime = currentTime - lastTime;
            timer.update(deltaTime);
            timer.render();
            lastTime = currentTime;
        }
        var gameInterval = setInterval(gameLoop, 1000 / fps);
    }
    if (StartKey.position == false) {
        return;
    }
    for (var i = 0; i <= 15; i++) {
        if ((mouseX > Cardss[i].x) && (mouseX < (Cardss[i].x + 190)) && (mouseY > Cardss[i].y) && (mouseY < (Cardss[i].y + 280)) && (Cardss[i].state != CARD_OPENED_STATE) && ((Cardss[i].state != CARD_ALLOPENED_STATE))) {
            Cardss[i].state = CARD_OPENED_STATE;
            Cardss[i].onClick();
            Number++;
            if (CardSpCode == Cardss[i].cardCode) {
                Cardss[i].state = CARD_ALLOPENED_STATE;
                Cardss[i].onClick();
                Cardss[sp].state = CARD_ALLOPENED_STATE;
                Cardss[sp].onClick();
                sp = null;
                CardSpCode = null;
                Number = 0;
            } else {
                CardSpCode = Cardss[i].cardCode;
                sp = i;
            }
            NumberOfCkicks++;
            context.fillStyle = "#FFFFFF"; //
            context.fillRect(930, 430, 200, 200);
            context.fillStyle = "#00F";
            context.strokeStyle = "#F00";
            context.font = '70px Arial';
            context.strokeText(NumberOfCkicks, 1000, 500);
        }

    }
    if (Number == 2) {
        canvasCovered = true;
        setTimeout(rotateCards, 1000);
        Number = 0;
        sp = null;
        CardSpCode = null;
    }
    for (var i = 0; i <= 15; i++) {
        if (Cardss[i].state == CARD_ALLOPENED_STATE) {
            NumberOfAllOpens++;
            if (NumberOfAllOpens == 16) {
                gameWin();
                gameWin.Number = 10;
            }
        }
    }
    NumberOfAllOpens = 0;
}



function Timer() {
    context.lineWidth = 8;
    context.strokeStyle = 'rgba(204,0,65,1)';
    this.x = 1000;
    this.y = 200;
    this.radius = 100;
    this.rotateDirection = false;
    this.startAngle = 10 * Math.PI / 7;
    this.endAngle = 2 * Math.PI / 1.0;
    this.duration = 10000;
    this.Number = null;
    this.update = function(deltaTime) {
        var time = deltaTime / this.duration;
        this.endAngle = this.startAngle + (this.endAngle - this.startAngle) + time;
        if ((this.endAngle > 12.5) && (gameWin.Number != 10)) {
            gameLose(); //Поражение
            gameLose.Number = 10;
        }
    }

    this.render = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle - Math.PI / 2, this.rotateDirection);
        context.stroke();
    }
}




function rotateCards() {
    for (var i = 0; i <= 15; i++) {
        if (Cardss[i].state == CARD_OPENED_STATE) {
            Cardss[i].state = CARD_CLOSED_STATE;
            Cardss[i].onClick();
        }
    }
    Number = 0;
    canvasCovered = false;
}

function gameLose() {
    canvasCovered = true;
    context.clearRect(0, 0, 1200, 1200);
    context.fillStyle = "#00F";
    context.strokeStyle = "#F00";
    context.font = '100px Arial';
    context.strokeText("You LOSE", 300, 300);
    this.Number = null;
	var Rest = new restart();
}

function gameWin() {
    canvasCovered = true;
    context.clearRect(0, 0, 1200, 1200);
    context.fillStyle = "#00F";
    context.strokeStyle = "#F00";
    context.font = '100px Arial';
    context.strokeText("You WON", 300, 300);
    context.strokeText("Score : " + NumberOfCkicks, 300, 450);
    this.Number = null;
}



function restart(){
	this.x = 1000;
    this.y = 950;
    this.width = 200;
    this.height = 100;
    this.position = false;
    context.fillStyle = "#00FF00";
	context.font = '40px Arial';
    context.fillRect(this.x, this.y, this.width, this.height);
	context.strokeText("RESTART", 1010, 1020);
}

function nextLvl(){
	
}


function start() {
    this.x = 1000;
    this.y = 800;
    this.width = 200;
    this.height = 100;
    this.position = false;
    context.fillStyle = "#00FF00";
	context.font = '50px Arial';
    context.fillRect(this.x, this.y, this.width, this.height);
	context.strokeText("START", 1020, 870);
}

function CloseOpenCards() {
    for (var i = 0; i <= 15; i++) {
        Cardss[i].state = CARD_CLOSED_STATE;
        Cardss[i].render();
    }
}
