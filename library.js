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
	$popUp.style.display = 'none';
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
		$bookRemoveBtn.innerHTML = '&times;';
		$bookRemoveBtn.addEventListener('click', (e) => {
			library.splice(index, 1);
			updateStorage();
			$bookRemoveBtn.parentNode.remove();
		});

		for (let property in book) {
			let $property = document.createElement('div');
			$property.setAttribute('class', `book-property ${property}`);
			$property.innerHTML = `<span class='book-content'>${book[property]}</span>`;
			$bookCard.appendChild($property);
		}
		$bookCard.appendChild($bookToggleReadBtn);
		$bookCard.appendChild($bookRemoveBtn);
		$bookRenderingSpace.appendChild($bookCard); 
	});
}


///////////////////////////////////////////////////////////////
///////////////////////Making it Work//////////////////////////
///////////////////////////////////////////////////////////////

//all of book objs will be stored in this arrray
let library = [
	new Book('Ek Chihan', ' Hridaya Chandra Singh Pradhan', 107, 'Not read yet'),
	new Book('Muna Madan', 'Laxmi Prasad Devkota', 40, 'Not read yet'),
	new Book('Naso', 'Guru Prasad Mainali', 125, 'Not read yet'),
	new Book('Seto Dharati', 'Amar Neupane', 380, 'Already read'),
	new Book('Karma', 'Sadhguru', 272, 'Not read yet'),
	new Book('Autobiography of a Yogi', 'Paramahansa Yogananda', 448, 'Not read yet')
];

if (!localStorage.getItem('library')) {
	localStorage.setItem('library', JSON.stringify(library));
} else {
	library = JSON.parse(localStorage.getItem('library'));
}

let $bookRenderingSpace = document.querySelector('#space-for-book');
let $form = document.querySelector('#form');
$form.addEventListener('submit', submitNewBook);

renderBook();

///////////////////////////////////////////////////
///Making popup form///////////////////////////////
//////////////////////////////////////////////////
let $popUp = document.querySelector("#popUp");
let $popUp_AddBookBtn = document.querySelector('#add-book-btn');
let $popUp_closeBtn = document.querySelector(".close");

// When the user clicks the button, open the $popUp 
$popUp_AddBookBtn.onclick = function() {
  $popUp.style.display = "block";
}
// When the user clicks on <span> (x), close the $popUp
$popUp_closeBtn.onclick = function() {
  $popUp.style.display = "none";
}
// When the user clicks anywhere outside of the $popUp, close it
window.onclick = function(event) {
  if (event.target == $popUp) {
    $popUp.style.display = "none";
  }
}

////////////////////////////////////////////////////////////
//////////////////////The end///////////////////////////////
////////////////////////////////////////////////////////////



