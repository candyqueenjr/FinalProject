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

// window.requestAnimFrame = (function() {
// 				return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
//   function(callback) {
// 	  window.setTimeout(callback, 1000 / 60);
// 	};
// })();

// var ctx,
//     WIDTH,
//     HEIGHT,
//     leftEye,
//     rightEye,
//     mouse,

// Eye = function(pos) {
//   	this.pos = {
// 		x : pos.x,
// 		y : pos.y
// 	};
// 	this.center = {
// 		x : pos.x,
// 		y : pos.y
// 	};
// 	this.translation = {
// 		x : (window.innerWidth / 3 - canvas.width / 3) + this.center.x,
// 		y : this.center.y
//   };
// }

// Eye.prototype.draw = function() {
//   	ctx.beginPath();
// 	ctx.arc(this.pos.x, this.pos.y, 3, 0, Math.PI * 2);
// 	ctx.fillStyle = '#333';
// 	ctx.fill();
// }

// Eye.prototype.update = function() {
// 	var deltaX = mouse.x - this.translation.x;
// 	var deltaY = mouse.y - this.translation.y;
// 	var mag = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
// 	var angleRad = Math.atan2(deltaY, deltaX);
// 	var newPosX = this.center.x + 6 * Math.cos(angleRad);
// 	var newPosY = this.center.y + 11 * Math.sin(angleRad);
// 	this.pos.x += (newPosX - this.pos.x) / 5;
// 	this.pos.y += (newPosY - this.pos.y) / 5;
// }
			
// var init = function() {
//   var canvas = document.getElementById('canvas');
// 	ctx = canvas.getContext('2d');
// 	canvas.width = WIDTH = 750;
// 	canvas.height = HEIGHT = 85;
// 	leftEye = new Eye({
// 	  	x : WIDTH / 2 - 14,
// 		y : HEIGHT / 2 + 18
// 	});
// 	rightEye = new Eye({
// 		x : WIDTH / 2 + 8,
// 		y : HEIGHT / 2 + 18
// 	});
// 	mouse = {
// 		x : 0,
// 		y : 0
// 	};
// 	bindEventHandlers();
// 	draw();
// }
    
// var draw = function() {
//   	ctx.clearRect(0, 0, WIDTH, HEIGHT);
// 	leftEye.update();
// 	rightEye.update();
// 	leftEye.draw();
// 	rightEye.draw();
//   	requestAnimFrame(draw);
// }
    
// var bindEventHandlers = function() {
//   	document.onmousemove = function(e) {
// 	  	mouse.x = e.pageX;
// 		mouse.y = e.pageY;
// 	}
// }

// init();

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



//#region book API



async function boooks(){
	const books = await fetch("https://www.googleapis.com/books/v1/volumes?q=time&printType=books&key=AIzaSyB6UbkiRzJpKT26g1WLRTiBjDl0J90SCe0")
	const objOfBooks = await books.json()
	const mzaObieqti = []
	console.log(objOfBooks)
	objOfBooks.items.forEach(book => {
		// title
		let title = book.volumeInfo.title
		console.log(title)
		// authors
		let authors = book.volumeInfo.authors
		if(book.volumeInfo.authors == undefined){
			authors = book.volumeInfo.publisher
		}
		console.log(authors)
		// // publishedDate
		// let publishedDate = book.volumeInfo.publishedDate
		// if(book.volumeInfo.publishedDate == undefined){
		// 	publishedDate = 1997
		// }
		// try {
		// 	publishedDate = publishedDate.split("-")[0]
		// } catch {
		// 	publishedDate = publishedDate
		// }
		// console.log(publishedDate)
		// images
		let image = book.volumeInfo.imageLinks.thumbnail
		console.log(image)
		const droebitiObieqti = {
			"title": title,
			"image": image,
			"authors": authors,
			// "publishedDate": publishedDate
		}
		mzaObieqti.push(droebitiObieqti)
	});
	showBooks(mzaObieqti)
}

boooks()

const main = document.getElementById('main')

function showBooks(books) {
	main.innerHTML = '';

	books.forEach((book) => {
		const { title, image, authors} = book

		const bookEl = document.createElement('div')
		bookEl.classList.add('book')

		bookEl.innerHTML = `

          <a href="https://en.wikipedia.org/wiki/Book" target="_blank""><img
            src="${image}"
			alt = "${title}"
          /></a>
          <div class="book-info">
		  <h3 class="title">${title}</h3>
            <span class="authors">${title}</span>
          </div>
		  <div class="overview">
          <h3></h3>
          ${authors}
        </div>

		`

		main.appendChild(bookEl)
	})
}
//#endregion



const navBtns = document.querySelector('.nav-btns');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelectorAll('.nav-icons');
let opacity = 0; 
let openNav = false;

menuBtn.addEventListener('click', navigationCheck);

navLinks.forEach(link => {
  link.addEventListener('click',navigationCheck);  
})

function navigationCheck(){
    if(openNav === true){
    openNav = false;
  }
  else{
    openNav = true;    
  }
  showNavBtns();
}

function showNavBtns(){  
  
      let addableOpacity = openNav ? 0.05 : -0.05;
      let position = openNav ? 'initial' : 'absolute';
      let transformationDistance = openNav ? '0':'-200px';
      let transformationAngle = openNav ? '360deg' : '0deg'
        
      let intervalMethod = setInterval(() =>{
        if((addableOpacity > 0 && opacity > 1) ||(addableOpacity < 0 && opacity < 0) ){
          clearInterval(intervalMethod);
        }
        opacity+= addableOpacity;
        navBtns.style.opacity = opacity;
      }, 10) 
    
    
      
      navLinks.forEach(link =>{
        link.style.transform = `rotateZ(${transformationAngle})`;
      })
  
}