import {createStore} from 'redux'
import * as CONST from './constants'

const initialState = {
    books: []
};

function createImgSrc(data)
{
  let imgSrc = "";

  //ISBN, OCLC, LCCN, OLID and ID
  let properties = ["isbn", "lccn", "oclc", "id"];

  if(data.hasOwnProperty("cover_i"))
  {
    imgSrc = "http://covers.openlibrary.org/b/id/" + data["cover_i"].toString();
  }
  else if(data.hasOwnProperty("last_modified_i"))
  {
    imgSrc = "http://covers.openlibrary.org/b/id/" + data["last_modified_i"].toString();
  }
  else if(data.hasOwnProperty("edition_key"))
  {
    imgSrc = "http://covers.openlibrary.org/b/olid/" + data["edition_key"][0].toString();
  }
  else if(properties.some((key) => data.hasOwnProperty(key)))
  {
    properties.forEach((key) =>
    {
      if(data.hasOwnProperty(key))
      {
        imgSrc = "http://covers.openlibrary.org/b/" + 
                  key.toString() + "/" + data[key][0].toString();
      }
    });
  }

  return imgSrc;
}

function reducer(state = initialState, action = {})
{
    switch (action.type)
    {
        case CONST.ADD_BOOKS:
          return {
            books: action.books.map((book) => {
                let imgSrc = createImgSrc(book);
                return {
                    imgSrc_M:     imgSrc + "-M.jpg?default=false",
                    imgSrc_L:     imgSrc + "-L.jpg?default=false",
                    key:          book.key,
                    title:        book.title,
                    author:       book.hasOwnProperty("author_name")  ? 
                                  book.author_name : "unknown author",
                    publisher:    book.hasOwnProperty("publisher")    ? 
                                  book.publisher[0] : "unknown publisher",
                    publish_date: book.hasOwnProperty("publish_date") ? 
                                  book.publish_date[0] : "unknown publish_date",
                    isbn:         book.hasOwnProperty("isbn")         ? 
                                  book.isbn[0] : "unknown isbn",
                    display:      false
                }
            })
          }
        case CONST.CHANGE_IMG_SRC:
            return {
              books: state.books.map((book) => {
              if(book.key === action.key)
              {
                book.imgSrc_L = action.imgSrc;
                book.imgSrc_M = action.imgSrc;
                book.imgSrc_S = action.imgSrc;
              }
              return book;
            })}
        case CONST.SHOW_ADITIONAL_INFO:
            return {
              books: state.books.map((book) => {
              if(book.key === action.key)
              {
                book.display = !book.display;
              } else {
                book.display = false;
              }
              return book;
            })
          }
        default:
          return state;
    }
}

export let store = createStore(reducer);