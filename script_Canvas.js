var fps = 30;
canvas = document.getElementById("Canvas");
context = canvas.getContext("2d");
var img = new Image();
img.src = "img/cartes.png";
var Number = 0;//Подсчет нажатий на канвас

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
places = {
    1:  { x: 5,   y: 0 },
    2:  { x: 196, y: 0 },
    3:  { x: 387, y: 0 },
    4:  { x: 578, y: 0 },
    5:  { x: 5,   y: 280 },
    6:  { x: 196, y: 280 },
    7:  { x: 387, y: 280 },
    8:  { x: 578, y: 280 },
    9:  { x: 5,   y: 560 },
    10: { x: 196, y: 560 },
    11: { x: 387, y: 560 },
    12: { x: 578, y: 560 },
    13: { x: 5,   y: 840 },
    14: { x: 196, y: 840 },
    15: { x: 387, y: 840 },
    16: { x: 578, y: 840 }
}

var randomCardPlaces = [];

for (var i = 1; i <= 16; i++){
 randomCardPlaces.push(places[i]);
}
randomCardPlaces.sort(function() {return 0.5 - Math.random()});



var CARD_OPENED_STATE = 1;
var CARD_CLOSED_STATE = 1;

 
var CardF = function(x0,y0,i)
{
    this.cardCode = i;
    this.x = x0;
    this.y = y0;
    this.width = 190;
    this.height = 280;
    this.state = CARD_CLOSED_STATE;
    this.onClick = function(this.x,this,y,this,this.width,this.height,this.state)
    {
        if (this.state == CARD_OPENED_STATE)
        {
          context.drawImage(img, cards[i].x, cards[i].y, this.width, this.height, this.x, this.y, this.width, this.height); 
        }
        else
        {
          context.drawImage(img, 390, 1120, this.width, this.height, this.x, this.y, this.width, this.height);
        }        
    }
}  


    var Cardss = [];

    for (var i = 0; i < 8; i++)
    {
        var card1 = CardF(randomCardPlaces[i].x, randomCardPlaces[i].y, i);
		
        var card2 = new CardF(randomCardPlaces[15 - i].x, randomCardPlaces[15 - i].y, i);
		
        Cardss.push(card1);
        Cardss.push(card2);        
    };
	
	
canvas.onclick = function() {
	var mouseX =  event.pageX - canvas.offsetLeft;
	var mouseY =  event.pageY - canvas.offsetTop;
	console.log(mouseX);
	console.log(mouseY);
	Number++;
	for (var i = 0; i < 16;i++){
	    if ((mouseX > Cardss[i].x) && (mouseX < (Cardss[i].x + 190)) && (mouseY > Cardss[i].y) && (mouseY < (Cardss[i].y + 280)))
		{
			Cardss[i].state = CARD_OPENED_STATE;
		}
	}
}


var startAngle = 10 * Math.PI / 7;
var endAngle = 2 * Math.PI / 1.0;
var x = 1000;
var y = 200;
var radius = 100;
var rotateDirection = false;
var duration = 10000;
function Timer()
{
	/*
    this.x = 1000;
    this.y = 200;
    this.radius = 100;
    this.rotateDirection = false;
    this.startAngle = 10 * Math.PI / 7;
    this.endAngle = 2 * Math.PI / 1.0;
    this.duration = 100;
	*/
    this.update = function(deltaTime)
    {
        var time =(new Date().getTime() - startTime)  / duration;
        endAngle = (endAngle - startAngle) * time;
		//console.log(time);
    }
    
    this.render = function()
    {
        context.lineWidth = 8;
        context.strokeStyle = 'rgba(204,0,65,1)';
        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle, rotateDirection);
        context.stroke();
    }
}
var startTime = new Date().getTime();
 
var timer = new Timer();
var lastTime = new Date().getTime();
function gameLoop()
{
    var currentTime = new Date().getTime();
    var deltaTime = currentTime - lastTime;
    timer.update(deltaTime);
    timer.render();
    lastTime = currentTime;    
}
var gameInterval = setInterval(gameLoop, 1000/fps); 
