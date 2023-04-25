import { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle, faCircleXmark } from '@fortawesome/free-regular-svg-icons'

export function TaskRow({ task, taskId, refreshLists }) {
  const [isCompleted, setIsCompleted] = useState(task.completed)
  const [taskName, setTaskName] = useState(task.name)

  async function deleteTask() {
    try {
      await axios.delete(`/api/${taskId}`)
      refreshLists()
    } catch (error) {
      console.log(error)
    }
  }

  async function updateName(newName) {
    try {
      await axios.patch(`/api/${taskId}`, { name: newName })
    } catch (error) {
      console.log(error)
    }
  }

  async function toggleTask() {
    try {
      await axios.patch(`/api/${taskId}`, { completed: !isCompleted })
      setIsCompleted(!isCompleted)
      refreshLists()
    } catch (error) {
      console.log(error)
    }
  }

  let isCompletedClassName = ''
  let icon = ''

  if (isCompleted) {
    isCompletedClassName = 'completed'
    icon = faCircleCheck
  } else {
    isCompletedClassName = 'uncompleted'
    icon = faCircle
  }

  return (
    <li className={`task-row ${isCompletedClassName}`}>
      <div className="icon-container">
        <FontAwesomeIcon icon={icon} onClick={() => toggleTask()} />
      </div>
      <input
        className="task-name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onBlur={(e) => {
          updateName(e.target.value)
        }}
      />
      <div className="icon-container">
        <FontAwesomeIcon icon={faCircleXmark} onClick={() => deleteTask()} />
      </div>
    </li>
  )
}
