export default class DataBase {
    static getDB() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        console.log("Stored data:", books);
        return books;
    }

    static addNewBook(book) {
        // console.log(bookObject, "2");
        /*       book = {
            autor: authorList.value.trim(),
            titel: titleList.value.trim(),
            jahr: Number(yearList.value.trim()),
            isbn: isbnList.value,
          }; */
        console.log("3. Das neue Buch: ", book);

        const books = DataBase.getDB();

        books.push(book);
        console.log("4. Die aktualisierte Datei: ", books);

        localStorage.setItem("books", JSON.stringify(books));
        //message = "Das Buch wurde erfolgreich im Local Storage gespeichert!";
        //UI.validationMessages("success", message);
    }

    static removeBook(index) {
        // Book aus der DB löschen
        const books = DataBase.getDB();
        const removedBook = books.splice(index - 1, 1);

        // Validierung
        console.log("index: ", index);
        console.log(
            `Die aktualisierte Datei ${books} enthält ${books.length} Einsätze`
        );

        // DB update
        localStorage.setItem("books", JSON.stringify(books));
    }
}
