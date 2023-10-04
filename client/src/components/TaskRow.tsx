// import axios from 'axios'
import { FiCircle, FiXCircle } from 'react-icons/fi'
import { FaCheckCircle } from 'react-icons/fa'
import { useState } from 'react'
import { Task } from '../App'
import { apiPath } from '../App'

interface taskRowProps extends Task {
  refreshLists: () => Promise<void>
}

export function TaskRow({ _id, name, completed, refreshLists }: taskRowProps) {
  const [taskName, setTaskName] = useState(name)
  const [isCompleted, setIsCompleted] = useState(completed)

  const icon = isCompleted ? <FaCheckCircle /> : <FiCircle />

  async function updateName(newName: string) {
    try {
      await fetch(`${apiPath}${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      })
      refreshLists()
    } catch (error) {
      console.log(error)
    }
  }

  async function toggleTask() {
    try {
      await fetch(`${apiPath}${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !isCompleted }),
      })
      setIsCompleted(!isCompleted)
      refreshLists()
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteTask() {
    try {
      await fetch(`${apiPath}${_id}`, {
        method: 'DELETE',
      })
      refreshLists()
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
