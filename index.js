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
const restaurants = [
  {
    id: 1,
    name: 'Amfiteatru Transilvania',
    link: 'https://www.amfiteatrul.ro/',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVT98qu_VoWDmKevy7MXDlJnDd9GMLE82iUw&usqp=CAU'
  },
  {
    id: 2,
    name: 'Restaurant ROD Cluj Napoca',
    link: 'https://restaurantrod.ro/',
    img: 'https://restaurantrod.ro/wp-content/uploads/2019/02/44921155_1943713262601388_2999294508836847616_o-1500x400.jpg'
  },
  {
    id: 3,
    name: 'Naked Beach Bar',
    link: 'https://www.nakedbeachbar.ro/',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH2jT4OdscCi0pl6rrU3AIqgS-xU0RQcH8zg&usqp=CAU'
  },
  {
    id: 4,
    name: 'Roata Faget',
    link: 'https://www.roatafaget.ro/',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmCw4VS6MUiKGcAa4jUuDnM-T_oDzW8I-xhw&usqp=CAU'
  }
]

app.post('/api/login', function (req, res) {
  if (req.body.email === 'a' && req.body.password === '1') {
    res.send({
      name: 'Cristian',
      role: 'admin'
    })
  }
})

app.get('/posts', function (req, res) {
  res.send(posts)
})

app.get('/api/restaurants', function (req, res) {
  res.send(restaurants)
})

app.get('/api/restaurants/:id', function (req, res) {
  const id = req.params.id
  const restaurant = restaurants
    .filter(object => +object.id === +id)
    .map(obj => ({
      ...obj,
      available: false
    }))[0]
  res.send(restaurant)
})

app.post('/api/book', function ({body}, res) {
  const success = `Rezervarea dumneavoastra in data de ${body.date}
    pentru ${body.persoane} persoane a fost facuta cu succes!`
  const fail = `Ne pare rau, nu mai avem locuri`
  const response = [success, fail]
  const msg = (Math.random() * 10).toFixed() > 5 ? response[0] : response[1]
  if (body.persoane > 10) {
    res.send({msg: 'mai usor cu persoanele!'})
  } else {
    res.send({msg})
  }
})

app.get('/posts/:id', function (req, res) {
  const index = posts.findIndex(function ({id}) { return +id === +req.params.id})
  res.send(posts[index])
})

app.post('/posts', function (req, res) {
  const post = req.body
  post.id = posts.length + 1
  posts.push(post)
  res.send(post)
})
