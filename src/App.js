import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import BookShelf from './components/BookShelf'
import SearchBooks from './components/SearchBooks'
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
        <Route exact path='/' render={() => (
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
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
          )}
        />
        <Route path='/search' render={({history}) => (
          <SearchBooks onChangeShelf={this.onChangeShelf}/>
          )}
        />
      </div>
    )
  }
}
export default BooksApp
