import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelfSelector from './ShelfSelector';
import noCoverImage from '../icons/no-cover-image.png';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const { book, books, onChangeShelf } = this.props
    const coverImage = book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : noCoverImage
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ backgroundImage: `url(${coverImage})` }}></div>
            <ShelfSelector book={book} books={books} onChangeShelf={onChangeShelf}/>
          </div>
          <div className="book-title">{ book.title }</div>
          <div className="book-authors">{ book.authors ? book.authors.join(', ') : '' }</div>
        </div>
      </li>
    )
  }
}

export default Book;
