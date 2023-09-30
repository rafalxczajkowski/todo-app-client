'use client'

import { TaskRow } from './TaskRow'
export const path = 'http://localhost:3001/api/'

export default function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskRow key={task._id} {...task} />
      ))}
    </ul>
  )
}
