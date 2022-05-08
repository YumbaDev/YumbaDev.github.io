// THIS IS AN EXTREMELY ROUGH PROTOTYPE, MAINLY JUST TO PLAY AROUND AND TEST. 
// THIS WILL BE REORGANIZED IN A BETTER MANNER 

// basic bit structure
function bit() {
	this.value = "0000";
	this.pool = [[],[],[],[]];
	this.sprite = new Image();
}

// simple decimal to binary converter
function toBinary(number){
	let binary = "";
	let num = number;
	let keepGoing = true;

	while(keepGoing){
		let bit = num % 2;
		num = Math.floor(num / 2);
		binary = bit + binary
		if(num == 0)
			keepGoing = false;
	}

	if(binary.length < 4){
		let numLeft = 4 - binary.length;
		for(let i = 0; i < numLeft; i++)
			binary = "0" + binary;
	}

	//console.log(binary);
	return binary;
}

// set the NAIVE pools, update eventually to calculate ACTUAL pools
function getPool(binary){
	let pool = [[],[],[],[]];
	for(let i = 0; i < binary.length; i++){
		if(binary[i] == 1) {
			switch(i){
				case 0:
					pool[0] = [3, 6, 7, 10, 11, 14, 15];
					break;	
				case 1:
					pool[1] = [3, 5, 7, 9, 11, 13, 15];
					break;
				case 2:
					pool[2] = [9, 10, 11, 12, 13, 14, 15];
					break;	
				case 3:
					pool[3] = [5, 6, 7, 12, 13, 14, 15];
					break;
			}
		}
	}
	return pool;
}

// debugging
function printPool(pool){
	for(let i = 0; i < pool.length; i++)
		console.log(pool.at(i));
}

// Function that returns random integer from min (inclusive) to max - 1 (inclusive)
function randIntRange(min, max){
	return Math.floor(min + Math.random() * max);
}

// simple binary to decimal, ONLY accepts binary strings of size 4
function toDecimal(binaryStr){
	
	if(binaryStr == null)
		return -1;
	
	let result = 0;
	for(let i = 0; i < 4; i++){
		if(binaryStr[i] == 1){
			result += binaryStr[i] * Math.pow(2, 3-i);
		}
	}
	return result;
}

function determineNeighbors(_cell){
	for(let i = 0; i < _cell.pool.length; i++){
		
		// ONLY determine neighbor for the valid sides
		if(_cell.pool[i].length != 0){
			
			// choose a random index within our array of available neighbors
			let chosenNum = randIntRange(0,7);
			
			// We will set our respective neighbor to be the cell at the index
			// chosenNum in our array of available neighbors
			_cell.neighborCells[i] = bits[_cell.pool[i].at(chosenNum)];
			
			//// this prints out the possible choices for neighbor
			//console.log("debug start here -");
			//for(let p = 0; p < 7; p++){
			//	console.log(toDecimal(bits[_cell.pool[i].at(p)].value));
			//}
			
			// Now that our neighbor has been set, our pool is now empty
			//** This was good at first, but we want to remember out pools so comment out
			//_cell.pool[i] = [];
		}
		else {
			// POSSBILY TEMPORARY, this sets an inaccesible x-neighbor to be bits[0].
			_cell.neighborCells[i] = bits[0];
		}
	}
}

var bits = new Array(16);

for(let i = 0; i < bits.length; i++){
	bits[i] = new bit();
	bits[i].value = toBinary(i);
	bits[i].pool = getPool(bits[i].value);
	bits[i].sprite = new Image();
	bits[i].sprite.src = "sprites/cell_options/cell_option_" + (i) + ".png";
	
	bits[i].neighborCells = [[], [], [], []];
	//determineNeighbors(bits[i]);
}

////////////////////////////////////

// IMPORTANT FOR NOW, CONTROLLER CELL, STARTING POINT ================
let randomNum = randIntRange(1,15);
console.log(randomNum);
var cell = bits[randomNum];

determineNeighbors(cell);

//for(let i = 0; i < 4; i++){
//	console.log(i + "-neigbor : " + toDecimal(cell.neighborCells[i].value));
//}

/*
for(let i = 0; i < 4; i++){
	if(cell.pool[i].length > 0) {
		for(let j = 0; j < 7; j++){
			console.log(cell.pool[i].at(j));
		}
	}
}
*/

//console.log(cell.pool[i].at(j));

// Function to create a 2-D array
function create2DArray(cols, rows){
	let a = new Array(cols);
	
	for(let i = 0; i < cols; i++){
		a[i] = new Array(rows);
	}
	
	return a;
}


const GRID_WIDTH = 10;
const GRID_HEIGHT = GRID_WIDTH;
const CELL_WIDTH = 50;

var grid;



function CellTypeLibrary(){
	this.cellType = [];
	
	for(let i = 0; i < 15; i++){
		this.cellType[i] = new Image();
		this.cellType[i].src = "sprites/cell_options/cell_option_" + i + ".png";
	}
}


function Cell(xPos, yPos, width, bit){
	this.x = xPos;
	this.y = yPos;
	this.w = width;
	//this.image = new Image();
	this.bit = bit;
	
	
	//this.image.src = "sprites/cell_options/cell_option_" + 15 + ".png";
}

function printNeighbors(cell){
	let currCellBit = cell.bit;
	for(let j = 0; j < 4; j++){
		console.log(j + "-neigbor : " + toDecimal(currCellBit.neighborCells[j].value));
	}
}

// Find better spot to put these core variables
var currentX = Math.floor(GRID_WIDTH/2)-1;
var currentY = Math.floor(GRID_HEIGHT/2)-1
	
function setup(){
	createCanvas(GRID_WIDTH * CELL_WIDTH, GRID_HEIGHT * CELL_WIDTH);
	
	grid = create2DArray(GRID_WIDTH, GRID_HEIGHT);
	
	CellImages = new CellTypeLibrary();
	
	for(let _x = 0; _x < GRID_WIDTH; _x++){
		for(let _y = 0; _y < GRID_HEIGHT; _y++){
			grid[_x][_y] = new Cell(_x * CELL_WIDTH, _y * CELL_WIDTH, CELL_WIDTH, bits[0]);
			//grid[_x][_y].image.src = CellImages.cellType[0].src;			
		}
	}
	
	//grid[0][0].image.src = "sprites/cell_options/cell_option_" + 1 + ".png"; //CellImages.cellType[1];
	
	

	grid[currentX][currentY].bit = cell;
	
	determineNeighbors(grid[currentX][currentY].bit);
	printNeighbors(grid[currentX][currentY]);
	
	grid[currentX+1][currentY].bit = bits[toDecimal(grid[currentX][currentY].bit.neighborCells[0].value)];
	grid[currentX][currentY-1].bit = bits[toDecimal(grid[currentX][currentY].bit.neighborCells[1].value)];
	grid[currentX-1][currentY].bit = bits[toDecimal(grid[currentX][currentY].bit.neighborCells[2].value)];
	grid[currentX][currentY+1].bit = bits[toDecimal(grid[currentX][currentY].bit.neighborCells[3].value)];
	
	
	//let currCellBit = grid[currentX][currentY].bit;
	//for(let j = 0; j < 4; j++){
	//	console.log(j + "-neigbor : " + toDecimal(currCellBit.neighborCells[i].value));
	//}
	
}

function draw(){	
	let ctx = this.canvas.getContext("2d");
	
	for(let _x = 0; _x < GRID_WIDTH; _x++){
		for(let _y = 0; _y < GRID_HEIGHT; _y++){
			
			//grid[_x][_y].paint();
			ctx.drawImage(grid[_x][_y].bit.sprite, grid[_x][_y].x, grid[_x][_y].y, grid[_x][_y].w, grid[_x][_y].w);
			
		}
	}

	// prototype player
	ctx.arc(grid[currentX][currentY].x + grid[currentX][currentY].w/2, grid[currentX][currentY].y + grid[currentX][currentY].w/2, 5, 0, 2 * Math.PI);
	ctx.fillStyle = 'rgba(52, 128, 235,0.1)';
	ctx.fill();
}