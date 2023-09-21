import Task from '../models/Task.js'
import { Router } from 'express'
const router = Router()

router.get('/', async (req, res) => {
  try {
    const allTasks = await Task.find()
    res.status(200).json(allTasks)
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message)
  }
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
  try {
    const { id } = req.params
    const taskUpdated = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json(taskUpdated)
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const taskDeleted = await Task.findByIdAndDelete(id)
    res.status(200).json(taskDeleted)
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message)
  }
})

export default router
