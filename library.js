//all of book objs will be stored in this arrray
let library = [
	{title: 'Harry Potter', author: 'J K Rowely', pages: 560, read: false},
	{title: 'Fantastic Beast', author: 'J K Rowely', pages: 560, read: false}
];

let $displayBook = document.querySelector('#displayBook');
let $form = document.querySelector('#form');

let $newBook = document.querySelector('#newBook');
$newBook.addEventListener('click', (event) => {
	$form.style.display = 'block';
});


//this function will add book objs to library
function addBook(title, author, pages, read) {
	library.push({title, author, pages, read});
}

function renderBook() {

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