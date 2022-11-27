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
		totalPages.value,
		imageUrl.value,
		pagesRead.value
	);
	books.push(inputBook);
	closeModal();
}
