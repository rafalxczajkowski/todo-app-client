import { TaskRow } from './TaskRow'

export function TaskList({ tasks, completed, refreshLists }) {
  const listTasks = tasks.map((task) => {
    if (task.completed === completed) {
      // TODO key
      return (
        <TaskRow
          task={task}
          key={task._id}
          taskId={task._id}
          refreshLists={refreshLists}
        />
      )
    }
    return null
  })
  return <ul>{listTasks}</ul>
}
