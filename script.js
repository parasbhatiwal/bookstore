//Book Class: Represent a Book

class Book {
    constructor(title, author, pages) {

        this.title = title;
        this.author = author;
        this.pages = pages;
    }

}
//UI class: UI Represantation
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr')

        row.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.pages}</td>
       <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()
        }
    }
}

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(pages) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.pages === pages) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }

}
//Clear Fields
class ClearFields {
    static clearNow() {
        const title = document.getElementById('title').value = ''
        const author = document.getElementById('author').value = ''
        const pages = document.getElementById('pages').value = ''
    }
}
//Store Class : Handles Storage



//Events : Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Add a Book
document.querySelector("#book-form").addEventListener('submit', (e) => {


    // Get form values

    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;

    // Store.addBook(book);

    if (title === '' || author === '' || pages === '') {
        alert('Please enter valid data')
    } else {
        const book = new Book(title, author, pages)
        UI.addBookToList(book)
        Store.addBook(book)
        ClearFields.clearNow()


        document.getElementById('text-book-added').innerText = ('Book Added Successfully')
        setTimeout(() => {
            document.getElementById('text-book-added').innerText = ('Add more Book')

        }, 5000);
    }
})

//Remove a Book

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    document.getElementById('text-book-added').innerText = ('Book Removed Successfully')
    setTimeout(() => {
        document.getElementById('text-book-added').innerText = ('Add more Book')

    }, 5000);
})

function clearthestroage() {
    localStorage.clear();
    location.reload()
}