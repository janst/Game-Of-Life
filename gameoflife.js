/**
 * @author Jan Storenes
 */


var GameOfLife = {};
var timerIsOn = 0;
var timerId;
var Configuration = {
	"loopInterval" : 1000, 
	"boardSizeHorizontal" : 20,
	"boardSizeVertical" : 20
};

// Model
//Configuration.boardSizeHorizontal = Configuration.boardSize;
//GameOfLife.verticalSize = Configuration.boardSize;
GameOfLife.currentBoardPoints = [];
GameOfLife.addBoardPoint = function(boardPoint){
	this.currentBoardPoints.push(boardPoint);
};
GameOfLife.resetState = function(){
	//this.currentBoardPoints = [];
	this.currentBoardPoints.length = 0;
};

GameOfLife.removePoint = function(boardPoint){
	for (i = 0; i < this.currentBoardPoints.length; i += 1) {
		if (this.currentBoardPoints[i].getX() == boardPoint.getX() && this.currentBoardPoints[i].getY() == boardPoint.getY())
			this.currentBoardPoints.splice(i, 1);
	}
};

var boardPoint = function (spec) {
	var that = {};
	
	that.getX = function() {
		return spec.x;
	};
	
	that.getY = function() {
		return spec.y;
	};
	
	return that;
};

// Drawing
GameOfLife.currentBoardPoints.draw = function (gameOfLife) {
	for (i = 0; i < this.length; i += 1) {
		gameOfLife.context.rect(gameOfLife.offset + gameOfLife.paddingAroundGrid + (this[i].getX()-1)*gameOfLife.sizeOfSquare(), gameOfLife.offset + 
			gameOfLife.paddingAroundGrid + (this[i].getY()-1)*gameOfLife.sizeOfSquare(), gameOfLife.sizeOfSquare(), gameOfLife.sizeOfSquare());
		//gameOfLife.context.fillStyle = "black";
		gameOfLife.context.fillStyle = "#1C94C4";
		gameOfLife.context.fill();
	}
};

// The initial pattern constitutes the seed of the system. The first generation is created by applying the above 
// rules simultaneously to every cell in the seed—births and deaths occur simultaneously, and the discrete moment 
// at which this happens is sometimes called a tick (in other words, each generation is a pure function of the 
// preceding one). The rules continue to be applied repeatedly to create further generations.
GameOfLife.nextStep = function(){
	//this.currentBoardPoints.next(GameOfLife);
	// go through all points
		// for each point find out if it should be kept
		
	//for (i = 0; i < this.currentBoardPoints.length; i += 1) {
		//var numOfNeighbours = GameOfLife.numOfNeighbours(this.currentBoardPoints[i]);
		//alert("x value: " + this.currentBoardPoints[i].getX());
	//}		
	
	var nextGenBoardPoints = [];
	// loop through all points
	for (var x = 1; x <= Configuration.boardSizeHorizontal; x += 1){
		for (var y = 1; y <= Configuration.boardSizeVertical; y += 1){
		// for each point find if it is dead og live
			if (this.hasBoardPoint(boardPoint({x: x, y: y}))){
				// if live, apply rules against current points, still live cells are added to next gen list	
				var numOfNeighbours = GameOfLife.numOfNeighbours(boardPoint({x: x, y: y}));
				if (2 <= numOfNeighbours && numOfNeighbours <= 3){
					nextGenBoardPoints.push(boardPoint({x: x, y: y}));
				}
			}
			else{
				// if dead, apply rule against current points, still live cells are added to next gen list	
				var numOfNeighbours = GameOfLife.numOfNeighbours(boardPoint({x: x, y: y}));
				if (numOfNeighbours === 3){
					nextGenBoardPoints.push(boardPoint({x: x, y: y}));
				}
			}
		}
	}
		
	// replace current list with next gen list
	//this.currentBoardPoints.clear();
	this.currentBoardPoints.length = 0;
	for (i = 0; i < nextGenBoardPoints.length; i += 1) {
		this.currentBoardPoints.push(nextGenBoardPoints[i]);
	}
	//this.currentBoardPoints = nextGenBoardPoints;
};

GameOfLife.numOfNeighbours = function (aBoardPoint) {
	
	var x = aBoardPoint.getX();
	var y = aBoardPoint.getY();
	var numOfNeighbours = 0;
	var countIfNeighbours = function(neighbourPoint){
		if(GameOfLife.hasBoardPoint(neighbourPoint)){
			numOfNeighbours += 1;
		}
	};
	
	// above to left
	countIfNeighbours(boardPoint({x: x-1, y: y-1}));
	// check if valid! (that point is on board)	
	
	// above
	countIfNeighbours(boardPoint({x: x, y: y-1}));
	// check if valid! (that point is on board)		
	
	// above to right
	countIfNeighbours(boardPoint({x: x+1, y: y-1}));
	
	// to right
	countIfNeighbours(boardPoint({x: x+1, y: y}));
	
	// below to right
	countIfNeighbours(boardPoint({x: x+1, y: y+1}));
	
	// below
	countIfNeighbours(boardPoint({x: x, y: y+1}));
	
	// below to left
	countIfNeighbours(boardPoint({x: x-1, y: y+1}));
	
	// to left
	countIfNeighbours(boardPoint({x: x-1, y: y}));
	
	return numOfNeighbours;
};

GameOfLife.hasBoardPoint = function (boardPoint) {
	for (i = 0; i < this.currentBoardPoints.length; i += 1) {
		if (this.currentBoardPoints[i].getX() == boardPoint.getX() && this.currentBoardPoints[i].getY() == boardPoint.getY())
			return true;
	}
	return false;
};

GameOfLife.boardWidth = 800;
GameOfLife.boardHeight = 800;
//padding around grid
GameOfLife.paddingAroundGrid = 0;
//size of canvas
GameOfLife.offset = 0.5;		// To make crisp lines
GameOfLife.canvasWidth = GameOfLife.boardWidth + (GameOfLife.paddingAroundGrid*2) + 2 * GameOfLife.offset;
GameOfLife.canvasHeight = GameOfLife.boardHeight + (GameOfLife.paddingAroundGrid*2) + 2 * GameOfLife.offset;

//GameOfLife.sizeOfSquare = 20;
GameOfLife.sizeOfSquare = function(){
	if (GameOfLife.boardWidth !== GameOfLife.boardHeight){
		/*throw {
            name: 'Init error',
            message: 'the app only supports boards where horizontal and vertical size are equal'
        }*/
       //alert("Init error. The app only supports boards where horizontal and vertical size are equal.");
	}
	
	// Should handle error in a validation function after all default values are being set.
	
	return GameOfLife.boardWidth / Configuration.boardSizeHorizontal;
	
	//return 20;
};

GameOfLife.drawBoard = function(){
    for (var x = 0; x <= this.boardWidth; x += this.sizeOfSquare()) {
        this.context.moveTo(this.offset + x + this.paddingAroundGrid, this.paddingAroundGrid);
        this.context.lineTo(this.offset + x + this.paddingAroundGrid, this.boardHeight + this.paddingAroundGrid);
    }


    for (var x = 0; x <= this.boardHeight; x += this.sizeOfSquare()) {
        this.context.moveTo(this.paddingAroundGrid, this.offset + x + this.paddingAroundGrid);
        this.context.lineTo(this.boardWidth + 2*GameOfLife.offset + this.paddingAroundGrid, this.offset + x + this.paddingAroundGrid);
    }
	this.context.lineWidth = 1;
    this.context.strokeStyle = "#ccc";
    //context.strokeStyle = "lightgray";
    this.context.stroke();
};

GameOfLife.drawSquareFromMousePoint = function (pointX, pointY){
	// Kunne vi hatt denne koden i en funksjon?
		pointX = pointX - (this.offset + this.paddingAroundGrid);
		pointY = pointY - (this.offset + this.paddingAroundGrid);
		x = pointX / this.sizeOfSquare();
		y = pointY / this.sizeOfSquare();
		//alert(x);
		//drawGenericSquare(Math.ceil(x), Math.ceil(y));
		this.addBoardPoint(boardPoint({x: Math.ceil(x), y: Math.ceil(y)}));
		GameOfLife.currentBoardPoints.draw(GameOfLife);
};


function writeMessage(canvas, message){
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}
 
function getMousePos(canvas, evt){
    // get canvas position
    var obj = canvas;
    var top = 0;
    var left = 0;
    while (obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
 
    // return relative mouse position
    var mouseX = evt.clientX - left + window.pageXOffset;
    var mouseY = evt.clientY - top + window.pageYOffset;
    return mousePos = {
        x: mouseX,
        y: mouseY
    };
};

function pausecomp(ms) {
	ms += new Date().getTime();
	while (new Date() < ms){}
}; 

function nextGeneration(){
	GameOfLife.nextStep();
	clearBoard();
	drawBoard();
};

function clearBoard(){
	GameOfLife.context.clearRect(0, 0, GameOfLife.canvasWidth, GameOfLife.canvasHeight);
	GameOfLife.context.beginPath();	
};

function drawBoard(){
	GameOfLife.drawBoard();
	GameOfLife.currentBoardPoints.draw(GameOfLife);	
};

function clearGame(){
	GameOfLife.resetState();
	clearBoard();
	drawBoard();
};

function loop(){
	nextGeneration();
	timerId = setTimeout("loop()",Configuration.loopInterval);
};

function toggleLoop(){
	console.log("Entering loop");
	if (!timerIsOn)
  	{
  		timerIsOn = 1;
  		loop();
  	}
  	else {
  		clearTimeout(timerId);
		timerIsOn = 0;
  	}
};

function changeTimeValue(){
	var timerValue = $("#timer").val();
	console.log(timerValue);
	Configuration.loopInterval = timerValue;
};

function changeBoardSize(){
	var boardSize = $("#boardSize").val();
	console.log(boardSize);
	Configuration.boardSizeHorizontal = boardSize;
	Configuration.boardSizeVertical = boardSize;
};

function setBoardPattern(){
	var boardPattern = $("#boardPattern").val();
	console.log(boardPattern);
	clearGame();
	if(boardPattern === "1"){
		GameOfLife.addBoardPoint(boardPoint({x: 6, y: 5}));	
		GameOfLife.addBoardPoint(boardPoint({x: 6, y: 6}));
		GameOfLife.addBoardPoint(boardPoint({x: 6, y: 7}));
	} else if (boardPattern === "2"){
		GameOfLife.addBoardPoint(boardPoint({x: 3, y: 3}));	
		GameOfLife.addBoardPoint(boardPoint({x: 3, y: 4}));
		GameOfLife.addBoardPoint(boardPoint({x: 4, y: 3}));
		GameOfLife.addBoardPoint(boardPoint({x: 6, y: 5}));	
		GameOfLife.addBoardPoint(boardPoint({x: 6, y: 6}));
		GameOfLife.addBoardPoint(boardPoint({x: 5, y: 6}));
	} else if (boardPattern === "3"){
		GameOfLife.addBoardPoint(boardPoint({x: 3, y: 5}));	
		GameOfLife.addBoardPoint(boardPoint({x: 4, y: 5}));
		GameOfLife.addBoardPoint(boardPoint({x: 5, y: 5}));
		GameOfLife.addBoardPoint(boardPoint({x: 5, y: 4}));	
		GameOfLife.addBoardPoint(boardPoint({x: 4, y: 3}));
	} else if (boardPattern === "4"){
		GameOfLife.addBoardPoint(boardPoint({x: 12, y: 14}));	
		GameOfLife.addBoardPoint(boardPoint({x: 13, y: 14}));
		GameOfLife.addBoardPoint(boardPoint({x: 13, y: 12}));
		GameOfLife.addBoardPoint(boardPoint({x: 15, y: 13}));	
		GameOfLife.addBoardPoint(boardPoint({x: 16, y: 14}));
		GameOfLife.addBoardPoint(boardPoint({x: 17, y: 14}));	
		GameOfLife.addBoardPoint(boardPoint({x: 18, y: 14}));
	} else if (boardPattern === "5"){
		GameOfLife.addBoardPoint(boardPoint({x: 2, y: 6}));	
		GameOfLife.addBoardPoint(boardPoint({x: 2, y: 7}));
		GameOfLife.addBoardPoint(boardPoint({x: 3, y: 6}));
		GameOfLife.addBoardPoint(boardPoint({x: 3, y: 7}));	
		GameOfLife.addBoardPoint(boardPoint({x: 12, y: 6}));
		GameOfLife.addBoardPoint(boardPoint({x: 12, y: 7}));	
		GameOfLife.addBoardPoint(boardPoint({x: 12, y: 8}));
		GameOfLife.addBoardPoint(boardPoint({x: 13, y: 5}));	
		GameOfLife.addBoardPoint(boardPoint({x: 13, y: 9}));
		GameOfLife.addBoardPoint(boardPoint({x: 14, y: 4}));
		GameOfLife.addBoardPoint(boardPoint({x: 14, y: 10}));	
		GameOfLife.addBoardPoint(boardPoint({x: 15, y: 4}));
		GameOfLife.addBoardPoint(boardPoint({x: 15, y: 10}));	
		GameOfLife.addBoardPoint(boardPoint({x: 16, y: 7}));
		GameOfLife.addBoardPoint(boardPoint({x: 17, y: 5}));	
		GameOfLife.addBoardPoint(boardPoint({x: 17, y: 9}));
		GameOfLife.addBoardPoint(boardPoint({x: 18, y: 6}));
		GameOfLife.addBoardPoint(boardPoint({x: 18, y: 7}));	
		GameOfLife.addBoardPoint(boardPoint({x: 18, y: 8}));
		GameOfLife.addBoardPoint(boardPoint({x: 19, y: 7}));	
		GameOfLife.addBoardPoint(boardPoint({x: 22, y: 4}));
		GameOfLife.addBoardPoint(boardPoint({x: 22, y: 5}));	
		GameOfLife.addBoardPoint(boardPoint({x: 22, y: 6}));
		GameOfLife.addBoardPoint(boardPoint({x: 23, y: 4}));
		GameOfLife.addBoardPoint(boardPoint({x: 23, y: 5}));	
		GameOfLife.addBoardPoint(boardPoint({x: 23, y: 6}));
		GameOfLife.addBoardPoint(boardPoint({x: 24, y: 3}));	
		GameOfLife.addBoardPoint(boardPoint({x: 24, y: 7}));	
		GameOfLife.addBoardPoint(boardPoint({x: 26, y: 2}));	
		GameOfLife.addBoardPoint(boardPoint({x: 26, y: 3}));
		GameOfLife.addBoardPoint(boardPoint({x: 26, y: 7}));
		GameOfLife.addBoardPoint(boardPoint({x: 26, y: 8}));	
		GameOfLife.addBoardPoint(boardPoint({x: 36, y: 4}));
		GameOfLife.addBoardPoint(boardPoint({x: 36, y: 5}));	
		GameOfLife.addBoardPoint(boardPoint({x: 37, y: 4}));	
		GameOfLife.addBoardPoint(boardPoint({x: 37, y: 5}));			
	}		
	
	drawBoard();
};

$(document).ready(function(){
	
	// Init board
	GameOfLife.canvas = $('<canvas/>').attr({width: GameOfLife.canvasWidth, height: GameOfLife.canvasHeight}).appendTo('#board');
	GameOfLife.context = GameOfLife.canvas.get(0).getContext("2d");
	GameOfLife.canvas.get(0).addEventListener('click', function(evt){
		var mousePos = getMousePos(GameOfLife.canvas.get(0), evt);
		var message = "Mouse position: " + mousePos.x + "," + mousePos.y;
		//writeMessage(canvas.get(0), message);
		//alert(message);
		GameOfLife.drawSquareFromMousePoint(mousePos.x, mousePos.y);
		}, false);
	
	//var myBoardPoint = ;
	GameOfLife.addBoardPoint(boardPoint({x: 4, y: 2}));	
	GameOfLife.addBoardPoint(boardPoint({x: 4, y: 3}));
	GameOfLife.addBoardPoint(boardPoint({x: 4, y: 4}));
	
	GameOfLife.drawBoard();
	//drawGenericSquare(3,2);
	//drawGenericSquare(1,1);
	//drawGenericSquare(5,7); 
	
	//GameOfLife.nextStep();
	GameOfLife.currentBoardPoints.draw(GameOfLife);
	
	$("#menu").position({
					my : "center top",
					at : "center top",
					of : "#content",
					offset: "0 30"
				});
	$("#board").position({
					my : "left bottom",
					at : "left top",
					of : "#menu",
					offset: "0 -30" 
				});		
	$("#selects").position({
					my : "left top",
					at : "right top",
					of : "#buttons"
				});					
	/*$("#menu").position({
					my : "center center",
					at : "center center",
					of : "body"
				});				
	//alert(GameOfLife.currentBoardPoints.numOfNeighbours());*/
 	});