import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_FAVORITE } from '../queries'
import Select from 'react-select'

const SetFavorite = (props) => {
    const [selectedGenre, setSelectedGenre] = useState(null)

    const [ setFavoriteGenre, result ] = useMutation(SET_FAVORITE)

    let options = []
    props.genres.map(genre => (
        options.push({
            value: genre,
            label: genre
        })
    ))

    const submit = (event) => {
        event.preventDefault()
        console.log('selecting favorite genre..')
        const setFavorite = selectedGenre.value
        setFavoriteGenre({ variables: { setFavorite } })
    }

    useEffect(() => {
       if(result.data && result.data.setFavorite === null) {
        console.log('favorite genre not found')
       }
    }, [result.data])

    return (
        <div>
            <h2>Set Favorite genre</h2>
            <form onSubmit={submit}>
                <Select
                    defaultValue={selectedGenre}
                    onChange={setSelectedGenre}
                    options={options}
                />
                <button type='submit'>update favorites</button>
            </form>
        </div>
    )
}

export default SetFavorite