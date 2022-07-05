import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_YEAR } from '../queries'

const YearForm = () => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [ setBornYear, result ] = useMutation(SET_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = (event) => {
    event.preventDefault()
    console.log('edit author..')
    const setBornTo = year
    setBornYear({ variables: { name, setBornTo }})

    setName('')
    setYear('')
  }

  useEffect(() => {
    if(result.data && result.data.editAuthor === null) {
      console.log('author not found')
    }
  }, [result.data])
  
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
           type="number"
           value={year}
           onChange={({ target }) => setYear(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default YearForm