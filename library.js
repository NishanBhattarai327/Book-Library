class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	toggleRead() {
		if (this.read === 'Not read yet') {
			this.read = 'Already read';
		} else {
			this.read = 'Not read yet';
		}
	}
};

//all of book objs will be stored in this arrray
let library = [
	new Book('Harry Potter', 'J K Rowely', 550, 'Not read yet'),
	new Book('Fantastic beast', 'J K Rowely', 550, 'Not read yet')
];

let $displayBook = document.querySelector('#displayBook');
let $addBookButton = document.querySelector('#addNewBook');
let $form = document.querySelector('#form');

$addBookButton.addEventListener('click', addNewBook);
$form.addEventListener('submit', submitNewBook);

function addNewBook() {
	if ($form.style.display == 'block'){
		$form.style.display = 'none';
	} else {
		$form.style.display = 'block';
	}
}

function submitNewBook(event) {
	event.preventDefault();
	let read = $form.read.value ? 'Already read' : 'Not read yet';
	addBook($form.title.value, $form.author.value, $form.pages.value, read);
	renderBook();
	$form.title.value = '';
	$form.author.value = '';
	$form.pages.value = '';
	$form.read.value = '';
	$form.style.display = 'none';
}

//this function will add book objs to library
function addBook(title, author, pages, read) {
	let book = new Book(title, author, pages, read);
	library.push(book);
}

function removeAllChild(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

function renderBook() {
	removeAllChild($displayBook);
	library.forEach((book, index) => {
		let $book = document.createElement('div');
		$book.setAttribute('class', 'book');
		$book.setAttribute('data-index', index);

		let $removeButton = document.createElement('button');
		let $toggleReadButton = document.createElement('button');

		$toggleReadButton.setAttribute('class', 'toggleRead');
		$toggleReadButton.textContent = book.read;
		$toggleReadButton.addEventListener('click', (e) => {
			book.toggleRead();
			renderBook();
		});
		$removeButton.setAttribute('class', 'removeButton');
		$removeButton.textContent = "Remove";
		$removeButton.addEventListener('click', (e) => {
			library.splice(index);
			$removeButton.parentNode.remove();
		});

		for (let property in book) {
			let $property = document.createElement('div');
			$property.setAttribute('class', `bookProperty ${property}`);
			$property.innerHTML = `<div class='bookContent title'>${property}</div> <div class='bookContent value'>${book[property]}</div><br>`;
			$book.appendChild($property);
		}
		$book.appendChild($removeButton);
		$book.appendChild($toggleReadButton);
		$displayBook.appendChild($book); 
	});
}
renderBook();

