const router = require('express').Router()
const Comment = require('../models/comment')

router.get('/', async (request, response) => {
  const comments = await Comment.find({})
  response.json(comments)
})

router.post('/', async (request, response) => {
  const { content } = request.body

  const comment = new Comment({
    content
  })

  const savedComment = await comment.save()

  response.json(savedComment)
})

module.exports = router