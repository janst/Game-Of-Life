/**
 * @author Jan Storenes
 * @version 1.0
 * 
 * Based on the folowing rules:
 * The initial pattern constitutes the seed of the system. The first generation is created by applying the above 
 * rules simultaneously to every cell in the seed—births and deaths occur simultaneously, and the discrete moment 
 * at which this happens is sometimes called a tick (in other words, each generation is a pure function of the 
 * preceding one). The rules continue to be applied repeatedly to create further generations. 
 * (See http://en.wikipedia.org/wiki/Conway's_Game_of_Life).
 */


var GameOfLife = {
	currentBoardPoints: [],
	boardSizeHorizontal: 20,
	boardSizeVertical: 20,
	
	addBoardPoint: function(boardPoint){
		this.currentBoardPoints.push(boardPoint);
	},
	
	resetState: function(){
		this.currentBoardPoints.length = 0;
	},
	
	removePoint: function(boardPoint){
		for (i = 0; i < this.currentBoardPoints.length; i += 1) {
			if (this.currentBoardPoints[i].getX() == boardPoint.getX() && this.currentBoardPoints[i].getY() == boardPoint.getY())
				this.currentBoardPoints.splice(i, 1);
		}
	},
	
	// Todo: cleaner code
	nextStep: function(){
		var nextGenBoardPoints = [];
		for (var x = 1; x <= this.boardSizeHorizontal; x += 1){
			for (var y = 1; y <= this.boardSizeVertical; y += 1){
			// for each point find if it is dead og live
				if (this.hasBoardPoint(this.boardPoint({x: x, y: y}))){
					// if live, apply rules against current points, still live cells are added to next gen list	
					var numOfNeighbours = GameOfLife.numOfNeighbours(this.boardPoint({x: x, y: y}));
					if (2 <= numOfNeighbours && numOfNeighbours <= 3){
						nextGenBoardPoints.push(this.boardPoint({x: x, y: y}));
					}
				}
				else{
					// if dead, apply rule against current points, still live cells are added to next gen list	
					var numOfNeighbours = GameOfLife.numOfNeighbours(this.boardPoint({x: x, y: y}));
					if (numOfNeighbours === 3){
						nextGenBoardPoints.push(this.boardPoint({x: x, y: y}));
					}
				}
			}
		}
			
		this.currentBoardPoints.length = 0;
		for (i = 0; i < nextGenBoardPoints.length; i += 1) {
			this.currentBoardPoints.push(nextGenBoardPoints[i]);
		}
	},
	
	numOfNeighbours: function (aBoardPoint) {
		var x = aBoardPoint.getX();
		var y = aBoardPoint.getY();
		var numOfNeighbours = 0;
		var countIfNeighbours = function(neighbourPoint){
			if(GameOfLife.hasBoardPoint(neighbourPoint)){
				numOfNeighbours += 1;
			}
		};
		// Todo: validate border conditions
		countIfNeighbours(this.boardPoint({x: x-1, y: y-1}));
		countIfNeighbours(this.boardPoint({x: x, y: y-1}));
		countIfNeighbours(this.boardPoint({x: x+1, y: y-1}));
		countIfNeighbours(this.boardPoint({x: x+1, y: y}));
		countIfNeighbours(this.boardPoint({x: x+1, y: y+1}));
		countIfNeighbours(this.boardPoint({x: x, y: y+1}));
		countIfNeighbours(this.boardPoint({x: x-1, y: y+1}));
		countIfNeighbours(this.boardPoint({x: x-1, y: y}));
		
		return numOfNeighbours;
	},
	
	hasBoardPoint: function (boardPoint) {
		for (i = 0; i < this.currentBoardPoints.length; i += 1) {
			if (this.currentBoardPoints[i].getX() == boardPoint.getX() && this.currentBoardPoints[i].getY() == boardPoint.getY())
				return true;
		}
		return false;
	},
	
	sizeOfSquare: function(){
		if (GameOfLife.boardWidth !== GameOfLife.boardHeight){
		}
		return GameOfLife.boardWidth / this.boardSizeHorizontal;
	},
	
	boardPoint: function (spec) {
		var that = {};
		
		that.getX = function() {
			return spec.x;
		};
		
		that.getY = function() {
			return spec.y;
		};
		
		return that;
	}
	
};


GameOfLife.view = {
	canvas: undefined,
	context: undefined,
	boardWidth: 800,
	boardHeight: 800,
	paddingAroundGrid: 0,
	offsetToMakeCrispLines: 0.5,
	
	canvasWidth: function(){
		return this.boardWidth + (this.paddingAroundGrid*2) + 2 * this.offsetToMakeCrispLines;
	},
	canvasHeight: function(){
		return this.boardHeight + (this.paddingAroundGrid*2) + 2 * this.offsetToMakeCrispLines;
	},	
	
	drawBoard: function(){
	    for (var x = 0; x <= this.boardWidth; x += this.sizeOfSquare()) {
	        this.context.moveTo(this.offsetToMakeCrispLines + x + this.paddingAroundGrid, this.paddingAroundGrid);
	        this.context.lineTo(this.offsetToMakeCrispLines + x + this.paddingAroundGrid, this.boardHeight + this.paddingAroundGrid);
	    }
	
	
	    for (var x = 0; x <= this.boardHeight; x += this.sizeOfSquare()) {
	        this.context.moveTo(this.paddingAroundGrid, this.offsetToMakeCrispLines + x + this.paddingAroundGrid);
	        this.context.lineTo(this.boardWidth + 2*this.offsetToMakeCrispLines + this.paddingAroundGrid, this.offsetToMakeCrispLines + x + this.paddingAroundGrid);
	    }
		this.context.lineWidth = 1;
	    this.context.strokeStyle = "#ccc";
	    this.context.stroke();
	},
	
	sizeOfSquare: function(){
		if (this.boardWidth !== this.boardHeight){
		}
		
		// Todo: Avoid refering to GameLife
		return this.boardWidth / GameOfLife.boardSizeHorizontal;
	},
	
	drawSquareFromMousePoint: function (pointX, pointY){
		pointX = pointX - (this.offsetToMakeCrispLines + this.paddingAroundGrid);
		pointY = pointY - (this.offsetToMakeCrispLines + this.paddingAroundGrid);
		x = pointX / this.sizeOfSquare();
		y = pointY / this.sizeOfSquare();
		GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: Math.ceil(x), y: Math.ceil(y)})); // Todo: have we access to currentboard here?
		GameOfLife.currentBoardPoints.draw(GameOfLife.view);	// Todo: have we access to currentboard here?
	},
	
	writeMessage: function(message){
	    this.context.clearRect(0, 0, canvas.width, canvas.height);
	    this.context.font = '18pt Calibri';
	    this.context.fillStyle = 'black';
	    this.context.fillText(message, 10, 25);
	}
};

GameOfLife.looping = {
	timerIsOn: 0,
	timerId: undefined,
	loopInterval: 500
};

GameOfLife.currentBoardPoints.draw = function (view) {
	for (i = 0; i < this.length; i += 1) {
		view.context.rect(view.offsetToMakeCrispLines + view.paddingAroundGrid + (this[i].getX()-1)*view.sizeOfSquare(), view.offsetToMakeCrispLines + 
			view.paddingAroundGrid + (this[i].getY()-1)*view.sizeOfSquare(), view.sizeOfSquare(), view.sizeOfSquare());
		view.context.fillStyle = "#1C94C4";
		view.context.fill();
	}
};

// Todo: Should get this to work again
/*function getMousePos (canvas, evt){
    var obj = canvas;
    var top = 0;
    var left = 0;
    while (obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
 
    var mouseX = evt.clientX - left + window.pageXOffset;
    var mouseY = evt.clientY - top + window.pageYOffset;
    return mousePos = {
        x: mouseX,
        y: mouseY
    };
};*/

function nextGeneration(){
	GameOfLife.nextStep();
	clearBoard();
	drawBoard();
};

function clearBoard(){
	GameOfLife.view.context.clearRect(0, 0, GameOfLife.view.canvasWidth(), GameOfLife.view.canvasHeight());
	GameOfLife.view.context.beginPath();	
};

function drawBoard(){
	GameOfLife.view.drawBoard();
	GameOfLife.currentBoardPoints.draw(GameOfLife.view);	
};

function clearGame(){
	GameOfLife.resetState();
	clearBoard();
	drawBoard();
};

function loop(){
	nextGeneration();
	GameOfLife.looping.timerId = setTimeout("loop()",GameOfLife.looping.loopInterval);
};

function toggleLoop(){
	console.log("Entering loop");
	if (!GameOfLife.looping.timerIsOn)
  	{
  		GameOfLife.looping.timerIsOn = 1;
		$("#toogleControl").button( "option", "label", "Stop" );
  		loop();
  	}
  	else {
  		clearTimeout(GameOfLife.looping.timerId);
		GameOfLife.looping.timerIsOn = 0;
		$("#toogleControl").button( "option", "label", "Start" );
  	}
};

function changeTimeValue(){
	var timerValue = $("#timer").val();
	console.log(timerValue);
	GameOfLife.looping.loopInterval = timerValue;
};

function changeBoardSize(){
	var boardSize = $("#boardSize").val();
	console.log(boardSize);
	GameOfLife.boardSizeHorizontal = boardSize;
	GameOfLife.boardSizeVertical = boardSize;
	clearBoard();
	drawBoard();
};

function setBoardPattern(){
	var boardPattern = $("#boardPattern").val();
	console.log(boardPattern);
	clearGame();
	if(boardPattern === "1"){
		blinkerPattern();
	} else if (boardPattern === "2"){
		beaconPattern();
	} else if (boardPattern === "3"){
		gliderPattern();
	} else if (boardPattern === "4"){
		acornPattern();
	} else if (boardPattern === "5"){
		gliderGunPattern();
	}		
	
	drawBoard();
};

function blinkerPattern(){
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 6, y: 5}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 6, y: 6}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 6, y: 7}));
};

function beaconPattern(){
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 3, y: 3}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 3, y: 4}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 4, y: 3}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 6, y: 5}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 6, y: 6}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 5, y: 6}));	
};

function gliderPattern(){
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 3, y: 5}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 4, y: 5}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 5, y: 5}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 5, y: 4}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 4, y: 3}));	
};

function acornPattern(){
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 12, y: 14}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 13, y: 14}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 13, y: 12}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 15, y: 13}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 16, y: 14}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 17, y: 14}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 18, y: 14}));	
};

function gliderGunPattern(){
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 2, y: 6}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 2, y: 7}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 3, y: 6}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 3, y: 7}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 12, y: 6}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 12, y: 7}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 12, y: 8}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 13, y: 5}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 13, y: 9}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 14, y: 4}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 14, y: 10}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 15, y: 4}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 15, y: 10}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 16, y: 7}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 17, y: 5}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 17, y: 9}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 18, y: 6}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 18, y: 7}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 18, y: 8}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 19, y: 7}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 22, y: 4}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 22, y: 5}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 22, y: 6}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 23, y: 4}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 23, y: 5}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 23, y: 6}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 24, y: 3}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 24, y: 7}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 26, y: 2}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 26, y: 3}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 26, y: 7}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 26, y: 8}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 36, y: 4}));
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 36, y: 5}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 37, y: 4}));	
	GameOfLife.addBoardPoint(GameOfLife.boardPoint({x: 37, y: 5}));		
};

function guiPositioning(){
	$("#header").position({
					my : "center top",
					at : "center top",
					of : "#content",
					offset: "0 10"
				});
	$("#menu").position({
					my : "center top",
					at : "center bottom",
					of : "#header",
					offset: "0 30"
				});				
	$("#board").position({
					my : "left bottom",
					at : "left top",
					of : "#menu",
					offset: "0 -10" 
				});		
	$("#buttons").position({
					my : "left top",
					at : "left top",
					of : "#menu"
				});					
	$("#selects").position({
					my : "left top",
					at : "right top",
					of : "#buttons"
				});	
};

$(document).ready(function(){
	
	var view = GameOfLife.view;
	view.canvas = $('<canvas/>').attr({width: view.canvasWidth(), height: view.canvasHeight()}).appendTo('#board');
	view.context = view.canvas.get(0).getContext("2d");
	// Todo: get this to work again
	/*view.canvas.get(0).addEventListener('click', function(evt){
		var mousePos = getMousePos(GameOfLife.view.canvas, evt);
		var message = "Mouse position: " + mousePos.x + "," + mousePos.y;
		GameOfLife.view.drawSquareFromMousePoint(mousePos.x, mousePos.y);
		}, false);*/
	
	gliderPattern();
	view.drawBoard();
	GameOfLife.currentBoardPoints.draw(GameOfLife.view);
	
	guiPositioning();
});	