import "../App.css";
import Book from "./Book"
import { update } from "../BooksAPI.js";

function Shelf({ shelfName, listBook, updatePage }) {

    const selectShelf = (currentBook, shelf) => {
        update(currentBook, shelf).then(result => {
            updatePage()
            console.log(result)
        })
    }

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ shelfName }</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {listBook.map(book => (
                        <li key={book.id}>
                            <Book book={book} selectShelf={selectShelf} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default Shelf