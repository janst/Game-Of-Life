/**
 * @author Jan Storenes
 */

describe('Game Of Life', function () {		  
		  
		  beforeEach(function () {  
        	GameOfLife.resetState();
		  }); 
		  
		  it('horizontal size', function () {
		  	var horizontalSize = GameOfLife.horizontalSize;
			expect(horizontalSize).toEqual(10);
		  });
		  
		  it('create board point', function () {
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
			expect(myBoardPoint.getX()).toEqual(3);
		  });
		  
		  it('add board point to current board points', function () {
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
			expect(myBoardPoint).toEqual(GameOfLife.currentBoardPoints[0]);
		  });
		  
		  it('clean current board points', function () {
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
			expect(GameOfLife.currentBoardPoints.length).toEqual(1);
			
			GameOfLife.resetState();
			expect(GameOfLife.currentBoardPoints.length).toEqual(0);
		  });
		  
		});