import { useState } from "react"
import SetFavorite from "./SetFavorite"
import FilteredBooks from "./FilteredBooks"


const Book = (props) => {
  return (
          <tr>
            <td>{props.book.title}</td>
            <td>{props.book.author.name}</td>
            <td>{props.book.published}</td>
          </tr>
  )
}

const Books = (props) => {
  const [genre, setGenre] = useState('all')

  const books = props.books 
  let genres = []

  if (!props.show) {
    return null
  }
  
  books.map(book => {
    book.genres.map(genre => {
      if (!genres.includes(genre)) {
        genres.push(genre)
        return genre
      } else {
        return null
      }
    })
    return genres
  })

  const showAll = () => {
    return (
      <div>
      <h2>books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            { books.map((book) => (
                <Book key={book.title} book={book} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <div>
          { genre === 'all' ? showAll() : <FilteredBooks genre={genre} />}
      </div>
      <div>
        {genres.map(genre => (
          <button key={genre} onClick={() => setGenre(genre)} >{genre}</button>
        ))}
        <button onClick={() => setGenre('all')}>all books</button>
      </div>
      { props.user && <SetFavorite genres={genres} /> }
    </div>
  )
}

export default Books
