const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
    };
}

let bookContainer = document.querySelector(".books");
let newBookBoard = document.querySelector("#new-entry");
let newBookSubmitButton = document.querySelector("#new-book-submit");
let newBookButton = document.querySelector(".add-new");

function addBookToLibrary(title, author, pages, read) {
}