// variables and selectors
const newBook = document.querySelector("header button");
const inputForm = document.querySelector(".input");
const cross = document.querySelector(".cross");
const addBook = document.querySelector("form input[type='submit'");
const bookshelf = document.querySelector(".bookshelf");
const filterRead = document.querySelector(".filter-option.read .read-books");
const filterReading = document.querySelector(
	".filter-option.reading .reading-books"
);
const filterToRead = document.querySelector(
	".filter-option.to-read .to-read-books"
);
const allInputs = document.querySelectorAll(".book input");
const filterAll = document.querySelector(".filter-option.all .all-books");
const books = [
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

// Event Listeners
newBook.addEventListener("click", openModal);
cross.addEventListener("click", closeModal);
addBook.addEventListener("click", addBookToArray);

// Make new book modal work
function openModal() {
	inputForm.style.display = "flex";
}

function closeModal() {
	inputForm.style.display = "none";
}

// Book Constructor
function Book(name, author, totalPages, imageUrl, pagesRead) {
	this.name = name;
	this.author = author;
	this.pagesRead = pagesRead;
	this.totalPages = totalPages;
	this.imageUrl = imageUrl;
}

// Add Books from user input to array
function addBookToArray(e) {
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
		books.push(inputBook);
	}
	clearScreen();
	renderBooks();
	closeModal();
}

// Render Books from books array
function renderBooks() {
	let all = books.length;
	let reading = 0;
	let finished = 0;
	let notStarted = 0;
	books.forEach((book) => {
		const bookWrapper = document.createElement("div");
		bookWrapper.classList.add("book");
		if (isValidUrl(book.imageUrl)) {
			bookWrapper.style.setProperty("--background", `url(${book.imageUrl})`);
		} else {
			bookWrapper.style.setProperty("--background", `var(--white`);
		}
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
		const editPagesInput = document.createElement("input");
		editPagesInput.placeholder = "Write updated pages read";
		editPagesInput.id = book.name;
		editPagesInput.classList.add("edit-pages-input");
		editPagesInput.type = "number";
		const editPagesRead = document.createElement("button");
		editPagesRead.textContent = "Edit Pages Read";
		editPagesRead.value = book.name;
		editPagesRead.classList.add("edit-page-read");
		const deleteBook = document.createElement("button");
		deleteBook.classList.add("delete-book");
		deleteBook.textContent = "Delete";
		deleteBook.value = book.name;
		bookWrapper.append(
			bookName,
			authorName,
			readPages,
			totalPages,
			editPagesInput,
			editPagesRead,
			deleteBook
		);
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
		filterAll.innerHTML = "";
		filterAll.textContent = all;
	});
	const deleteButtons = document.querySelectorAll(".book button.delete-book");

	deleteButtons.forEach((btn) => {
		btn.addEventListener("click", deleteBookHandler);
	});

	const editPagesReadButtons = document.querySelectorAll(
		".book button.edit-page-read"
	);

	editPagesReadButtons.forEach((btn) => {
		btn.addEventListener("click", updatePagesRead);
	});
}

// Clear Screen before rendering books so no duplication occurs
function clearScreen() {
	bookshelf.innerHTML = "";
}

// Delete Book
function deleteBookHandler(e) {
	const bookName = e.target.value;
	books.forEach((book) => {
		if (book.name === bookName) {
			const index = books.indexOf(book);
			if (index > -1) {
				books.splice(index, 1);
			}
		}
		clearScreen();
		renderBooks();
	});
}

// Edit Pages Read
function updatePagesRead(e) {
	const bookName = e.target.previousElementSibling.id;
	books.forEach((book) => {
		if (book.name === bookName) {
			book.pagesRead = Number(e.target.previousElementSibling.value);
		}
		clearScreen();
		renderBooks();
	});
}

// Check valid url
function isValidUrl(urlString) {
	var urlPattern = new RegExp(
		"^(https?:\\/\\/)?" + // validate protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
			"(\\#[-a-z\\d_]*)?$",
		"i"
	); // validate fragment locator
	return !!urlPattern.test(urlString);
}

// Call render book to render initial books
renderBooks();
