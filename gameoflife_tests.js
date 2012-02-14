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
		  
		  it('remove board point', function () {
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
			expect(GameOfLife.currentBoardPoints.length).toEqual(1);
			
			GameOfLife.removePoint(myBoardPoint);
			expect(GameOfLife.currentBoardPoints.length).toEqual(0);
		  });
		  
		  it('verify that point is on board', function () {
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
			
			expect(GameOfLife.hasBoardPoint(myBoardPoint)).toBeTruthy();
		  });
		  
		  it('verify that point is NOT on board', function () {
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
			
			var boardPointThatIsNotExpected = boardPoint({x: 4, y: 2});
			expect(GameOfLife.hasBoardPoint(boardPointThatIsNotExpected)).toBeFalsy();
		  });
		  
		  it('single point should have no neighbours', function () {
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
			
			expect(GameOfLife.numOfNeighbours(myBoardPoint)).toEqual(0);
		  });
		  
		  it('when have neightbour above to left should have neighbour count of 1', function () {
		  	var neightbourBoardPoint = boardPoint({x: 2, y: 1});
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint);
			
			expect(GameOfLife.numOfNeighbours(myBoardPoint)).toEqual(1);
		  });
		  
		  it('when have neightbour above should have neighbour count of 1', function () {
		  	var neightbourBoardPoint = boardPoint({x: 3, y: 1});
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint);
			
			expect(GameOfLife.numOfNeighbours(myBoardPoint)).toEqual(1);
		  });
		  
		  it('when have neightbour above to right should have neighbour count of 1', function () {
		  	var neightbourBoardPoint = boardPoint({x: 4, y: 1});
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint);
			
			expect(GameOfLife.numOfNeighbours(myBoardPoint)).toEqual(1);
		  });	
		  
		  it('when have neightbour to right should have neighbour count of 1', function () {
		  	var neightbourBoardPoint = boardPoint({x: 4, y: 2});
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint);
			
			expect(GameOfLife.numOfNeighbours(myBoardPoint)).toEqual(1);
		  });	
		  
		  it('when have neightbour below to right should have neighbour count of 1', function () {
		  	var neightbourBoardPoint = boardPoint({x: 4, y: 3});
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint);
			
			expect(GameOfLife.numOfNeighbours(myBoardPoint)).toEqual(1);
		  });	
		  
		  it('when have neightbour below should have neighbour count of 1', function () {
		  	var neightbourBoardPoint = boardPoint({x: 3, y: 3});
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint);
			
			expect(GameOfLife.numOfNeighbours(myBoardPoint)).toEqual(1);
		  });	
		  
		  it('when have neightbour below to left should have neighbour count of 1', function () {
		  	var neightbourBoardPoint = boardPoint({x: 2, y: 3});
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint);
			
			expect(GameOfLife.numOfNeighbours(myBoardPoint)).toEqual(1);
		  });	
		  
		  it('when have neightbour to left should have neighbour count of 1', function () {
		  	var neightbourBoardPoint = boardPoint({x: 2, y: 2});
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint);
			
			expect(GameOfLife.numOfNeighbours(myBoardPoint)).toEqual(1);
		  });	
		  
		  it('when have two neightbours should have neighbour count of 2', function () {
		  	var neightbourBoardPoint1 = boardPoint({x: 2, y: 2});
		  	var neightbourBoardPoint2 = boardPoint({x: 2, y: 1});
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint1);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint2);
			
			expect(GameOfLife.numOfNeighbours(myBoardPoint)).toEqual(2);
		  });	
		  
		    it('when have three neightbours should have neighbour count of 3', function () {
		  	var neightbourBoardPoint1 = boardPoint({x: 2, y: 2});
		  	var neightbourBoardPoint2 = boardPoint({x: 2, y: 1});
		  	var neightbourBoardPoint3 = boardPoint({x: 3, y: 1});
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint1);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint2);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint3);
			
			expect(GameOfLife.numOfNeighbours(myBoardPoint)).toEqual(3);
		  });			  	  		  		  		  	  
		  
		  it('one single point should die in next step', function () {
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
			expect(GameOfLife.currentBoardPoints.length).toEqual(1);
			
			GameOfLife.nextStep();
			expect(GameOfLife.currentBoardPoints.length).toEqual(0);
		  });
		  
		  it('point with one neighbour should die in next step', function () {
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
		  	var neightbourBoardPoint1 = boardPoint({x: 2, y: 1});
		  	
			GameOfLife.nextStep();
			expect(GameOfLife.currentBoardPoints.length).toEqual(0);
		  });
		  
		  it('point with two neightbours should live', function () {
		  	var neightbourBoardPoint1 = boardPoint({x: 2, y: 2});
		  	var neightbourBoardPoint2 = boardPoint({x: 2, y: 1});
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint1);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint2);
			
			GameOfLife.nextStep();
			expect(GameOfLife.hasBoardPoint(myBoardPoint)).toBeTruthy();
		  });	
		  
		  it('point with three neightbours should live', function () {
		  	var neightbourBoardPoint1 = boardPoint({x: 2, y: 2});
		  	var neightbourBoardPoint2 = boardPoint({x: 2, y: 1});
		  	var neightbourBoardPoint3 = boardPoint({x: 3, y: 1});
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint1);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint2);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint3);
			
			GameOfLife.nextStep();
			expect(GameOfLife.hasBoardPoint(myBoardPoint)).toBeTruthy();
		  });			  		  
		 
		  it('point with four neightbours should die', function () {
		  	var neightbourBoardPoint1 = boardPoint({x: 2, y: 2});
		  	var neightbourBoardPoint2 = boardPoint({x: 2, y: 1});
		  	var neightbourBoardPoint3 = boardPoint({x: 3, y: 1});
		  	var neightbourBoardPoint4 = boardPoint({x: 4, y: 1});
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
		  	GameOfLife.addBoardPoint(myBoardPoint);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint1);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint2);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint3);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint4);
			
			GameOfLife.nextStep();
			expect(GameOfLife.hasBoardPoint(myBoardPoint)).toBeFalsy();
		  });	
		  
		  it('dead point with three neightbours should live', function () {
		  	var neightbourBoardPoint1 = boardPoint({x: 2, y: 2});
		  	var neightbourBoardPoint2 = boardPoint({x: 2, y: 1});
		  	var neightbourBoardPoint3 = boardPoint({x: 3, y: 1});
		  	GameOfLife.addBoardPoint(neightbourBoardPoint1);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint2);
		  	GameOfLife.addBoardPoint(neightbourBoardPoint3);
		  	var myBoardPoint = boardPoint({x: 3, y: 2});
			
			GameOfLife.nextStep();
			expect(GameOfLife.hasBoardPoint(myBoardPoint)).toBeTruthy();
		  });			  		  		  		  
		});