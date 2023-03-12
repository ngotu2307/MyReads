import "./App.css";
import { useEffect, useState } from "react";
import Read from "./components/Read"
import WantToRead from "./components/WantToRead"
import CurrentReading from "./components/CurrentReading"
import { getAll, search } from "./BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [allBook, setAllBook] = useState([])

  // useEffect(callback)
  // useEffect(callback, [])
  // useEffect(callback, [deps])
  
  // 1. callback luôn được gọi sau component mount
  useEffect(() => {
    console.log("Call API")
    getAll().then(result => {
      console.log(result)
      setAllBook(result)
    })
  }, [])

  function getCurrentReading() {
    const currentReadingShelf = allBook.filter(book => book.shelf === "currentlyReading")
    return currentReadingShelf
  } 

  function getWantToRead() {
    return allBook.filter(book => book.shelf === "wantToRead")
  }

  function getRead() {
    return allBook.filter(book => book.shelf === "read")
  } 

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {allBook.map(book => (
                <li key={book.id}>{book.title}</li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <CurrentReading listBook={getCurrentReading()} />
              <WantToRead listBook={getWantToRead()}/>
              <Read listBook={getRead()}/>
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
