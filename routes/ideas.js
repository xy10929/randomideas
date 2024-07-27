const express = require('express')
const router = express.Router()

const ideas = [
  { id: 1, text: 'text1' },
  { id: 2, text: 'text2' },
  { id: 3, text: 'text3' },
]

//get all ideas
router.get('/', (req, res) => {
  res.json({ success: true, data: ideas })
})

//get single idea
router.get('/:id', (req, res) => {
  //+: string -> number
  const idea = ideas.find((idea) => idea.id === +req.params.id)

  if (!idea) {
    return res.status(404).json({ success: false, error: 'Resourse not found' })
  }

  res.json({ success: true, data: idea })
})

//add a idea
router.post('/', (req, res) => {
  const idea = {
    id: ideas.length + 1,
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    date: new Date().toISOString().slice(0, 10),
  }

  ideas.push(idea)

  res.json({ success: true, data: idea })
})

//update idea
router.put('/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id)

  if (!idea) {
    return res.status(404).json({ success: false, error: 'Resourse not found' })
  }

  idea.text = req.body.text || idea.text
  idea.tag = req.body.tag || idea.tag

  res.json({ success: true, data: idea })
})

//delete a idea
router.delete('/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id)

  if (!idea) {
    return res.status(404).json({ success: false, error: 'Resourse not found' })
  }

  const index = ideas.indexOf(idea)
  //parameters: start, deleteCount
  ideas.splice(index, 1)

  res.json({ success: true, data: {} })
})

module.exports = router
