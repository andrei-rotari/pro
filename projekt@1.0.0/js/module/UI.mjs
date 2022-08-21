let containerTable = document.querySelector(".container");

// Form
//const form = document.querySelector("#book-form");
/* let authorList = document.querySelector("#author");
let titleList = document.querySelector("#title");

 */

// Table
//let containerTable = document.querySelector("#booklist-container");
let dublicatefound;
let deleteBtn;
let table;
let index;
// Setting the parameters for isbnList
let isbnList = document.querySelector("#isbn");
let yearList = document.querySelector("#year");
export default class UI {
    static createTable() {
        containerTable = document.querySelector(".container");

        const table = document.createElement("table");
        const tableHead = document.createElement("thead");
        const tableHeadRow = document.createElement("tr");
        const tableHeadAuthor = document.createElement("th");
        const tableHeadTitle = document.createElement("th");
        const tableHeadYear = document.createElement("th");
        const tableHeadIsbn = document.createElement("th");
        const tableHeadDelete = document.createElement("th");

        // Define the Table Headers
        tableHeadAuthor.textContent = "Autor";
        tableHeadTitle.textContent = "Titel";
        tableHeadYear.textContent = "Jahr";
        tableHeadIsbn.textContent = "ISBN#";
        tableHeadDelete.textContent = "";

        // Put together the DOM-Treeparts
        tableHeadRow.append(
            tableHeadAuthor,
            tableHeadTitle,
            tableHeadYear,
            tableHeadIsbn,
            tableHeadDelete
        );

        tableHead.append(tableHeadRow);
        table.append(tableHead);
        containerTable.append(table);

        table.className = "table mt-4 table-hover";
        tableHead.className = "table-default";
        return containerTable;
    }

    static addBook(book) {
        table = document.querySelector("table");

        const tableBody = document.createElement("tbody");
        const row = document.createElement("tr");
        const authorList = document.createElement("td");
        const titleList = document.createElement("td");
        const yearList = document.createElement("td");
        const isbnList = document.createElement("td");
        const deleteList = document.createElement("td");
        deleteBtn = document.createElement("button");

        // Inhalt der Tabelle feststellen
        authorList.textContent = book.author;
        titleList.textContent = book.title;
        yearList.textContent = book.year;
        isbnList.textContent = book.isbn;

        deleteBtn.textContent = "X";
        deleteBtn.className = "btn btn-sm delete btn-outline-danger";
        deleteList.append(deleteBtn);

        // DOM-Baumaufbau zusammenstellen
        row.append(authorList, titleList, yearList, isbnList, deleteList);
        tableBody.appendChild(row);

        table.appendChild(tableBody);

        deleteBtn.addEventListener("click", UI.deleteBook);
        return table, deleteBtn;
    }

    static deleteBook() {
        index = this.parentNode.parentNode.rowIndex;
        this.parentNode.parentNode.remove();

        console.log(index);
        const books = JSON.parse(localStorage.getItem("books"));
        const removedBook = books.splice(index - 1, 1);

        // Validierung
        console.log("index: ", index);
        console.log(`Die aktualisierte Datei enthält ${books.length} Einsätze`);

        // DB update
        localStorage.setItem("books", JSON.stringify(books));
        console.log(localStorage.books);
    }

    static emptyInput() {
        if (
            document.querySelector("#author").value === "" ||
            document.querySelector("#year").value === "" ||
            document.querySelector("#title").value === "" ||
            document.querySelector("#isbn").value === ""
        ) {
            let message = "Bitte fühlen Sie alle Einträge ein!";
            console.log(message);
            UI.validationMessages("warning", message);
        }
    }

    static incorrectInput() {
        let message;
        let UTCDate = new Date();
        let limitYear = UTCDate.getUTCFullYear() + 1;

        let isbnList = document.querySelector("#isbn");
        let yearList = document.querySelector("#year");

        let isbnReg =
            /^(?=[0-9]{13}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$/;

        if (yearList.value.length != 4 || yearList.value > limitYear) {
            let message = "Das Jahr ist ungültig oder liegt weit in Zukunft!";
            UI.incorrectMessages(yearList, message, "is-invalid");
            console.log(message);
        } else {
            message = "";
            UI.incorrectMessages(yearList, message, "is-valid");
            console.log("right");
        }

        if (!isbnReg.test(isbnList.value)) {
            let message = "Das ISBN folgt nicht das Format: 000-0-000-00000-0!";
            console.log(message);
            UI.incorrectMessages(isbnList, message, "is-invalid");
            //   return;
        } else {
            message = "";
            UI.incorrectMessages(isbnList, message, "is-valid");
            console.log("right isbn");
        }
    }

    static incorrectMessages(el, message, className) {
        el.classList.remove("is-invalid");
        el.classList.add(className);
        let errorField = el.nextElementSibling;
        errorField.textContent = message;
        errorField.style.visibility = "visible";
        /* if (UI.incorrectInput) {
            setTimeout(() => el.classList.remove("is-valid"), 3000);
        } */
    }

    static duplicatesCheck() {
        const books = JSON.parse(localStorage.getItem("books"));
        console.log(books, "0");

        let bookObject;
       // dublicatefound = false;

        books.forEach((book) => {
            if (book.isbn == isbnList.value) {
                dublicatefound = true;
                console.log(dublicatefound);
                bookObject = book;
                UI.clearInput();
                let message = "Dieses Buch ist schon Teil der Bibliothek!";
                console.log(message);
                UI.validationMessages("info", message);
                //  console.log(bookObject, "1");
                return dublicatefound;
            }
        });
    }

    static validationMessages(className, message) {
        let div = document.querySelector("#conf-message");
        div.classList.add("alert-" + className);
        div.textContent = message;
        let form = document.querySelector("#book-form");
        form.insertAdjacentElement("afterbegin", div);
        div.style.visibility = "visible";
        setTimeout(() => {
            div.style.visibility = "hidden";
        }, 3000);
    }

    static clearInput() {
        document.querySelector("#author").value = "";
        document.querySelector("#title").value = "";
        document.querySelector("#year").value = "";
        document.querySelector("#isbn").value = "";
    }
}
