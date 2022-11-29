
//#region active class for navigation

let navLink = document.querySelectorAll(".nav-link")
navLink.forEach( a =>{
    a.addEventListener('mouseover', function(){
        navLink.forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    })
})

//#endregion



//#region Logo eyes
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

//#endregion



//#region header typeWriter

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

function Delete() {
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX--;

	if(text === '') {
		clearInterval(_INTERVAL_VAL);

		if(_PART == (_CONTENT.length - 1))
			_PART = 0;
		else
			_PART++;
		_PART_INDEX = 0;

		setTimeout(function() {
			_INTERVAL_VAL = setInterval(Type, 150);
		}, 200);
	}
}

_INTERVAL_VAL = setInterval(Type, 150);

//#endregion



//#region Timer


(function () {
	const second = 999,
	  minute = second * 60,
	  hour = minute * 60,
	  day = hour * 24;
  
	let today = new Date(),
	  dd = String(today.getDate()).padStart(2, "0"),
	  mm = String(today.getMonth() + 1).padStart(2, "0"),
	  yyyy = today.getFullYear(),
	  nextYear = yyyy + 1,
	  dayMonth = "10/18/",
	  birthday = dayMonth + yyyy;
  
	today = mm + "/" + dd + "/" + yyyy;
	if (today > birthday) {
	  birthday = dayMonth + nextYear;
	}

	
	const countDown = new Date(birthday).getTime(),
	  x = setInterval(function () {
		const now = new Date().getTime(),
		  distance = countDown - now;
  
		(document.getElementById("days").innerText = Math.floor(distance / day)),
		  (document.getElementById("hours").innerText = Math.floor(
			(distance % day) / hour
		  )),
		  (document.getElementById("minutes").innerText = Math.floor(
			(distance % hour) / minute
		  )),
		  (document.getElementById("seconds").innerText = Math.floor(
			(distance % minute) / second
		  ));
  
		if (distance < 0) {
		  document.getElementById("headline").innerText = "All BOOKS are BOOM";
		  document.getElementById("countdown").style.display = "none";
		  clearInterval(x);
		}
	  }, 0);
  })();
  
  //#endregion




const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=time&printType=books&key=AIzaSyB6UbkiRzJpKT26g1WLRTiBjDl0J90SCe0'
// const IMG_PATH = ''
// const SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes?q=search+terms'


const main = document.getElementById('main')

getBooks(API_URL)


async function getBooks(url) {
	const res = await fetch(url)
	const data = await res.json()

	showBooks(data)
}

function showBooks(books) {
	main.innerHTML = ''

	books.forEach((book) => {
		const { title, poster_path, vote_average, overview} = book

		const bookEl = document.createElement
		('div')
		bookEl.classList.add('book')

		bookEl.innerHTML = `
          <img
            src="${IMG_PATH + poster_path}"
			alt = "${title}"
          />
          <div class="book-info">
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            <h3>${title}</h3>
          </div>
          <div class="overview">
            <h3>overview</h3>
			${overview}
          </div>
		`
		main.appendChild(bookEl)
	})
}

function getClassByRate (vote) {
	if(vote >= 8) {
		return 'green'
	} else if(vote >=5) {
		return 'orange'
	} else {
		return 'red'
	}
}