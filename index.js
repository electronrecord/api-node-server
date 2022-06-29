const express = require('express')
const app = express()
const PORT = 3310
app.use(express.json())
const server = app.listen(PORT, function () { console.log(`port started on http://localhost:${PORT}`) })

const posts = [
  {
    id: 1,
    title: 'My first post',
    body: 'This is the body of the first post'
  },
  {
    id: 2,
    title: 'My second post',
    body: 'This is the body of the second post'
  }
]

app.get('/posts', function (req, res) {
  res.send(posts)
})

app.get('/posts/:id', function (req, res) {
  const index = posts.findIndex(function ({id}) { return +id === +req.params.id})
  res.send(posts[index])
})

app.post('/posts', function (req, res) {
  const post = req.body
  post.id = posts.length + 1
  posts.push(post)
  res.sendStatus(200)
})
