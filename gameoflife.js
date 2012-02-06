/**
 * @author Jan Storenes
 */


var GameOfLife = {};

GameOfLife.horizontalSize = 10;
GameOfLife.verticalSize = 10;
GameOfLife.currentBoardPoints = [];
GameOfLife.addBoardPoint = function(boardPoint){
	this.currentBoardPoints.push(boardPoint);
};
GameOfLife.resetState = function(){
	this.currentBoardPoints = [];
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


//GameOfLife.currentGameState = {	
//};


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
     //alert("Thanks for visiting!");
	//grid width and height
	var bw = 400;
	var bh = 400;
	//padding around grid
	var paddingAroundGrid = 10;
	//size of canvas
	var cw = bw + (paddingAroundGrid*2) + 1;
	var ch = bh + (paddingAroundGrid*2) + 1;
	
	var sizeOfSquare = 40;
	var offset = 0.5;
	
	var canvas = $('<canvas/>').attr({width: cw, height: ch}).appendTo('body');
	
	var context = canvas.get(0).getContext("2d");
	
	function drawBoard(){
	    for (var x = 0; x <= bw; x += sizeOfSquare) {
	        context.moveTo(offset + x + paddingAroundGrid, paddingAroundGrid);
	        context.lineTo(offset + x + paddingAroundGrid, bh + paddingAroundGrid);
	    }
	
	
	    for (var x = 0; x <= bh; x += sizeOfSquare) {
	        context.moveTo(paddingAroundGrid, offset + x + paddingAroundGrid);
	        context.lineTo(bw + paddingAroundGrid, offset + x + paddingAroundGrid);
	    }
	
	    context.strokeStyle = "black";
	    //context.strokeStyle = "lightgray";
	    context.stroke();
	}
	
	function drawOneSquare(){
		//context.rect(topLeftCornerX, topLeftCornerY, width, height);
		context.rect(offset + paddingAroundGrid, offset + paddingAroundGrid, sizeOfSquare, sizeOfSquare);
		context.fillStyle = "black";
		context.fill();
	}
	
	function drawOneAnotherSquare(){
		//context.rect(topLeftCornerX, topLeftCornerY, width, height);
		context.rect(offset + paddingAroundGrid + 4*sizeOfSquare, offset + paddingAroundGrid + 6*sizeOfSquare, sizeOfSquare, sizeOfSquare);
		context.fillStyle = "black";
		context.fill();
	}
	
	function drawGenericSquare(x, y){
		context.rect(offset + paddingAroundGrid + (x-1)*sizeOfSquare, offset + paddingAroundGrid + (y-1)*sizeOfSquare, sizeOfSquare, sizeOfSquare);
		context.fillStyle = "black";
		context.fill();
	}
	
	function drawSquareFromMousePoint(pointX, pointY){
		pointX = pointX - (offset + paddingAroundGrid);
		pointY = pointY - (offset + paddingAroundGrid);
		x = pointX / sizeOfSquare;
		y = pointY / sizeOfSquare;
		//alert(x);
		drawGenericSquare(Math.ceil(x), Math.ceil(y));
	}

	function generateStartBoard(){
		var point1 = boardPoint({x: 3, y: 2});
		var point2 = boardPoint({x: 4, y: 5});
		var point3 = boardPoint({x: 5, y: 7});
	  	GameOfLife.addBoardPoint(point1);
	  	GameOfLife.addBoardPoint(point2);
	  	GameOfLife.addBoardPoint(point3);
	}
	
	/*Array.method('boardPoints', function(f, value){
		var i;
		for(i = 0; i < this.length; i += 1){
			var boardPoint = this[i];
			f(boardPoint.getX(), boardPoint.getY());
		}	
		return value;			
	});*/
	
	/*Function.prototype.method = function (name, func) {
    	this.prototype[name] = func;
    	return this;
	};
	
	Array.method('reduce', function (f, value) {
	    var i;
	    for (i = 0; i < this.length; i += 1) {
	        value = f(this[i], value);
	    }
	    return value;
	});*/
	
	var myBoardPoint = boardPoint({x: 8, y: 8});
	GameOfLife.addBoardPoint(myBoardPoint);	
	
	GameOfLife.currentBoardPoints.draw = function (context, offset, paddingAroundGrid, sizeOfSquare) {
		for (i = 0; i < this.length; i += 1) {
			context.rect(offset + paddingAroundGrid + (this[i].getX()-1)*sizeOfSquare, offset + paddingAroundGrid + (this[i].getY()-1)*sizeOfSquare, sizeOfSquare, sizeOfSquare);
			context.fillStyle = "black";
			context.fill();
		}
}
	
	//generateStartBoard();
		
	
	
	drawBoard();		
	//drawOneSquare();	
	//drawOneAnotherSquare();  
	drawGenericSquare(3,2);
	drawGenericSquare(1,1);
	drawGenericSquare(5,7); 
	
	GameOfLife.currentBoardPoints.draw(context, offset, paddingAroundGrid, sizeOfSquare);
	
	canvas.get(0).addEventListener('click', function(evt){
    	var mousePos = getMousePos(canvas.get(0), evt);
    	var message = "Mouse position: " + mousePos.x + "," + mousePos.y;
    	//writeMessage(canvas.get(0), message);
    	//alert(message);
    	drawSquareFromMousePoint(mousePos.x, mousePos.y);
		}, false);
	  
 	});