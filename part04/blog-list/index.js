//const logger = require('./utils/logger');
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

// ---- MONGOOSE

const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error)
    })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
const Blog = mongoose.model('Blog', blogSchema);



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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})