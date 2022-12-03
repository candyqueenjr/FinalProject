//#region 
//sticky header

const header = document.querySelector('.header');

window.onscroll = function () {
    var top = window.scrollY;
    console.log(top);
    if (top >= 100) {
        header.classList.add('activee')
    } else {
        header.classList.remove('activee');
    }
}

//#endregion

//#region active class for navigation

let navLink = document.querySelectorAll(".nav-link");
navLink.forEach((a) => {
    a.addEventListener("mouseover", function () {
        navLink.forEach((a) => a.classList.remove("active"));
        this.classList.add("active");
    });
});

//#endregion

//#region 
//cursor following eyes

var balls = document.getElementsByClassName("ball");
document.onmousemove = function(event){
  var x = event.clientX * 100 / window.innerWidth + "%";
  var y = event.clientY * 100 / window.innerHeight + "%";

  for(var i = 0; i < 2; i++){
    balls[i].style.left = x;
    balls[i].style.top = y;
    balls[i].style.transform = "translate(-"+x+",-"+y+")";
  }
}



//#endregion

//#region header typeWriter

var _CONTENT = ["Explode", "Blow up", "Detonate", "Boom"];

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
    var text = _CONTENT[_PART].substring(0, _PART_INDEX + 1);
    _ELEMENT.innerHTML = text;
    _PART_INDEX++;

// If full sentence has been displayed then start to delete the sentence after some time
    if (text === _CONTENT[_PART]) {
        clearInterval(_INTERVAL_VAL);
        setTimeout(function () {
            _INTERVAL_VAL = setInterval(Delete, 150);
        }, 1000);
    }
}

function Delete() {
    var text = _CONTENT[_PART].substring(0, _PART_INDEX - 1);
    _ELEMENT.innerHTML = text;
    _PART_INDEX--;

    if (text === "") {
        clearInterval(_INTERVAL_VAL);

        if (_PART == _CONTENT.length - 1) _PART = 0;
        else _PART++;
        _PART_INDEX = 0;

        setTimeout(function () {
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
        dayMonth = "12/5/",
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

async function boooks() {
    const books = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=search+terms"
    );
    const objOfBooks = await books.json();
    const mzaObieqti = [];
    // console.log(objOfBooks)
    objOfBooks.items.forEach((book) => {
        // title
        let title = book.volumeInfo.title;
        // console.log(title)
        // authors
        let authors = book.volumeInfo.authors;
        if (book.volumeInfo.authors == undefined) {
            authors = "ბებიაჩემი";
        }

        //Description
        let description = book.volumeInfo.description;
        if (book.volumeInfo.description == undefined) {
            description = book.etag;
        }

        // images
        let image = book.volumeInfo.imageLinks.thumbnail;

        // console.log(image)
        const droebitiObieqti = {
            title: title,
            image: image,
            authors: authors,
            description: description
        };
        mzaObieqti.push(droebitiObieqti);
    });
    showBooks(mzaObieqti);
}

boooks();

const main = document.getElementById("main");

function showBooks(books) {
    main.innerHTML = "";

    books.forEach((book) => {
        const { title, image, authors, description } = book;

        const bookEl = document.createElement("div");
        bookEl.classList.add("book");

        bookEl.innerHTML = `
          <img
            src="${image}"
			alt = "${title}"
          />
          <div class="book-info">
		  <h3 class="title">${title}</h3>
            <span class="authors">${title}</span>
          </div>
		  <div class="overview">
          <h3></h3>
          ${authors}
        </div>
		`;
        main.appendChild(bookEl);
        bookEl.addEventListener("click", () => {
            console.log(book);
        });
        //
        const modal = document.getElementById("myModal");
        const modalContent = document.getElementById("modal-content");
        const close = document.getElementsByClassName("close")[0];
        bookEl.onclick = function () {
            modal.style.display = "block";
        };
        close.onclick = () => {
            modal.style.display = "none";
        };

        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
        modalContent.innerHTML = `
	<div class="modal-content">
	<div class="col-5">
	<span class="close">&times;</span>
	<img class="modal-img" src="${image}"alt = "${title}"/>
	</div>
	<div class="col-7">
	<h2 class="modal-title">${title}</h2>
	<p class="modal-p">${authors}</p>
	<p class="modal-desc">${description}</p>
  <button class="red-btn">Explode book</button>
  <button class="gray-btn">Add to wishlist</button>
  <a class="modal-a" href="#">Start your 30 day  free trial</a>
	
	</div>
			</div>
			`;
    });
}
//#endregion
// on book class click show overview

