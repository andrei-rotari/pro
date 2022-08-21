import UI from "./module/ui.mjs";
import Book from "./module/Book.mjs";
import DataBase from "./module/DataBase.mjs";

/* let container = document.querySelector(".container");

// Form

let authorList = document.querySelector("#author");
let titleList = document.querySelector("#title");
let yearList = document.querySelector("#year");


// Table

let bookListTable;
let tableBody;
 */
// Setting the parameters for isbnList
let isbnList = document.querySelector("#isbn");
isbnList.setAttribute("maxLength", "17");
isbnList.setAttribute("size", "17");

const containerTable = document.querySelector("#booklist-container");

const form = document.querySelector("#book-form");
let div = document.createElement("div");
div.setAttribute("id", "conf-message");
div.className = "alert";
//div.textContent = "Hello";
form.insertAdjacentElement("afterbegin", div);
div.style.visibility = "hidden";

//------------------ 1. Teil ---------------------

let json;
let xhr = new XMLHttpRequest();
xhr.onload = function () {
    if (xhr.status != 200) {
        containerTable.textContent = "Allgemeiner Verarbeitungsfehler";
        return;
    }
    if (xhr.responseType == "json") json = xhr.response;
    else json = JSON.parse(xhr.responseText);

    console.log("Die geladene JSON Datei:", json);

    localStorage.setItem("books", JSON.stringify(json));
    console.log("Stored data:", localStorage);

    // Bücher anzeigen lassen
    const books = JSON.parse(localStorage.getItem("books"));
    // ui = new UI();
    UI.createTable();
    books.forEach((book) => UI.addBook(book));
};

xhr.open("GET", "./booklist.json");
xhr.responseType = "json";
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.send();

//------------------ 2. Teil ---------------------
let dublicatefound;
document.querySelector("#book-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const author = document.querySelector("#author").value;
    const title = document.querySelector("#title").value;
    const year = document.querySelector("#year").value;
    const isbn = document.querySelector("#isbn").value;

    if (UI.emptyInput()) return;
    UI.incorrectInput();

    UI.duplicatesCheck();

    //  if (dublicatefound == false)
    if (!UI.duplicatesCheck()) {
        const book = new Book(author, title, year, isbn);

        UI.addBook(book);
        
        //let dataBase = new DataBase(book);
        DataBase.addNewBook(book);

        let message =
            "Das Buch wurde erfolgreich im Local Storage gespeichert!";
        UI.validationMessages("success", message);
        console.log(message);

        UI.clearInput();
    }
});

// Event: Remove a Book

//document.querySelector("#booklist-container").addEventListener("click", () => {

// Bestätigung an Klient senden
let index;

if (UI.deleteBook.called) {
    DataBase.removeBook(index);
    let message = `Ein Buch mit dem Index ${index} wurde erfolgreich aus dem LocalStorage entfernt.`;
    UI.validationMessages("success", message);
}

/* document.querySelector("#booklist-container").addEventListener("click", () => {
    // Buch aus dem DOM entfernen
   // UI.deleteBook(el.target);

    // Buch aus der DB entfernen
    DataBase.removeBook(index);

    // Bestätigung an Klient senden
    message = `Ein Buch mit dem Index ${index} wurde erfolgreich aus dem LocalStorage entfernt.`;
    UI.validationMessages("success", message);
}); */

// Close the window and send the data to server
document.getElementById("close").addEventListener("click", function () {
    if (window.confirm("Möchten Sie die Daten an den Server schicken?")) {
        sendToServer(JSON.stringify(localStorage.getItem("books")));

        message = "Die Daten wurden erfolgreich an den Server geschickt!";
        UI.validationMessages("success", message);
        this.parentNode.parentNode.remove();
    } else this.parentNode.parentNode.remove();
    return false;
});

// books are not added
