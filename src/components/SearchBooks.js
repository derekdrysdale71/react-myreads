import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    matchingBooks: []
  }

  /**
   * @description Call search api if new query
  */
  updateQuery = (query) => {
    const searchQuery = query.trim();
    this.setState({ query: searchQuery });
    if (query) {
      BooksAPI.search(searchQuery, 25).then((books) => {
        if (books) {
          if (!books.error) {
            books.map((book) => {this.updateShelfProperty(book)});
            this.setState({matchingBooks: books});
          } else {
            this.setState({matchingBooks: []});
          }
        }
      })
    } else {
      this.setState({matchingBooks: []});
    }
  }

  /**
   * @description Update shelf property on found books to match existing or set to 'none'
  */
  updateShelfProperty = (book) => {
    const {books} = this.props;
    const existingBook = books.find((existingBook) => (existingBook.id === book.id));
    if (existingBook) {
      book.shelf = existingBook.shelf;
    } else {
      book.shelf = 'none';
    }
  }

  render() {
    const { onChangeShelf } = this.props;
    const { matchingBooks } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {matchingBooks.map(book => (
              <Book key={book.id} book={book} onChangeShelf={onChangeShelf}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
