function Cell(xPos, yPos, width){
	this.x = xPos;
	this.y = yPos;
	this.w = width;
	
	this.isWalkedOn = false;
}

Cell.prototype.paint = function(){
	stroke('#272c38');		// Normal Color
	
	if(!this.isWalkedOn){
		fill('#272c38');	// Normal Color
	}
	
	if(this.isWalkedOn){
		fill('#6f727a');	// Light Color
	}
	
	rect(this.x, this.y, this.w, this.w);
}

Cell.prototype.steppedOn = function(){
	this.isWalkedOn = true;
}