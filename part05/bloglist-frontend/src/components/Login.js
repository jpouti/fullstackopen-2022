import loginService from '../services/login'
import blogsService from '../services/blogs'

const Login = ({ username, password, setUsername, setPassword, setErrorMessage, setUser }) => {

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with',username, password)

        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
            )
            
            blogsService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
      }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)} 
                    />
                </div>
                <div>
                    password
                    <input type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login