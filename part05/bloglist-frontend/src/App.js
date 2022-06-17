import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogsService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import './styles/App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [notifyMessage, setNotifyMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  
  useEffect(() => {
    blogsService
      .getAll()
      .then(blogs => {
      setBlogs(blogs)
    })
    
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <Login setPassword={setPassword}
        setUsername={setUsername} 
        username={username} 
        password={password}
        setErrorMessage={setErrorMessage}
        setUser={setUser}
      />
    )
  }

  // display blogs by username after logged in
  const userBlogs = () => {
    return blogs.filter(blog => blog.user.username === user.username)
  } 

  const blogForm = () => {
    return (
      <BlogForm
      setErrorMessage={setErrorMessage}
      setNotifyMessage={setNotifyMessage}
      setBlogs={setBlogs}
      blogs={blogs}
      />
    )
  }

  // log out, clear local storage
  const logoutHandler = () => {
    console.log('logging out')
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage !== null &&
      <Notification message={errorMessage}/>}
      {notifyMessage !== null &&
      <Notification message={notifyMessage} />}
      {user === null ?
       loginForm() :
       <div>
        <p>{user.name} logged-in</p>
        <button onClick={() => logoutHandler()}>logout</button>
       {blogForm()}
       </div>
      }
      <div>
      {user !== null && userBlogs().map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    </div>
  )
}

export default App
