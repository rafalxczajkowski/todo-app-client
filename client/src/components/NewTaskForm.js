'use client'

import { FiPlus } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { path } from './TaskList'

export default function NewTaskForm() {
  const [newTask, setNewTask] = useState('')

  const router = useRouter()

  async function addTask(name) {
    try {
      await fetch(`${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, completed: false }),
      })
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (newTask === '') return
    await addTask(newTask)
    // setNewTask('')
    router.refresh()
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
