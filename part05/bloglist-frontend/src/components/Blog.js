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


  return (
    <div style={blogStyle}>
      <div className='flex-container'>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <button onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
      </div>
      {visible !== false &&
      <div style={showDetails}>
        <p id='blog-url'>{blog.url}</p>
        <div className='flex-container'>
          <p id='blog-likes'>likes {blog.likes}</p>
          <button id='like-btn' onClick={() => handleLike(blog)}>like</button>
        </div>
        <p>{blog.author}</p>
        <button onClick={() => handleDeleteBlog(blog)} id='remove-btn'>remove</button>
      </div> }
    </div>
  )
}

export default Blog


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
}