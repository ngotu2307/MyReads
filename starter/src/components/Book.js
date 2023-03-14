import "../App.css";

function Book({ book, selectShelf }) {

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: book.imageLinks ? "url(" + book.imageLinks.thumbnail + ")" : "",
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select value={book.hasOwnProperty("shelf") ? book.shelf : "none"} onChange={(event) => selectShelf(book, event.target.value)}>
                        <option value="moveTo" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    )
}

export default Book