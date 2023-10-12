import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import NewTaskForm from './components/NewTaskForm'

export const apiPath = 'https://xrttrx-todo-app-server.azurewebsites.net/api/'

export interface Task {
  _id: string
  name: string
  completed: boolean
}

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
    const res = await fetch(apiPath)
    const data = await res.json()
    setTasks(data)
  }

  const completedTasks: Task[] = tasks.filter((task: Task) => task.completed)
  const uncompletedTasks: Task[] = tasks.filter((task: Task) => !task.completed)

  return (
    <main>
      <h3>Your Todo list</h3>
      <TaskList tasks={uncompletedTasks} refreshLists={refreshLists} />
      <NewTaskForm refreshLists={refreshLists} />
      <TaskList tasks={completedTasks} refreshLists={refreshLists} />
    </main>
  )
}
