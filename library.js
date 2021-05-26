//all of book objs will be stored in this arrray
let library = [
	{title: 'Harry Potter', author: 'J K Rowely', pages: 560, read: false},
	{title: 'Fantastic Beast', author: 'J K Rowely', pages: 560, read: false}
];

let $displayBook = document.querySelector('#displayBook');
let $newBook = document.querySelector('#newBook');
let $title = document.querySelector('#formTitle');
let $author = document.querySelector('#formAuthor');
let $pages = document.querySelector('#formPages');
let $read = document.querySelector('#formRead');
let $submit = document.querySelector('#submit');

$newBook.addEventListener('click', addNewBook);
$submit.addEventListener('submit', submitNewBook);

function addNewBook() {
	document.querySelector('#form').style.display = 'block';
}

function submitNewBook() {
	console.log('hi');
	let read = $read.value ? 'Already read' : 'Not read yet';
	addBook($title.value, $author.value, $pages.value, read);
	renderBook();
	$title.value = '';
	$author.value = '';
	$pages.value = '';
	$read.value = '';
	document.querySelector('#form').style.display = 'none';
}

//this function will add book objs to library
function addBook(title, author, pages, read) {
	library.push({title, author, pages, read});
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
		$displayBook.appendChild($book); 
	});
}
renderBook();