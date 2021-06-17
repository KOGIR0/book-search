import React from 'react';
import { connect } from 'react-redux';
import './BookSearch.css';
import * as CONST from '../constants';
import BooksList from './BooksList';

class BookSearch extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      timerId: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  search(value)
  {
    const url = 'http://openlibrary.org/search.json?q=' + value.split(' ').join("+");
    fetch(url)
      .then(response => 
        {
          if(response.ok) {
            return response.json();
          }
          else {
            console.log("Error: " + response.console.error());
          }
        }
      )
      .then(data =>
      {
        this.props.dispatch({
          type: CONST.ADD_BOOKS,
          books: data.docs
        });
      });
  }

  handleChange(e)
  {
    clearInterval(this.state.timerId);
    this.setState({
      timerId: setTimeout(this.search, 1000, e.target.value)
    });
  }

  render()
  {
    return (
      <div>
        <div style={{textAlign: "center"}}>
          <label>Search:</label><input id="search-input" type="text" onChange={this.handleChange} placeholder="Enter book name or author"></input>
        </div>
        <BooksList data={this.props.books} dispatch={this.props.dispatch}/>
      </div>
    );
  }
}

function mapStateToProps(state)
{
  return {
    books: state.books
  }
}

export default connect(mapStateToProps)(BookSearch);
