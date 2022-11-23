

//active class fro navigation

let navLink = document.querySelectorAll(".nav-link")
navLink.forEach( a =>{
    a.addEventListener('mouseover', function(){
        navLink.forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    })
})


//Logo eyes

window.requestAnimFrame = (function() {
				return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};
})();

var ctx,
    WIDTH,
    HEIGHT,
    leftEye,
    rightEye,
    mouse,

Eye = function(pos) {
  this.pos = {
		x : pos.x,
		y : pos.y
	};
	this.center = {
		x : pos.x,
		y : pos.y
	};
	this.translation = {
		x : (window.innerWidth / 3 - canvas.width / 3) + this.center.x,
		y : this.center.y
  };
}

Eye.prototype.draw = function() {
  ctx.beginPath();
	ctx.arc(this.pos.x, this.pos.y, 3, 0, Math.PI * 2);
	ctx.fillStyle = '#333';
	ctx.fill();
}

Eye.prototype.update = function() {
	var deltaX = mouse.x - this.translation.x;
	var deltaY = mouse.y - this.translation.y;
	var mag = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	var angleRad = Math.atan2(deltaY, deltaX);
	var newPosX = this.center.x + 6 * Math.cos(angleRad);
	var newPosY = this.center.y + 11 * Math.sin(angleRad);
	this.pos.x += (newPosX - this.pos.x) / 5;
	this.pos.y += (newPosY - this.pos.y) / 5;
}
			
var init = function() {
  var canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	canvas.width = WIDTH = 750;
	canvas.height = HEIGHT = 85;
	leftEye = new Eye({
	  x : WIDTH / 2 - 14,
		y : HEIGHT / 2 + 18
	});
	rightEye = new Eye({
		x : WIDTH / 2 + 8,
		y : HEIGHT / 2 + 18
	});
	mouse = {
		x : 0,
		y : 0
	};
	bindEventHandlers();
	draw();
}
    
var draw = function() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
	leftEye.update();
	rightEye.update();
	leftEye.draw();
	rightEye.draw();
  requestAnimFrame(draw);
}
    
var bindEventHandlers = function() {
  document.onmousemove = function(e) {
	  mouse.x = e.pageX;
		mouse.y = e.pageY;
	}
}

init();




//header typewritter

var _CONTENT = [ "Explode", "Blow up", "Detonate", "Boom" ];

// Current sentence being processed
var _PART = 0;

// Character number of the current sentence being processed 
var _PART_INDEX = 0;

// Holds the handle returned from setInterval
var _INTERVAL_VAL;

// Element that holds the text
var _ELEMENT = document.querySelector("#text");

// Implements typing effect
function Type() { 
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX++;

	// If full sentence has been displayed then start to delete the sentence after some time
	if(text === _CONTENT[_PART]) {
		clearInterval(_INTERVAL_VAL);
		setTimeout(function() {
			_INTERVAL_VAL = setInterval(Delete, 150);
		}, 1000);
	}
}

// Implements deleting effect
function Delete() {
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX--;

	// If sentence has been deleted then start to display the next sentence
	if(text === '') {
		clearInterval(_INTERVAL_VAL);

		// If last sentence then display the first one, else move to the next
		if(_PART == (_CONTENT.length - 1))
			_PART = 0;
		else
			_PART++;
		_PART_INDEX = 0;

		// Start to display the next sentence after some time
		setTimeout(function() {
			_INTERVAL_VAL = setInterval(Type, 150);
		}, 200);
	}
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 150);




//moving eyes

//  document.querySelector("body").addEventListener('mousemove', eyeball);
//        function eyeball(){
//         var eye = document.querySelectorAll(".eye");
//         eye.forEach(function (eye) {
//         let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2); 
//         let y= (eye.getBoundingClientRect().top) + (eye.clientHeight / 2); 
//         let radian = Math.atan2(event.pageX - x,event.pageY - y);
//         let rot = (radian * (180 / Math.PI) * -1) + 270;
//         eye.style.transform = "rotate("+ rot +"deg)";
//           })
           
//        }