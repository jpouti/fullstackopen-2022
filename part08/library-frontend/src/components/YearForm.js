import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_YEAR } from '../queries'
import Select from 'react-select'

const YearForm = ({ authors }) => {
  const [selectedName, setSelectedName] = useState(null)
  const [year, setYear] = useState('')

  const [ setBornYear, result ] = useMutation(SET_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  let options = []
  authors.map(author => (
    options.push({
        value: author.name,
        label: author.name
    })
    ))

  const submit = (event) => {
    event.preventDefault()
    console.log('edit author..')
    const name = selectedName.value
    const setBornTo = year
    setBornYear({ variables: { name, setBornTo }})

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
        <Select
         defaultValue={selectedName}
         onChange={setSelectedName}
         options={options}
        />
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