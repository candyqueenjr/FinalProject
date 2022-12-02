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
            authors = book.volumeInfo.publisher;
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