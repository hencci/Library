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
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    let readStats;
    console.log(read);
    if (read === true){
        readStats = '<p class="read">Read</p>'
    } else {
        readStats = '';
    }
    console.log(readStats)

    let latestBookAdded = document.querySelector(".books .book:nth-child(3)")
    newBookBoard.setAttribute("style", "display:none;");
    console.log(latestBookAdded);
    latestBookAdded.insertAdjacentHTML("beforebegin",
        `<div class = "book">
            <div class = "title">${title}</div>
            <div class = "author">${author}</div>
            <div class = "pages">${pages} pages</div>
            ${readStats}
        </div>`
    );
    return newBook;
}

newBookButton.addEventListener("click", (e) => {
    newBookBoard.toggleAttribute("style");
});

newBookSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();

    let nameField = document.querySelector("#new-book-title");
    let authorField = document.querySelector("#new-book-author");
    let pagesField = document.querySelector("#new-book-pages");
    let read = document.querySelector("#read").checked;

    let isValid = true;

    if (!nameField.value) {
        nameField.classList.add('input-error');
        isValid = false;
    }
    else {
        nameField.classList.remove('input-error');
    }

    if (!authorField.value) {
        authorField.classList.add('input-error');
        isValid = false;
    }
    else {
        authorField.classList.remove('input-error');
    }

    if (!pagesField.value) {
        pagesField.classList.add('input-error');
        isValid = false;
    }
    else {
        pagesField.classList.remove('input-error');
    }

    if (!isValid) {
    console.log("Please fill out all required fields.");
    return;
    }
})

addBookToLibrary(nameField.value, authorField.value, pagesField.value, read);
console.log(`read ${read}`)