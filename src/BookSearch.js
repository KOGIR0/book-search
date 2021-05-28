import React from 'react';
import './BookSearch.css';

function BooksList(props) {
  let bookItems = props.data.map((data) => {
    let imgSrc = ""; 
    //ISBN, OCLC, LCCN, OLID and ID
    let keys = ["isbn", "lccn", "oclc", "id"];

    if(data.hasOwnProperty("cover_i"))
    {
      imgSrc = "http://covers.openlibrary.org/b/id/" + data["cover_i"].toString() + "-S.jpg";
    }
    else if(data.hasOwnProperty("edition_key"))
    {
      imgSrc = "http://covers.openlibrary.org/b/olid/" + data["edition_key"][0].toString() + "-S.jpg";
    } else {
      keys.forEach((key) => {
        if(data.hasOwnProperty(key))
        {
          imgSrc = "http://covers.openlibrary.org/b/" + 
                    key.toString() + "/" + data[key][0].toString() + "-S.jpg";
        }
      });
    }
    imgSrc += "?default=false";
    
    return (
      <li key={data.key}>
        <img src={imgSrc} alt="cover img"/>
        {data.title}
      </li>
    );
  });

  return (
    <ul>{bookItems}</ul>
  );
}

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
    fetch(url)
      .then(response => response.json())
      .then(data => {
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

  render() {
    return (
      <div className="App">
        <input type="text" onChange={this.handleChange}></input>
        <BooksList data={this.state.searchResult}/>
      </div>
    );
  }
}

export default BookSearch;
