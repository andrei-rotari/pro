export default class Book {
    constructor(author, title, year, isbn) {
        this.author = author;
        this.title = title;
        this.year = year;
        this.isbn = isbn;
        //    this.preis = preis;
        //  this.inStock = inStock;
    }

    getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }

    sendToServer(finalBooks) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status != 200) return;
            console.log("Die empfangene Daten:", xhr.responseText);
        };
        xhr.open("POST", "./script.php");
        xhr.send(finalBooks);
    }
}
