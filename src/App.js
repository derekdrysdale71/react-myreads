import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './components/ListBooks';
import SearchBooks from './components/SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /**
   * @description Call update api and update shelf property
  */
  onChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
       BooksAPI.getAll().then((books) => {
        this.setState({ books })
      });
    });
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={books} onChangeShelf={this.onChangeShelf}/>
          )}
        />
        <Route path='/search' render={({history}) => (
          <SearchBooks books={books} onChangeShelf={this.onChangeShelf}/>
          )}
        />
      </div>
    )
  }
}
export default BooksApp;
