import React from 'react';
import { constants } from '../reducerStorage'

class Book extends React.Component
{
  constructor(props)
  {
    super(props);
    this.onError = this.onError.bind(this);
  }

  onError()
  {
    this.props.dispatch({
      key: this.props.data.key,
      type: constants.CHANGE_IMG_SRC,
      imgSrc: "/NoBookCover.jpg"
    });
  }

  render()
  {
    const onClick = () => {
      this.props.dispatch({
        key: this.props.data.key,
        type: constants.SHOW_ADITIONAL_INFO
      });
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

export default Book;