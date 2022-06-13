const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
const cors = require('cors');
const Blog = require('./models/blog');

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(savedBlog => {
      response.json(savedBlog);
    })
    .catch(error => next(error))
})

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})