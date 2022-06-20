import { useState } from 'react'
import blogsService from '../services/blogs'

const BlogForm = ({ setErrorMessage, setNotifyMessage, setBlogs, blogs, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blog = {
      title: title,
      author: author,
      url: url
    }
    try {
      const newBlog = await blogsService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setNotifyMessage(`a new blog added: ${blog.title} by ${blog.author}`)
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setNotifyMessage(null)
      }, 5000)

    } catch (error) {
      console.log(error)
      setErrorMessage('Adding a new blog failed, please input all the fields and try again!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
              title
          <input type="text"
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
              author
          <input type="text"
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
              url
          <input type="text"
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm