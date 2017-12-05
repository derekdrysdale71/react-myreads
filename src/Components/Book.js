import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelfSelector from './ShelfSelector';
import noCoverImage from '../icons/no-cover-image.png';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }


  render() {
    const { book, onChangeShelf } = this.props
    const coverImage = book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : noCoverImage
    const coverStyle = {
      width: 128,
      height: 193,
      backgroundImage: `url(${coverImage})`
    }
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={ coverStyle }></div>
            <ShelfSelector book={book} onChangeShelf={onChangeShelf}/>
          </div>
          <div className="book-title">{ book.title }</div>
          <div className="book-authors">{ book.authors }</div>
        </div>
      </li>
    )
  }
}

export default Book
