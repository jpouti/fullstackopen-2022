const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  url: {
    type: String,
    required: function() { //required to have either title or url
      if (!this.title) {
        return [true, 'Title and URL missing, either of them is needed to post']
      }
    }
  },
  likes: {
    type: Number
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)