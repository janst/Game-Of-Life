/**
 * @author Jan Storenes
 */


var GameOfLife = {};

// Model
GameOfLife.horizontalSize = 10;
GameOfLife.verticalSize = 10;
GameOfLife.currentBoardPoints = [];
GameOfLife.addBoardPoint = function(boardPoint){
	this.currentBoardPoints.push(boardPoint);
};
GameOfLife.resetState = function(){
	this.currentBoardPoints = [];
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
		gameOfLife.context.rect(gameOfLife.offset + gameOfLife.paddingAroundGrid + (this[i].getX()-1)*gameOfLife.sizeOfSquare, gameOfLife.offset + gameOfLife.paddingAroundGrid + (this[i].getY()-1)*gameOfLife.sizeOfSquare, gameOfLife.sizeOfSquare, gameOfLife.sizeOfSquare);
		gameOfLife.context.fillStyle = "black";
		gameOfLife.context.fill();
	}
};

GameOfLife.nextStep = function(){
	//this.currentBoardPoints.next(GameOfLife);
	// go through all points
		// for each point find out if it should be kept
		
	for (i = 0; i < this.currentBoardPoints.length; i += 1) {
		var numOfNeighbours = GameOfLife.numOfNeighbours(this.currentBoardPoints[i]);
		//alert("x value: " + this.currentBoardPoints[i].getX());
	}		
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

GameOfLife.boardWidth = 400;
GameOfLife.boardHeight = 400;
//padding around grid
GameOfLife.paddingAroundGrid = 10;
//size of canvas
GameOfLife.canvasWidth = GameOfLife.boardWidth + (GameOfLife.paddingAroundGrid*2) + 1;
GameOfLife.canvasHeight = GameOfLife.boardHeight + (GameOfLife.paddingAroundGrid*2) + 1;

GameOfLife.sizeOfSquare = 40;
GameOfLife.offset = 0.5;

GameOfLife.drawBoard = function(){
    for (var x = 0; x <= this.boardWidth; x += this.sizeOfSquare) {
        this.context.moveTo(this.offset + x + this.paddingAroundGrid, this.paddingAroundGrid);
        this.context.lineTo(this.offset + x + this.paddingAroundGrid, this.boardHeight + this.paddingAroundGrid);
    }


    for (var x = 0; x <= this.boardHeight; x += this.sizeOfSquare) {
        this.context.moveTo(this.paddingAroundGrid, this.offset + x + this.paddingAroundGrid);
        this.context.lineTo(this.boardWidth + this.paddingAroundGrid, this.offset + x + this.paddingAroundGrid);
    }

    this.context.strokeStyle = "black";
    //context.strokeStyle = "lightgray";
    this.context.stroke();
};

GameOfLife.drawSquareFromMousePoint = function (pointX, pointY){
		pointX = pointX - (this.offset + this.paddingAroundGrid);
		pointY = pointY - (this.offset + this.paddingAroundGrid);
		x = pointX / this.sizeOfSquare;
		y = pointY / this.sizeOfSquare;
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


$(document).ready(function(){
	
	// Init board
	GameOfLife.canvas = $('<canvas/>').attr({width: GameOfLife.canvasWidth, height: GameOfLife.canvasHeight}).appendTo('body');
	GameOfLife.context = GameOfLife.canvas.get(0).getContext("2d");
	GameOfLife.canvas.get(0).addEventListener('click', function(evt){
		var mousePos = getMousePos(GameOfLife.canvas.get(0), evt);
		var message = "Mouse position: " + mousePos.x + "," + mousePos.y;
		//writeMessage(canvas.get(0), message);
		//alert(message);
		GameOfLife.drawSquareFromMousePoint(mousePos.x, mousePos.y);
		}, false);
	
	//var myBoardPoint = ;
	GameOfLife.addBoardPoint(boardPoint({x: 8, y: 8}));	
	GameOfLife.addBoardPoint(boardPoint({x: 3, y: 8}));
	GameOfLife.addBoardPoint(boardPoint({x: 8, y: 3}));
	
	GameOfLife.drawBoard();
	//drawGenericSquare(3,2);
	//drawGenericSquare(1,1);
	//drawGenericSquare(5,7); 
	
	GameOfLife.currentBoardPoints.draw(GameOfLife);
	
	//alert(GameOfLife.currentBoardPoints.numOfNeighbours());
 	});