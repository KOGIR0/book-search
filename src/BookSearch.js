import React from 'react';
import './BookSearch.css';

class BookSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timerId: 0,
      searchResult: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  search(value)
  {
    const url = 'http://openlibrary.org/search.json?q=' + value.split(' ').join("+");
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data.docs);
        this.setState({ searchResult: data.docs })
      });
  }

  handleChange(e)
  {
    clearInterval(this.state.timerId);
    this.setState({
      timerId: setTimeout(this.search, 1000, e.target.value)
    });
  }

  // 
  render() {
    return (
      <div className="App">
        <input type="text" onChange={this.handleChange}></input>
      </div>
    );
  }
}

export default BookSearch;
