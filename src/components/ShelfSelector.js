import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ShelfSelector extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  /**
   * @description
  */
  handleChangeShelf = (event) => {
    event.preventDefault()
    this.props.onChangeShelf(this.props.book, event.target.value)
  }

  render() {
    const { book } = this.props;
    return(
      <div className="book-shelf-changer">
        <select value={book.shelf ? book.shelf : 'none'} onChange={(e) => this.handleChangeShelf(e)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfSelector;
