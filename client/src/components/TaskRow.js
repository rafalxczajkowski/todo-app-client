// import axios from 'axios'
import { FiCircle, FiXCircle } from 'react-icons/fi'
import { FaCheckCircle } from 'react-icons/fa'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { path } from './TaskList'

export function TaskRow({ _id, name, completed }) {
  const [taskName, setTaskName] = useState(name)
  const [isCompleted, setIsCompleted] = useState(completed)

  const router = useRouter()
  const icon = isCompleted ? <FaCheckCircle /> : <FiCircle />

  async function updateName(newName) {
    try {
      await fetch(`${path}${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      })
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  async function toggleTask() {
    try {
      await fetch(`${path}${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !isCompleted }),
      })
      setIsCompleted(!isCompleted)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteTask() {
    try {
      await fetch(`${path}${_id}`, {
        method: 'DELETE',
      })
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  let isCompletedClassName = 'uncompleted'
  if (isCompleted) {
    isCompletedClassName = 'completed'
  }

  return (
    <li className={`task-row ${isCompletedClassName}`}>
      <div
        className='icon-container check-icon-container'
        onClick={() => toggleTask()}
      >
        {icon}
      </div>
      <input
        id={_id}
        className='task-name-input'
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onBlur={(e) => {
          updateName(e.target.value)
        }}
      />
      <div
        className='icon-container delete-icon-container'
        onClick={() => deleteTask()}
      >
        <FiXCircle />
      </div>
    </li>
  )
}
