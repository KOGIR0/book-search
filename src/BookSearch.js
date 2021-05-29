import React from 'react';
import './BookSearch.css';

class Book extends React.Component {
  constructor(props)
  {
    super(props);

    let imgSrc = this.createImgSrc(props.data);

    this.state = {
      imgSrc_S:     imgSrc.imgSrc_S,
      imgSrc_M:     imgSrc.imgSrc_M,
      imgSrc_L:     imgSrc.imgSrc_L,
      title:        props.data.title,
      author:       props.data.hasOwnProperty("author_name")  ? 
                    props.data.author_name : "unknown author",
      publisher:    props.data.hasOwnProperty("publisher")    ? 
                    props.data.publisher[0] : "unknown publisher",
      publish_date: props.data.hasOwnProperty("publish_date") ? 
                    props.data.publish_date[0] : "unknown publish_date",
      isbn:         props.data.hasOwnProperty("isbn")         ? 
                    props.data.isbn[0] : "unhnown isbn",
      display:      false
    }
    
  }

  createImgSrc(data)
  {
    let imgSrc = "";

    //ISBN, OCLC, LCCN, OLID and ID
    let properties = ["isbn", "lccn", "oclc", "id"];

    if(data.hasOwnProperty("cover_i"))
    {
      imgSrc = "http://covers.openlibrary.org/b/id/" + data["cover_i"].toString();
    }
    else if(data.hasOwnProperty("edition_key"))
    {
      imgSrc = "http://covers.openlibrary.org/b/olid/" + data["edition_key"][0].toString();
    } else {
      properties.forEach((key) => {
        if(data.hasOwnProperty(key))
        {
          imgSrc = "http://covers.openlibrary.org/b/" + 
                    key.toString() + "/" + data[key][0].toString();
        }
      });
    }

    let imgSrc_S = imgSrc + "-S.jpg?default=false";
    let imgSrc_M = imgSrc + "-M.jpg?default=false";
    let imgSrc_L = imgSrc + "-L.jpg?default=false";

    return {imgSrc_S: imgSrc_S, imgSrc_M: imgSrc_M, imgSrc_L: imgSrc_L};
  }

  render() {
    const onClick = () => this.setState({display: !this.state.display});

    return(
      <div onClick={onClick} className="book-item">
        {
          !this.state.display ?
          <img className="img-medium" src={this.state.imgSrc_M} alt="No Medium Cover"/>
          : null
        }
        {
          this.state.display ?
          <img className="img-large" src={this.state.imgSrc_L} alt="No Large Cover"/>
          : null
        }
        <div className="info-block">
          <div class="info-field">
            <span className="title">Title:</span>{this.state.title}
          </div>
          <div class="info-field">
            <span className="title">Author:</span>{this.state.author}
          </div>
          {/*this part is shown on click*/}
          {
            this.state.display ?
            <div class="info-field">
              <span className="title">Publisher:</span>{this.state.publisher}
            </div>
            : null 
          }
          {
            this.state.display ?
            <div class="info-field">
              <span className="title">Publish date:</span> {this.state.publish_date}
            </div>
            : null
          }
          {
            this.state.display ?
            <div class="info-field">
              <span className="title">ISBN:</span> {this.state.isbn}
            </div>
            : null
          }
        </div>
      </div>
    );
  }
}

function BooksList(props) {
  let bookItems = props.data.map((data) => {
    return (
      <li class="books-list" key={data.key}>
        <Book data={data}/>
      </li>
    );
  });

  return (
    <ul style={{listStyle: "none"}}>{bookItems}</ul>
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
        <div style={{textAlign: "center"}}>
          <input type="text" onChange={this.handleChange}></input>
        </div>
        <BooksList data={this.state.searchResult}/>
      </div>
    );
  }
}

export default BookSearch;
