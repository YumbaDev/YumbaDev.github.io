// Initialize grid
var grid;

// Adjustable global core variables
const GRID_WIDTH = 60;
const GRID_HEIGHT = GRID_WIDTH;
const CELL_WIDTH = 10;
const BORDER_WIDTH = 1;
const numSteps = Math.floor(GRID_WIDTH * GRID_HEIGHT * 0.6)


//var dkShade = "#1B1725";
//var shade = "534B62";
//var ltShade = "A499B3";

// Function to create a 2-D array
function create2DArray(cols, rows){
	let a = new Array(cols);
	
	for(let i = 0; i < cols; i++){
		a[i] = new Array(rows);
	}
	
	return a;
}

// Function that returns random integer from min (inclusive) to max - 1 (inclusive)
function randIntRange(min, max){
	return Math.floor(min + Math.random() * max);
}

// Function that runs algorithm to create map
function conductWalk(){
	// Calculate center of the grid
	const centerX = Math.floor((GRID_WIDTH - 1) * 0.5);
	const centerY = Math.floor((GRID_HEIGHT - 1) * 0.5);
	
	// Set Algorithm to start at center of the grid
	let currentX = centerX;
	let currentY = centerY;
	grid[currentX][currentY].steppedOn();
	
	for(let i = 0; i < numSteps; i++){
		// dir in the range 0 to 3 (inclusive)
		let dir = randIntRange(0,4)
		
		switch(dir){
			// right
			case 0:{
				// if moving right is in bounds
				if(currentX + 1 != GRID_WIDTH - BORDER_WIDTH){
					currentX += 1;
				}else{
					currentX -= 1;
				}
			}
			break;
			
			// up
			case 1:{
				// if moving up is in bounds
				if(currentY - 1 != BORDER_WIDTH - 1){
					currentY -= 1;
				}else{
					currentY += 1;
				}
			}
			break;
			
			// left
			case 2:{
				// if moving left is in bounds
				if(currentX - 1 != BORDER_WIDTH - 1){
					currentX -= 1;
				}else{
					currentX += 1;
				}
			}
			break;
			
			// down
			case 3:{
				// if moving down is in bounds
				if(currentY + 1 != GRID_HEIGHT - BORDER_WIDTH){
					currentY += 1;
				}else{
					currentY -= 1;
				}
			}
			break;
		}
		grid[currentX][currentY].steppedOn();
	}
}

function setup(){
	createCanvas(GRID_WIDTH * CELL_WIDTH, GRID_HEIGHT * CELL_WIDTH);
	
	grid = create2DArray(GRID_WIDTH, GRID_HEIGHT);
	
	for(let _x = 0; _x < GRID_WIDTH; _x++){
		for(let _y = 0; _y < GRID_HEIGHT; _y++){
			grid[_x][_y] = new Cell(_x * CELL_WIDTH, _y * CELL_WIDTH, CELL_WIDTH); 
		}
	}
	
	conductWalk();
}

function draw(){	
	for(let _x = 0; _x < GRID_WIDTH; _x++){
		for(let _y = 0; _y < GRID_HEIGHT; _y++){
			grid[_x][_y].paint();
		}
	}
}