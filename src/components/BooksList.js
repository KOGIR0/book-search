import Book from './Book'

function BooksList(props)
{
  let bookItems = props.data.map((data) => 
  {
    return (
      <li className="books-list" key={data.key}>
        <Book data={data} dispatch={props.dispatch}/>
      </li>
    );
  });

  return (
    <ul style={{listStyle: "none"}}>{bookItems}</ul>
  );
}

export default BooksList;