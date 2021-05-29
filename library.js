////////////////////////////////////////////////////////////////
///////////////////////Functions and Class//////////////////////
////////////////////////////////////////////////////////////////

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
};

function toggleRead(bookObj) {
	if (bookObj.read === 'Not read yet') {
		bookObj.read = 'Already read';
	} else {
		bookObj.read = 'Not read yet';
	}
}

function updateStorage(book = null) {
	if (book !== null) {
		library.push(book);
	}
	localStorage.setItem('library', JSON.stringify(library));
}

function toggleForm() {
	if ($form.style.display == 'block'){
		$form.style.display = 'none';
	} else {
		$form.style.display = 'block';
	}
}

function submitNewBook(event) {
	event.preventDefault();
	let read = $form.read.checked ? 'Already read' : 'Not read yet';
	addBookToLibrary($form.title.value, $form.author.value, $form.pages.value, read);
	renderBook();
	$form.title.value = '';
	$form.author.value = '';
	$form.pages.value = '';
	$form.read.checked = false;
	$form.style.display = 'none';
}

//this function will add book objs to library
function addBookToLibrary(title, author, pages, read) {
	let book = new Book(title, author, pages, read);
	updateStorage(book);
}

function removeAllChild(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

function renderBook() {
	removeAllChild($bookRenderingSpace);
	library.forEach((book, index) => {
		let $bookCard = document.createElement('div');
		$bookCard.setAttribute('class', 'book');

		let $bookRemoveBtn = document.createElement('button');
		let $bookToggleReadBtn = document.createElement('button');

		$bookToggleReadBtn.setAttribute('class', 'book-toggle-read-btn');
		$bookToggleReadBtn.textContent = book.read;
		$bookToggleReadBtn.addEventListener('click', (e) => {
			toggleRead(book);
			updateStorage();
			renderBook();
		});
		$bookRemoveBtn.setAttribute('class', 'book-remove-btn');
		$bookRemoveBtn.textContent = "Remove";
		$bookRemoveBtn.addEventListener('click', (e) => {
			library.splice(index);
			updateStorage();
			$bookRemoveBtn.parentNode.remove();
		});

		for (let property in book) {
			let $property = document.createElement('div');
			$property.setAttribute('class', `book-property ${property}`);
			$property.innerHTML = `<div class='book-content title'>${property}</div> <div class='book-content value'>${book[property]}</div><br>`;
			$bookCard.appendChild($property);
		}
		$bookCard.appendChild($bookRemoveBtn);
		$bookCard.appendChild($bookToggleReadBtn);
		$bookRenderingSpace.appendChild($bookCard); 
	});
}


///////////////////////////////////////////////////////////////
///////////////////////Making it Work//////////////////////////
///////////////////////////////////////////////////////////////

//all of book objs will be stored in this arrray
let library = [
	new Book('Harry Potter', 'J K Rowely', 550, 'Not read yet'),
	new Book('Fantastic beast', 'J K Rowely', 550, 'Not read yet')
];

if (!localStorage.getItem('library')) {
	localStorage.setItem('library', JSON.stringify(library));
} else {
	library = JSON.parse(localStorage.getItem('library'));
}

let $bookRenderingSpace = document.querySelector('#space-for-book');
let $form = document.querySelector('#form');

document.querySelector('#add-book-btn').addEventListener('click', toggleForm);
$form.addEventListener('submit', submitNewBook);

renderBook();

