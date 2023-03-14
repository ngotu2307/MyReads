import "../App.css";
import { useEffect, useState } from "react";
import { search, update } from "../BooksAPI";
import Book from "./Book"

function ShelfSearch({ listHomeBook, queryValue, updatePage }) {
  const [allBook, setAllBook] = useState([])

  useEffect(() => {
    console.log("Call Search API")
    callSearchAPI(queryValue)
  }, [queryValue])

  const callSearchAPI = (query) => {
    search(query).then(result => {
      if(result !== undefined && result.error !== "empty query" ){

        // compare with book in HomePage
        const newListBook = rebuildListBook(result)
        // console.log("newListBook : " + newListBook);
        setAllBook(newListBook)
      } else {
        setAllBook([])
      }
    })
  }

  const rebuildListBook = (searchedBooks) => {
    const newListBook = []
    searchedBooks.map((searchBook) => {
      const homeBooks = listHomeBook.filter(homeBook => homeBook.id === searchBook.id)
      if (homeBooks.length === 0) {
        newListBook.push(searchBook)
      } else {
        newListBook.push(homeBooks[0])
      }
    })
    return newListBook
  }

  const toShelf = (currentBook, updatedShelf) => {
    // console.log("current book: " + JSON.stringify(currentBook) + ", updatedShelf: " + shelf)
    update(currentBook, updatedShelf).then(result => {
        updatePage()
        // console.log("book result update: " + JSON.stringify(result))
    })

    currentBook.shelf = updatedShelf
    console.log("current book: " + currentBook)
  
    const newArray = []
    allBook.map(book => {
      if (book.id === currentBook.id) {
        newArray.push(currentBook)
      } else {
        newArray.push(book)
      }
    })
    console.log("new Array: " + JSON.stringify(newArray))
    setAllBook(newArray)
  }

  return (
    <div className="search-books-results">
      <ol className="books-grid">
        { allBook.map(book => (
          <li key={book.id}>
            <Book book={book} selectShelf={toShelf} />
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ShelfSearch