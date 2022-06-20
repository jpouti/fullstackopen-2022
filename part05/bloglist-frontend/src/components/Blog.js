import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDeleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const showDetails = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDeleteBlog: PropTypes.func.isRequired,
  }

  return (
    <div style={blogStyle}>
      <div className='flex-container'>
        <p>{blog.title}</p>
        <button onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
      </div>
      <div style={showDetails}>
        <p>{blog.url}</p>
        <div className='flex-container'>
          <p>{blog.likes}</p>
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <p>{blog.author}</p>
        <button onClick={() => handleDeleteBlog(blog)} id='remove-btn'>remove</button>
      </div>
    </div>
  )
}

export default Blog