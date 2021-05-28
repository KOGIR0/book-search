import React from 'react';
import './BookSearch.css';

class BookSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timerId: 0,
    }

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  search(value)
  {
    console.log(value);
  }

  handleChange(e)
  {
    clearInterval(this.state.timerId);
    this.setState({
      timerId: setTimeout(this.search, 1000, e.target.value)
    });
  }

  render() {
    return (
      <div className="App">
        <input type="text" onChange={this.handleChange}></input>
      </div>
    );
  }
}

export default BookSearch;
