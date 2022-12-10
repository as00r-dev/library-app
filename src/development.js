// Book class
class Book {
	constructor(name, author, totalPages, imageUrl, pagesRead) {
		this._name = name;
		this._author = author;
		this._pagesRead = pagesRead;
		this._totalPages = totalPages;
		this._imageUrl = imageUrl;
	}

	showBookDetails() {
		return this;
	}

	updateBookDetails(obj) {
		if (obj.name) this._name = obj.name;
		if (obj.author) this._author = obj.author;
		if (obj.pagesRead) this._pagesRead = obj.pagesRead;
		if (obj.totalPages) this._totalPages = obj.totalPages;
		if (obj.imageUrl) this._imageUrl = obj.imageUrl;
	}
}

// Library class
class Library {
	constructor() {
		this._bookList = [];
		this._allBooks = 0;
		this._finishedBooks = 0;
		this._readingBooks = 0;
		this._toStartBooks = 0;
	}

	showBookList() {
		return this._bookList;
	}

	pushToBookList(book) {
		this._bookList.push(book);
	}

	addDummyBooks() {
		const dummyBooks = [
			new Book(
				"Crime and Punishment",
				"Dostoevsky",
				485,
				"https://m.media-amazon.com/images/I/A193gO2P8WL.jpg",
				485
			),
			new Book(
				"The Brothers Karamazov",
				"Dostoevsky",
				880,
				"https://m.media-amazon.com/images/I/71OZJsgZzQL.jpg",
				644
			),
			new Book(
				"Raat Pashmine Ki",
				"Gulzaar",
				200,
				"https://m.media-amazon.com/images/I/41fyzq32nfL.jpg",
				13
			),
			new Book(
				"The Iliad",
				"Homer",
				352,
				"https://m.media-amazon.com/images/I/71CdBsMx42L.jpg",
				158
			),
			new Book(
				"Tomb of Sand",
				"Dostoevsky",
				716,
				"https://m.media-amazon.com/images/I/81vHR1cX5eL.jpg",
				0
			),
			new Book(
				"The Story Of Philosophy",
				"Will Durant",
				700,
				"https://m.media-amazon.com/images/I/71SHr0oIiyL.jpg",
				157
			),
			new Book(
				"The Art Of War",
				"Sun Tzu",
				103,
				"https://m.media-amazon.com/images/I/71Ow6MUOx2L.jpg",
				103
			),
			new Book(
				"Meditations",
				"Marcus Aurelius",
				149,
				"https://m.media-amazon.com/images/I/817HOFZewXL.jpg",
				22
			),
			new Book(
				"Thus Spoke Zarathustra",
				"Nietzsche",
				332,
				"https://m.media-amazon.com/images/I/9176A9Hpd2L.jpg",
				25
			),
			new Book(
				"Chanakya Neeti",
				"Chanakya",
				152,
				"https://m.media-amazon.com/images/I/81NFENSYUwL.jpg",
				0
			),
			new Book(
				"How to Win Friends & Influence People",
				"Dale Carnegie",
				364,
				"https://m.media-amazon.com/images/I/611OWa8x+WL.jpg",
				364
			),
			new Book(
				"The Art of Thinking Clearly",
				"Rof Dobelli",
				326,
				"https://m.media-amazon.com/images/I/41IjIRNIH7L.jpg",
				326
			),
			new Book(
				"How To Read a Book",
				"Mortimer J Adler, Charles Van Doren",
				424,
				"https://m.media-amazon.com/images/I/51EG8AyJiQL._SX320_BO1,204,203,200_.jpg",
				424
			),
			new Book(
				"Freakonomics",
				"Steven D Levitt, Stephen J Dubner",
				315,
				"https://m.media-amazon.com/images/I/51gYI2oq6KL.jpg",
				315
			),
		];
		if (this._bookList.length === 0) {
			dummyBooks.forEach((book) => {
				this._bookList.push(book);
			});
		}
	}

	countBookStats() {
		this._allBooks = this._bookList.length();
		this._bookList.forEach((book) => {
			if (book._pagesRead === 0) {
				this._toStartBooks++;
			} else if (book._pagesRead < book._totalPages && book._pagesRead > 0) {
				this._readingBooks++;
			} else if (book._totalPages === book._pagesRead) {
				this._finishedBooks++;
			}
		});
	}
}

// library object
const library = new Library();
library.addDummyBooks();

// ui class
class ui {
	newBook = document.querySelector("header button");
	inputForm = document.querySelector(".input");
	cross = document.querySelector(".cross");
	addBook = document.querySelector("form input[type='submit'");
	bookshelf = document.querySelector(".bookshelf");
	filterRead = document.querySelector(".filter-option.read .read-books");
	filterReading = document.querySelector(
		".filter-option.reading .reading-books"
	);
	filterToRead = document.querySelector(
		".filter-option.to-read .to-read-books"
	);
	allInputs = document.querySelectorAll(".book input");
	filterAll = document.querySelector(".filter-option.all .all-books");
	constructor() {
		// cache dom elements
	}

	// add event listeners
	addEventListeners() {
		this.newBook.addEventListener("click", (e) => {
			this.inputForm.style.display = "flex";
		});
		this.cross.addEventListener("click", (e) => {
			this.inputForm.style.display = "none";
		});
		this.addBook.addEventListener("click", (e) => {
			// weird right?
			const dc = new ui();
			e.preventDefault();
			const name = document.querySelector("form .name");
			const author = document.querySelector("form .author");
			const totalPages = document.querySelector("form .total-pages");
			const pagesRead = document.querySelector("form .pages-read");
			const imageUrl = document.querySelector("form .image-url");
			if (name.value && author.value && totalPages && pagesRead && imageUrl) {
				const inputBook = new Book(
					name.value,
					author.value,
					Number(totalPages.value),
					imageUrl.value,
					Number(pagesRead.value)
				);
				library.showBookList().push(inputBook);
			}
			this.inputForm.style.display = "none";
			dc.bookshelf.innerHTML = "";
			dc.renderBooks();
		});
	}

	// manage book deletion
	deleteBookHandler(e) {
		const dc = new ui();
		const bookName = e.target.value;
		library._bookList.forEach((book) => {
			if (book._name === bookName) {
				const index = library._bookList.indexOf(book);
				if (index > -1) {
					library._bookList.splice(index, 1);
				}
			}
		});
		dc.renderBooks();
	}

	//update pages read
	updatePagesRead(e) {
		const dc = new ui();
		const bookName = e.target.previousElementSibling.id;
		library._bookList.forEach((book) => {
			if (book._name === bookName) {
				book._pagesRead = Number(e.target.previousElementSibling.value);
			}
		});
		dc.renderBooks();
	}

	// render books
	renderBooks() {
		this.bookshelf.innerHTML = "";
		const books = library.showBookList();
		books.forEach((book) => {
			this.createBookElement(book);
		});
		const deleteButtons = document.querySelectorAll(".book button.delete-book");

		deleteButtons.forEach((btn) => {
			btn.addEventListener("click", this.deleteBookHandler);
		});

		const editPagesReadButtons = document.querySelectorAll(
			".book button.edit-page-read"
		);

		editPagesReadButtons.forEach((btn) => {
			btn.addEventListener("click", this.updatePagesRead);
		});
	}

	// create a book ui element
	createBookElement(book) {
		const bookElemWrapper = document.createElement("div");
		bookElemWrapper.classList.add("book");
		bookElemWrapper.style.setProperty("--background", `url(${book._imageUrl}`);
		const bookName = document.createElement("div");
		bookName.classList.add("book-name");
		bookName.textContent = "Name: " + book._name;
		const authorName = document.createElement("div");
		authorName.classList.add("author");
		authorName.textContent = "Author: " + book._author;
		const readPages = document.createElement("div");
		readPages.classList.add("read-pages");
		readPages.textContent = "Pages Read: " + book._pagesRead;
		const totalPages = document.createElement("div");
		totalPages.classList.add("total-pages");
		totalPages.textContent = "Total Pages: " + book._totalPages;
		const editPagesInput = document.createElement("input");
		editPagesInput.placeholder = "Write updated pages read";
		editPagesInput.id = book._name;
		editPagesInput.classList.add("edit-pages-input");
		editPagesInput.type = "number";
		const editPagesRead = document.createElement("button");
		editPagesRead.textContent = "Edit Pages Read";
		editPagesRead.value = book._name;
		editPagesRead.classList.add("edit-page-read");
		const deleteBook = document.createElement("button");
		deleteBook.classList.add("delete-book");
		deleteBook.textContent = "Delete";
		deleteBook.value = book._name;
		bookElemWrapper.append(
			bookName,
			authorName,
			readPages,
			totalPages,
			editPagesInput,
			editPagesRead,
			deleteBook
		);
		this.bookshelf.appendChild(bookElemWrapper);
	}
}

const displayController = new ui();
displayController.addEventListeners();
displayController.renderBooks();
