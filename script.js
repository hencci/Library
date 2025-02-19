const myLibrary = JSON.parse(localStorage.getItem("library")) || [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'Read' : 'Not read'}`;
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
    book.read = !book.read; // Toggle the read status
    const readStatus = bookElement.querySelector('.read-status');
    readStatus.textContent = book.read ? 'Read' : 'Not read';
    readStatus.classList.toggle('read', book.read);
    readStatus.classList.toggle('not-read', !book.read);

    saveLibraryToStorage();
}

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, read) {
    // Normalize title and author (case insensitive)
    const normalizedTitle = title.trim().toLowerCase();
    const normalizedAuthor = author.trim().toLowerCase();

    // Check if the book already exists
    let existingBook = myLibrary.find(book => 
        book.title.toLowerCase() === normalizedTitle && 
        book.author.toLowerCase() === normalizedAuthor
    );

    if (existingBook) {
        // If book exists, increase the count
        existingBook.count = (existingBook.count || 1) + 1;
        saveLibraryToStorage();
    }

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    saveLibraryToStorage();

    // Create a new div element for the book
    let bookElement = document.createElement('div');
    bookElement.classList.add('book');

    // Add book details to the new div
    bookElement.innerHTML = `
        <div class="title">${title}</div>
        <div class="author">${author}</div>
        <div class="pages">${pages} pages</div>
        <p class="read-status ${read ? 'read' : 'not-read'}">${read ? 'Read' : 'Not read'}</p>
        <button class="remove-btn">Remove</button>
    `;

    // Append the new book to the container
    bookContainer.appendChild(bookElement);

    // Add event listener to toggle the read status when clicked
    const readStatusElement = bookElement.querySelector('.read-status');
    readStatusElement.addEventListener('click', () => toggleReadStatus(bookElement, newBook));

    const removeButton = bookElement.querySelector('.remove-btn');
    removeButton.addEventListener('click', () => removeBook(bookElement, newBook));

    return newBook;
}

// Function to remove a book from the library
function removeBook(bookElement, book) {
    myLibrary.splice(myLibrary.indexOf(book), 1); // Remove from array
    saveLibraryToStorage(); // Update local storage
    bookElement.remove(); // Remove from UI
}

// Load books from Local Storage on page load
document.addEventListener("DOMContentLoaded", () => {
    myLibrary.forEach((book) => {
        // Directly create UI elements without re-adding books to myLibrary
        let bookElement = document.createElement('div');
        bookElement.classList.add('book');

        bookElement.innerHTML = `
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="pages">${book.pages} pages</div>
            <p class="read-status ${book.read ? 'read' : 'not-read'}">${book.read ? 'Read' : 'Not read'}</p>
            <button class="remove-btn">Remove</button>
        `;

        bookContainer.appendChild(bookElement);

        // Add event listener to toggle the read status when clicked
        const readStatusElement = bookElement.querySelector('.read-status');
        readStatusElement.addEventListener('click', () => toggleReadStatus(bookElement, book));

        const removeButton = bookElement.querySelector('.remove-btn');
        removeButton.addEventListener('click', () => removeBook(bookElement, book));
    });
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
    console.log(`read: ${read}`);
    
    // Reset the form fields
    document.querySelector("#new-book").reset();
    
    // Remove input error styles
    nameField.classList.remove('input-error');
    authorField.classList.remove('input-error');
    pagesField.classList.remove('input-error');
});