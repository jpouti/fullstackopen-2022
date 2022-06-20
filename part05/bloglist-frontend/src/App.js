import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogsService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import './styles/App.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [notifyMessage, setNotifyMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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

  // display blogs by username & sorting blogs by showing the ones with most likes first
  const userBlogs = () => {
    const usersBlogs = blogs.filter(blog => blog.user.username === user.username)
    return usersBlogs.sort((a, b) => b.likes - a.likes)
  }

  const handleLike = async (blog) => {
    const likeBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      const updatedBlog = await blogsService
        .update(likeBlog)
      setNotifyMessage(`Blog: ${updatedBlog.title} has been liked`)
      setTimeout(() => {
        setNotifyMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
      setErrorMessage('Liking a blog has been failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        const deletedBlog = await blogsService
          .deleteBlog(blog.id)
        setNotifyMessage(`Blog: ${deletedBlog.title} has been removed`)
        setTimeout(() => {
          setNotifyMessage(null)
        }, 5000)
      } catch (error) {
        console.log(error)
        setErrorMessage('Deleting a blog has been failed')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } else {
      setNotifyMessage(`Removing blog: ${blog.title} was cancelled`)
      setTimeout(() => {
        setNotifyMessage(null)
      }, 5000)
    }
  }

  // log out, clear local storage
  const logoutHandler = () => {
    const username = user.name
    window.localStorage.clear()
    setUser(null)
    setNotifyMessage(`${username} logged out`)
    setTimeout(() => {
      setNotifyMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage !== null &&
      <Notification message={errorMessage} styles='errorMsg'/>}
      {notifyMessage !== null &&
      <Notification message={notifyMessage} styles='succesfulEvent'/>}
      {user === null ?
        loginForm() :
        <div className='flex-container'>
          <p>{user.name} logged-in</p>
          <button onClick={() => logoutHandler()}>logout</button>
        </div> }
      <Togglable showButton='create new blog' ref={blogFormRef}>
        <BlogForm
          setErrorMessage={setErrorMessage}
          setNotifyMessage={setNotifyMessage}
          setBlogs={setBlogs}
          blogs={blogs}
          blogFormRef={blogFormRef}
        />
      </Togglable>

      <div>
        {user !== null && userBlogs().map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDeleteBlog={handleDeleteBlog} />
        )}
      </div>
    </div>
  )
}

export default App
