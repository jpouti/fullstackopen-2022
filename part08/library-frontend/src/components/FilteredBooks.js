import { useQuery } from "@apollo/client"
import { BOOKS_BY_GENRE } from "../queries"

const FilteredBooks = (props) => {
    const genreToFilter = props.genre
    const result = useQuery(BOOKS_BY_GENRE, {
      variables: { genreToFilter }
    })
  
    if (result.loading) {
      return <div>loading..</div>
    }
  
    const books = result.data.allBooks

    
    return (
        <div>
        <h2>{props.favorite ? 'recommendations' : 'books'}</h2>
          <table>
            <tbody>
              <tr>
              <td> {props.favorite ? 'books in your favorite genre' : 'in genre'} <b>{props.genre}</b></td>
              </tr>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              { books.map((book) => (
                <tr key={book.title}>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
  }

  export default FilteredBooks