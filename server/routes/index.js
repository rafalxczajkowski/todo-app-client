const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

router.get('/', async (req, res) => {
  const allTasks = await Task.find()
  res.status(200).json(allTasks)
})

router.post('/', async (req, res) => {
  try {
    const newTask = await Task.create(req.body)
    res.status(201).json(newTask)
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message)
  }
})

router.patch('/:id', async (req, res) => {
  const { id: taskId } = req.params
  const taskUpdated = await Task.findByIdAndUpdate(taskId, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json(taskUpdated)
})

router.delete('/:id', async (req, res) => {
  const { id: taskId } = req.params
  const taskDeleted = await Task.findByIdAndDelete(taskId)
  res.status(200).json(taskDeleted)
})

module.exports = router
