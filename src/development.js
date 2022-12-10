// Book class
class Book {
	constructor(name, author, totalPages, imageUrl, pagesRead) {
		this._name = name;
		this._author = author;
		this._pagesRead = pagesRead;
		this._totalPages = totalPages;
		this._imageUrl = imageUrl;
	}

	get bookDetails() {
		return this;
	}

	set bookDetails(obj) {
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

	get bookList() {
		return this._bookList;
	}

	set bookList(book) {
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

		dummyBooks.forEach((book) => {
			this._bookList.push(book);
		});
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
