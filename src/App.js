import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookShelf from './components/BookShelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  onChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
       BooksAPI.getAll().then((books) => {
        this.setState({ books })
      });
    });
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf shelfName='Currently Reading' books={books.filter((book) => book.shelf === 'currentlyReading')} onChangeShelf={this.onChangeShelf} />
              <BookShelf shelfName='Want to Read' books={books.filter((book) => book.shelf === 'wantToRead')} onChangeShelf={this.onChangeShelf} />
              <BookShelf shelfName='Read' books={books.filter((book) => book.shelf === 'read')} onChangeShelf={this.onChangeShelf} />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
          </div>
        </div>
      </div>
    )
  }
}
export default BooksApp
