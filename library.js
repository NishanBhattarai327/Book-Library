//all of book objs will be stored in this arrray
let library = [
	{title: 'Harry Potter', author: 'J K Rowely', pages: 560, read: false},
	{title: 'Fantastic Beast', author: 'J K Rowely', pages: 560, read: false}
];

let $displayBook = document.querySelector('#displayBook');


//this function will add book objs to library
function addBook(title, author, pages, read) {
	library.push({title, author, pages, read});
}

function renderBook() {

	library.forEach((book) => {
		let $book = document.createElement('div');
		$book.setAttribute('class', 'book');

		for (let property in book) {
			let $property = document.createElement('div');
			$property.setAttribute('class', `bookProperty ${property}`);
			$property.innerHTML = `<div class='bookContent title'>${property}</div> <div class='bookContent value'>${book[property]}</div><br>`;
			$book.appendChild($property);
		}
		$displayBook.appendChild($book); 
	});
}
renderBook();