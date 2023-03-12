import "./App.css";
import { useEffect, useState } from "react";
import Read from "./components/Read"
import WantToRead from "./components/WantToRead"
import CurrentReading from "./components/CurrentReading"
import ShelfSearch from "./components/ShelfSearch"
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
      console.log(result)
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
                onChange={handleChange}
              />
            </div>
          </div>
          <ShelfSearch queryValue={query} />
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <CurrentReading listBook={getCurrentReading()} updatePage={update} />
              <WantToRead listBook={getWantToRead()} updatePage={update} />
              <Read listBook={getRead()} updatePage={update} />
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
