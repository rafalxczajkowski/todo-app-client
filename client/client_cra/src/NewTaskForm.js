import { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export function NewTaskForm({ refreshLists }) {
  const [newTask, setNewTask] = useState('')

  async function addTask(name) {
    try {
      await axios.post('/api', { name: name, completed: false })
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (newTask === '') return
    await addTask(newTask)
    setNewTask('')
    refreshLists()
  }

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="icon-container">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <input
          className="add-task-input"
          placeholder="Add task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </div>
    </form>
  )
}
