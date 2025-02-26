const myLibrary = JSON.parse(localStorage.getItem("library")) || [];

class Book {
    constructor(title, author, pages, read, count = 1) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.count = count;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'Read' : 'Not read'}, Copies: ${this.count}`;
    }
}

let bookContainer = document.querySelector(".books");
let newBookBoard = document.querySelector("#new-entry");
let newBookSubmitButton = document.querySelector("#new-book-submit");
let newBookButton = document.querySelector(".add-new");

// Save books to Local Storage
function saveLibraryToStorage() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

// Function to toggle the read status of a book
function toggleReadStatus(bookElement, book) {
    book.read = !book.read;
    const readStatus = bookElement.querySelector('.read-status');
    readStatus.textContent = book.read ? 'Read' : 'Not read';
    readStatus.classList.toggle('read', book.read);
    readStatus.classList.toggle('not-read', !book.read);
    saveLibraryToStorage();
}

// Function to remove a book or decrease count from the library
function removeBook(bookElement, book) {
    if (book.count > 1) {
        book.count -= 1; // Decrease count
        saveLibraryToStorage();
        bookElement.querySelector('.count').textContent = `Copies: ${book.count}`;
    }
    else {
        myLibrary.splice(myLibrary.indexOf(book), 1); // Remove from array
        saveLibraryToStorage(); // Update local storage
        bookElement.remove(); // Remove from UI
    }
}

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, read) {
    // Check if the book already exists
    const existingBook = myLibrary.find(book => book.title.toLowerCase() === title.trim().toLowerCase() && book.author.toLowerCase() === author.trim().toLowerCase());
    
    if (existingBook) {
        // Prompt the user before increasing the count
        if (confirm("This book already exists. Do you want to increase the count?")) {
            existingBook.count++; // If book exists, increase the count
            updateBookCount(existingBook);
            saveLibraryToStorage();
            return;
        }
    } else {
        // If book does not exist, add it as a new entry
        let newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        saveLibraryToStorage();
        displayBook(newBook);
    }
}

// Function to display book
function displayBook(book) {
    let bookElement = document.createElement('div'); // Create a new div element for the book
    bookElement.classList.add('book');
    bookElement.dataset.title = book.title.toLowerCase();
    bookElement.dataset.author = book.author.toLowerCase();

    // Add book details to the new div
    bookElement.innerHTML = `
        <div class="title">${book.title}</div>
        <div class="author">${book.author}</div>
        <div class="pages">${book.pages} pages</div>
        <p class="read-status ${book.read ? 'read' : 'not-read'}">${book.read ? 'Read' : 'Not read'}</p>
        <p class="count">Copies: ${book.count}</p>
        <button class="remove-btn">Remove</button>
    `;

    bookContainer.appendChild(bookElement);

    // Add event listener to toggle the read status when clicked
    bookElement.querySelector('.read-status').addEventListener('click', () => toggleReadStatus(bookElement, book));
    // Event listener for the remove button
    bookElement.querySelector(".remove-btn").addEventListener("click", () => removeBook(bookElement, book));
}

// Function to update count
function updateBookCount(book) {
    const bookElement = document.querySelector(`.book[data-title="${book.title.toLowerCase()}"][data-author="${book.author.toLowerCase()}"]`);
    if (bookElement) {
        const countElement = bookElement.querySelector('.count');
        countElement.textContent = `Copies: ${book.count}`;
    }
}

// Load books from Local Storage on page load
document.addEventListener("DOMContentLoaded", () => {
    myLibrary.forEach(displayBook);
});

// Event listener to show the new book form
newBookButton.addEventListener("click", () => {
    newBookBoard.style.display = (newBookBoard.style.display === 'none') ? 'block' : 'none';
});

// Event listener to handle form submission
newBookSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();

    let nameField = document.querySelector("#new-book-title");
    let authorField = document.querySelector("#new-book-author");
    let pagesField = document.querySelector("#new-book-pages");
    let read = document.querySelector("#read").checked;

    let isValid = true;

    // Validation for required fields
    if (!nameField.value) {
        nameField.classList.add('input-error');
        isValid = false;
    } else {
        nameField.classList.remove('input-error');
    }

    if (!authorField.value) {
        authorField.classList.add('input-error');
        isValid = false;
    } else {
        authorField.classList.remove('input-error');
    }

    if (!pagesField.value) {
        pagesField.classList.add('input-error');
        isValid = false;
    } else {
        pagesField.classList.remove('input-error');
    }

    // If the form is invalid, stop the function
    if (!isValid) {
        console.log("Please fill out all required fields.");
        return;
    }

    // Add the new book to the library
    addBookToLibrary(nameField.value, authorField.value, pagesField.value, read);
    
    // Reset the form fields
    document.querySelector("#new-book").reset();
    
    // Remove input error styles
    nameField.classList.remove('input-error');
    authorField.classList.remove('input-error');
    pagesField.classList.remove('input-error');
});