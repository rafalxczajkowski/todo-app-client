import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { NewTaskForm } from './NewTaskForm'
import { TaskList } from './TaskList'

export default function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    try {
      refreshLists()
    } catch (error) {
      console.error(error)
    }
  }, [])

  async function refreshLists() {
    axios.get('/api').then((res) => setTasks(res.data))
  }

  return (
    <>
      <h3>Your Todo list</h3>
      <TaskList tasks={tasks} completed={false} refreshLists={refreshLists} />
      <NewTaskForm refreshLists={refreshLists} />
      <TaskList tasks={tasks} completed={true} refreshLists={refreshLists} />
    </>
  )
}
