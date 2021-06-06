import React from 'react';
import { connect } from 'react-redux';
import './BookSearch.css';
import {store, constants} from './reducerStorage';

class Book extends React.Component
{
  constructor(props)
  {
    super(props);

    this.onError = this.onError.bind(this);
  }

  onError()
  {
    store.dispatch({key: this.props.data.key, type: constants.CHANGE_IMG_SRC, imgSrc: "/NoBookCover.jpg"});
  }

  render()
  {
    const onClick = () => {
      store.dispatch({key: this.props.data.key, type: constants.SHOW_ADITIONAL_INFO});
    }

    return (
      <div onClick={onClick} className="book-item">
        {
          !this.props.data.display ?
          <img className="img-medium" src={this.props.data.imgSrc_M} onError={this.onError} alt="No Medium Cover"/>
          : null
        }
        {
          this.props.data.display ?
          <img className="img-large" src={this.props.data.imgSrc_L} onError={this.onError} alt="No Large Cover"/>
          : null
        }
        <div className="info-block">
          <div className="info-field">
            <span className="title">Title:</span>{this.props.data.title}
          </div>
          <div className="info-field">
            <span className="title">Author:</span>{this.props.data.author}
          </div>
          {/*this part is shown on click*/}
          {
            this.props.data.display ?
            <div className="info-field">
              <span className="title">Publisher:</span>{this.props.data.publisher}
            </div>
            : null 
          }
          {
            this.props.data.display ?
            <div className="info-field">
              <span className="title">Publish date:</span> {this.props.data.publish_date}
            </div>
            : null
          }
          {
            this.props.data.display ?
            <div className="info-field">
              <span className="title">ISBN:</span> {this.props.data.isbn}
            </div>
            : null
          }
        </div>
      </div>
    );
  }
}

function BooksList(props)
{
  let bookItems = props.data.map((data) => 
  {
    return (
      <li className="books-list" key={data.key}>
        <Book data={data}/>
      </li>
    );
  });

  return (
    <ul style={{listStyle: "none"}}>{bookItems}</ul>
  );
}

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
          type: constants.ADD_BOOKS,
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
          <input type="text" onChange={this.handleChange}></input>
        </div>
        <BooksList data={this.props.books}/>
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
