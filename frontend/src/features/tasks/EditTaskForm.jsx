import { useEffect, useState } from 'react'
import InputComponent from '../../components/InputComponent'
import { Save, Trash } from 'lucide-react'
import { useUpdateTaskMutation } from './tasksApiSlice'
import { useDeleteTaskMutation } from './tasksApiSlice'
import { Navigate, useNavigate } from 'react-router-dom'

const EditTaskForm = ({ task, users }) => {
  const [updateTask, {
    isLoading: isUpdateTaskLoading,
    isSuccess: isUpdateTaskSuccess,
    isError: isUpdateTaskError,
    error: updateError
  }] = useUpdateTaskMutation()

  const [deleteTask, {
    isLoading: isDeleteTaskLoading,
    isSuccess,
    isError: isDeleteTaskError,
    error: deleteTaskError
  }] = useDeleteTaskMutation()

  const [userId, setUserId] = useState(task.user)
  const [title, setTitle] = useState(task.title)
  const [text, setText] = useState(task.text)
  const [completed, setCompleted] = useState(task.completed)

  const navigate = useNavigate()

  useEffect(() => {
    if (isUpdateTaskSuccess || isSuccess) {
      setUserId("")
      setTitle("")
      setText("")
      setCompleted("")
      navigate("/dash/tasks")
    }
  }, [isUpdateTaskSuccess, isSuccess, navigate])

  useEffect(() => {
    console.log(completed)
  }, [completed])

  let canSave = [task.user !== userId, task.title !== title, task.text !== text, task.completed !== completed].some(Boolean)

  const handleTitleChange = (e) => setTitle(e.target.value)

  const handleDescChange = (e) => setText(e.target.value)

  const handleUserChange = (e) => setUserId(e.target.value)

  const handleCompleted = () => setCompleted(prev => !prev)


  const handleTaskDelete = async () => {
    await deleteTask({ id: task.id })
  }

  const handleTaskSave = async () => {
    await updateTask({ id: task.id, user: userId, title, text, completed })
  }

  let listOfUsers
  if (users) {
    listOfUsers = users.map(user => {
      return (
        <option
          value={user._id}
          key={user._id}>
          {user.username}
        </option>
      )
    })

  }

  return (
    <div className='flex justify-center'>
      <form onSubmit={e => e.preventDefault()} className="flex flex-col w-1/2">
        <InputComponent
          labelText="Task Title:"
          type="text"
          id="taskTitle"
          name="title"
          ph="Enter a Task Title"
          value={title}
          autocomplete="off"
          onchange={handleTitleChange}
          classes="" />
        <InputComponent
          labelText="Task Description:"
          type="text"
          id="taskDesc"
          name="text"
          ph="Enter a Task Description"
          value={text}
          autocomplete="off"
          onchange={handleDescChange}
          classes="" />
        <div className="flex items-center justify-between">
          <div className='flex flex-col flex-1'>
            <label className="form-label" htmlFor="users">
              Assigned To:
            </label>
            <select
              name="roles"
              value={userId}
              className={`border overflow-hidden py-2 outline-none form-select`}
              onChange={handleUserChange}
              id="roles">
              {listOfUsers}
            </select>
          </div>
          <div className='flex-1 gap-2 flex justify-end'>
            <label htmlFor="completed" className="form-label">
              Completed Status: 
            </label>
            <input type="checkbox" name="completed" id="completed" checked={completed} onChange={handleCompleted} />
          </div>
        </div>
        <div className="flex mt-5 justify-between">
          <button
            disabled={!canSave}
            title="Save"
            className="icon-button gap-2 bg-green-500"
            onClick={handleTaskSave} >
            Save Changes <Save />
          </button>
          <button
            title="Delete"
            className="icon-button gap-2 bg-red-500"
            onClick={handleTaskDelete} >
            Delete Task <Trash />
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditTaskForm
