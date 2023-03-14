import "./App.css";
import { useEffect, useState } from "react";
import Shelf from "./components/Shelf"
import ShelfSearch from "./components/ShelfSearch"
import { Routes, Route, Link } from "react-router-dom";
import { getAll } from "./BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [allBook, setAllBook] = useState([])
  const [query, setQuery] = useState("");

  // useEffect(callback)
  // useEffect(callback, [])
  // useEffect(callback, [deps])

  // 1. callback luôn được gọi sau component mount
  useEffect(() => {
    console.log("Call API")
    callAPI()
  }, [])

  const update = () => {
    callAPI()
  }

  const callAPI = () => {
    getAll().then(result => {
      // console.log(result)
      setAllBook(result)
    })
  }

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

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const clickSearchHandler = () => {
    setShowSearchpage(!showSearchPage)
    setQuery("")
  }

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              to="/"
              className="close-search"
              onClick={() => clickSearchHandler()}
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={handleChange}
              />
            </div>
          </div>
          <ShelfSearch listHomeBook={allBook} queryValue={query} updatePage={update} />
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf shelfName="Currently Reading" listBook={getCurrentReading()} updatePage={update} />
              <Shelf shelfName="Want to Read" listBook={getWantToRead()} updatePage={update} />
              <Shelf shelfName="Read" listBook={getRead()} updatePage={update} />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search" onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
