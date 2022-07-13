import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, USER } from './queries'
import LoginForm from './components/LoginForm'
import FilteredBooks from './components/FilteredBooks'


export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (books) => {
    let seen = new Set()
    return books.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook))
    }
  })
} 


const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')


  const allAuthors = useQuery(ALL_AUTHORS)

  const allBooks = useQuery(ALL_BOOKS)

  const favorite = useQuery(USER)

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} by ${addedBook.author.name} added`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  if(allAuthors.loading || allBooks.loading ) {
    return <div>loading..</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors show={page === 'authors'} authors={allAuthors.data.allAuthors} />

        <Books show={page === 'books'} books={allBooks.data.allBooks} />

        <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />

      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} authors={allAuthors.data.allAuthors} user={token} />

      <Books show={page === 'books'} books={allBooks.data.allBooks} user={token}/>

      <NewBook show={page === 'add'} />

      { page === 'recommend' && <FilteredBooks genre={favorite.data.me.favorite} favorite={true} />}
    </div>
  )
}

export default App