import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ setToken, show, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if(result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    if (!show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()
        try {
            login({ variables: { username, password } })
            setPage('authors') // reroute back to authors page after login
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username
                    <input
                     value={username}
                     onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                     type="password"
                     value={password}
                     onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )



}

export default LoginForm