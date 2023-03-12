import "../App.css";
import { useEffect, useState } from "react";
import { search } from "../BooksAPI";

function ShelfSearch({ queryValue }) {
  const [allBook, setAllBook] = useState([])

  useEffect(() => {
    console.log("Call Search API")
    callSearchAPI(queryValue)
  }, [queryValue])

  const callSearchAPI = (query) => {
    console.log("====Query: " + query)
    search(query).then(result => {
      // console.log("Result: " + JSON.stringify(result))
      if(result != undefined && result.error != "empty query" ){
        setAllBook(result)
      } else {
        setAllBook([])
      }
    })
  }

  const selectShelf = (currentBook, shelf) => {
    // update(currentBook, shelf).then(result => {
    //     updatePage()
    //     console.log(result)
    // })
  }

  return (
    <div className="search-books-results">
      <ol className="books-grid">
        { allBook.map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage:
                      "url(" + book.imageLinks.thumbnail + ")",
                  }}
                ></div>
                <div className="book-shelf-changer">
                  <select value={book.shelf} onChange={(event) => selectShelf(book, event.target.value)}>
                    <option value="none" disabled>
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
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ShelfSearch