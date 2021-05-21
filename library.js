//all of book objs will be stored in this arrray
let library = [];

//this function will add book objs to library
function addBook(title, author, pages, read) {
	library.push({title, author, pages, read});
}