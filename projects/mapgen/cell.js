function Cell(xPos, yPos, width){
	this.x = xPos;
	this.y = yPos;
	this.w = width;
	
	this.isWalkedOn = false;
}

Cell.prototype.paint = function(){
	stroke('#534B62');		// Normal Color
	
	if(!this.isWalkedOn){
		fill('#534B62');	// Normal Color
	}
	
	if(this.isWalkedOn){
		fill('#A499B3');	// Light Color
	}
	
	rect(this.x, this.y, this.w, this.w);
}

Cell.prototype.steppedOn = function(){
	this.isWalkedOn = true;
}