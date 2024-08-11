document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('book-form');
    const booksTable = document.getElementById('books-table').getElementsByTagName('tbody')[0];

    // Load existing books from local storage
    loadBooks();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('book-title').value;
        const author = document.getElementById('author-name').value;
        const isbn = document.getElementById('isbn').value;
        const publishYear = document.getElementById('publish-year').value;

        if (title && author && isbn && publishYear) {
            const book = {
                title,
                author,
                isbn,
                publishYear
            };

            addBookToTable(book);
            saveBookToLocalStorage(book);
            form.reset();
        } else {
            alert('All fields are required.');
        }
    });

    function addBookToTable(book) {
        const row = booksTable.insertRow();
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${book.publishYear}</td>
            <td>
                <button onclick="editBook(this)">Edit</button>
                <button onclick="deleteBook(this)">Delete</button>
            </td>
        `;
    }

    window.editBook = function(button) {
        const row = button.parentElement.parentElement;
        const cells = row.getElementsByTagName('td');
        document.getElementById('book-title').value = cells[0].innerText;
        document.getElementById('author-name').value = cells[1].innerText;
        document.getElementById('isbn').value = cells[2].innerText;
        document.getElementById('publish-year').value = cells[3].innerText;

        // Remove the row from the table and local storage
        booksTable.deleteRow(row.rowIndex - 1);
        removeBookFromLocalStorage(cells[2].innerText);
    };

    window.deleteBook = function(button) {
        const row = button.parentElement.parentElement;
        const cells = row.getElementsByTagName('td');
        booksTable.deleteRow(row.rowIndex - 1);
        removeBookFromLocalStorage(cells[2].innerText);
    };

    function saveBookToLocalStorage(book) {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    function removeBookFromLocalStorage(isbn) {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books = books.filter(book => book.isbn !== isbn);
        localStorage.setItem('books', JSON.stringify(books));
    }

    function loadBooks() {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        books.forEach(addBookToTable);
    }
    
    function openInNewTab() {
        window.open('view-books.html', '_blank');
    }    
});
