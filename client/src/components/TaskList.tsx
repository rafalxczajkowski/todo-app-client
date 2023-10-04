import { TaskRow } from './TaskRow'
import { Task } from '../App'

interface taskListProps {
  tasks: Task[]
  refreshLists: () => Promise<void>
}

export default function TaskList({ tasks, refreshLists }: taskListProps) {
  return (
    <ul>
      {tasks.map((task: Task) => (
        <TaskRow
          key={task._id}
          _id={task._id}
          name={task.name}
          completed={task.completed}
          refreshLists={refreshLists}
        />
      ))}
    </ul>
  )
}
