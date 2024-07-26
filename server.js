const express = require('express')
const port = 5000

const app = express()

const ideas = [
  { id: 1, text: 'text1' },
  { id: 2, text: 'text2' },
  { id: 3, text: 'text3' },
]

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' })
})

app.get('/api/ideas', (req, res) => {
  res.json({ success: true, data: ideas })
})

app.get('/api/ideas/:id', (req, res) => {
  //+: string -> number
  const idea = ideas.find((idea) => idea.id === +req.params.id)

  if (!idea) {
    return res.status(404).json({ success: false, error: 'Resourse not found' })
  }

  res.json({ success: true, data: idea })
})

app.listen(port, () => console.log(`Server listening on port ${port}`))
