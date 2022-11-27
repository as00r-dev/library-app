// Make new book modal work

const newBook = document.querySelector("header button");
const inputForm = document.querySelector(".input");
const cross = document.querySelector(".cross");

newBook.addEventListener("click", openModal);
cross.addEventListener("click", closeModal);

function openModal() {
	inputForm.style.display = "flex";
}

function closeModal() {
	inputForm.style.display = "none";
}

// Add book

const books = [];

function Book(name, author, totalPages, imageUrl, pagesRead) {
	this.name = name;
	this.author = author;
	this.pagesRead = pagesRead;
	this.totalPages = totalPages;
	this.imageUrl = imageUrl;
}

const addBook = document.querySelector("form input[type='submit'");

addBook.addEventListener("click", addBookToArray);

function addBookToArray(e) {
	e.preventDefault();
	const name = document.querySelector("form .name");
	const author = document.querySelector("form .author");
	const totalPages = document.querySelector("form .total-pages");
	const pagesRead = document.querySelector("form .pages-read");
	const imageUrl = document.querySelector("form .image-url");
	const inputBook = new Book(
		name.value,
		author.value,
		Number(totalPages.value),
		imageUrl.value,
		Number(pagesRead.value)
	);
	books.push(inputBook);
	clearScreen();
	renderBooks();
	closeModal();
}

// Render Books from books array

const bookshelf = document.querySelector(".bookshelf");
const filterRead = document.querySelector(".filter-option.read .read-books");
const filterReading = document.querySelector(
	".filter-option.reading .reading-books"
);
const filterToRead = document.querySelector(
	".filter-option.to-read .to-read-books"
);
function renderBooks() {
	let reading = 0;
	let finished = 0;
	let notStarted = 0;
	books.forEach((book) => {
		const bookWrapper = document.createElement("div");
		bookWrapper.classList.add("book");
		bookWrapper.style.setProperty("--image", `url(${book.imageUrl})`);
		const bookName = document.createElement("div");
		bookName.classList.add("book-name");
		bookName.textContent = "Name: " + book.name;
		const authorName = document.createElement("div");
		authorName.classList.add("author");
		authorName.textContent = "Author: " + book.author;
		const readPages = document.createElement("div");
		readPages.classList.add("read-pages");
		readPages.textContent = "Pages Read: " + book.pagesRead;
		const totalPages = document.createElement("div");
		totalPages.classList.add("total-pages");
		totalPages.textContent = "Total Pages: " + book.totalPages;
		bookWrapper.append(bookName, authorName, readPages, totalPages);
		bookshelf.appendChild(bookWrapper);
		if (book.pagesRead === 0) {
			notStarted++;
		} else if (book.pagesRead < book.totalPages && book.pagesRead > 0) {
			reading++;
		} else if (book.totalPages === book.pagesRead) {
			finished++;
		}
		filterRead.innerHTML = "";
		filterRead.textContent = finished;
		filterToRead.innerHTML = "";
		filterToRead.textContent = notStarted;
		filterReading.innerHTML = "";
		filterReading.textContent = reading;
	});
}

function clearScreen() {
	bookshelf.innerHTML = "";
}
