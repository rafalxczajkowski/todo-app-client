import TaskList from '@/components/TaskList'
import NewTaskForm from '@/components/NewTaskForm'

export default async function Home() {
  async function getTasks() {
    const res = await fetch('http://localhost:3001/api', { cache: 'no-store' })
    const data = await res.json()
    return data
  }

  const tasks = await getTasks()
  const completedTasks = tasks.filter((task) => task.completed)
  const uncompletedTasks = tasks.filter((task) => !task.completed)

  return (
    <main>
      <h3>Your Todo list</h3>
      <TaskList tasks={uncompletedTasks} />
      <NewTaskForm />
      <TaskList tasks={completedTasks} />
    </main>
  )
}
