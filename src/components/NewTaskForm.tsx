import { FiPlus } from 'react-icons/fi'
import { useState } from 'react'
import { apiPath } from '../App'

export default function NewTaskForm({
  refreshLists,
}: {
  refreshLists: () => Promise<void>
}) {
  const [newTask, setNewTask] = useState('')

  async function addTask(name: string) {
    try {
      await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, completed: false }),
      })
      refreshLists()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (newTask === '') return
    await addTask(newTask)
    setNewTask('')
    refreshLists()
  }

  return (
    <form className='new-task-form' onSubmit={handleSubmit}>
      <div className='form-row'>
        <div className='icon-container'>
          <FiPlus />
        </div>
        <input
          className='add-task-input'
          name='add-task-title'
          placeholder='Add task'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}
