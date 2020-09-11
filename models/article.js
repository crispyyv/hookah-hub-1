const mongoose = require('mongoose')


const articleSchema = mongoose.Schema({
  number: String,
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  }
})

articleSchema.statics.findByNum = async (num) =>{
  const article = await Article.findOne({number : num})
  return article
}


const Article = mongoose.model('Article', articleSchema)

module.exports = Article