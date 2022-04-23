// This effect was learned at https://codepen.io/jayadul/pen/WNNwQmp, the code below is
// an altered inspiration

// BUBBLE CLASS //////////////////////////////////////////////////////////////////////
class Bubble {
	constructor(canvasWidth, canvasHeight) {
		// Core variable initialization
		this.maxWidth = canvasWidth;
		this.maxHeight = canvasHeight;
		this.color = 'rgba(15, 20, 34, 0.5)';
		this.size = this.randomIntegerRange(75, 100);
		
		this.generate();
	}
	
	// Generate decimal between range to two decimal places
	randomDecimalRange(min, max) {
		return (Math.random() * (max - min) + min).toFixed(2);
	}
	
	// Generate integer between range
	randomIntegerRange(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}
	
	// First time bubble generation
	generate() {
		this.hspd = this.randomDecimalRange(-0.2, 0.2);
		this.vspd = this.randomDecimalRange(0.3, 0.6);
		
		// Generate the Bubbles on 40% of the right-hand side of the screen
		this.x = this.randomIntegerRange(this.maxWidth * 0.5, this.maxWidth);
		
		// Initially generate randomly in the y-axis
		this.y = this.randomIntegerRange(0, this.maxHeight);
	}
	
	// Bubble regeneration
	regenerate() {
		this.generate();
		
		// Override preexisting y as to always regenerate at the bottom of the screen
		this.y = this.maxHeight + this.size;
	}
	
	update() {
		// Move the Bubble
		this.x -= this.hspd;
		this.y -= this.vspd;
		
		// If bubble reaches outside of canvas
		if(this.x < -this.size || this.x > this.maxWidth + this.size || this.y < -this.size) {
			this.regenerate();
		}
	}
}

// BACKGROUND CLASS //////////////////////////////////////////////////////////////////////
class Background {
	constructor() {
		this.canvas = document.getElementById("bubbles");
		this.ctx = this.canvas.getContext("2d");
		this.canvas.height = window.innerHeight;
		this.canvas.width = window.innerWidth;
		
		this.bubbleList = [];
		this.generateBubbles();
		this.animate();
	}
	
	animate() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		for(let i = 0; i < this.bubbleList.length; i++){
			this.bubbleList[i].update();	
			this.ctx.beginPath();
			this.ctx.arc(this.bubbleList[i].x, this.bubbleList[i].y, this.bubbleList[i].size, 0, 2*Math.PI);
			this.ctx.fillStyle = this.bubbleList[i].color;
			this.ctx.fill();
			this.ctx.strokeStyle = this.bubbleList[i].color;
			this.ctx.stroke();
		}
		
		requestAnimationFrame(this.animate.bind(this));
	}
	
	pushBubble(b) {
		return this.bubbleList.push(b);
	}
	
	bubbleCount() {
		return 4;
	}
	
	generateBubbles() {
		for(let i = 0; i < this.bubbleCount(); i++){
			this.pushBubble(new Bubble(this.canvas.width, this.canvas.height));
		}
	}
}

// Window Handling 
window.onload = function() {
	new Background();
}

window.requestAnimFrame = (function() {
	return (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		}
	);
})();