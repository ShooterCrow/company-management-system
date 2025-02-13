import { useState, useEffect } from "react"
import { useUpdateTaskMutation, useDeleteTaskMutation } from "./tasksApiSlice"
import { useNavigate } from "react-router-dom"
import InputComponent from "../../components/InputComponent"
import { Save, Trash } from "lucide-react"
import useAuth from "../../hooks/useAuth"

const EditTaskForm = ({ task, users }) => {

  const {isAdmin, isManager} = useAuth()

  const [updateTask, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateTaskMutation()

  const [deleteTask, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
  }] = useDeleteTaskMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(task.title)
  const [text, setText] = useState(task.text)
  const [completed, setCompleted] = useState(task.completed)
  const [userId, setUserId] = useState(task.user)

  useEffect(() => {

    if (isSuccess || isDelSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dash/tasks')
    }

  }, [isSuccess, isDelSuccess, navigate])

  const handleTitleChange = e => setTitle(e.target.value)
  const handleDescChange = e => setText(e.target.value)
  const handleCompleted = e => setCompleted(prev => !prev)
  const handleUserChange = e => setUserId(e.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const handleTaskSave = async (e) => {
    if (canSave) {
      await updateTask({ id: task.id, user: userId, title, text, completed })
    }
  }

  const handleTaskDelete = async () => {
    await deleteTask({ id: task.id })
  }

  const created = new Date(task.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  const updated = new Date(task.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

  const options = users.map(user => {
    return (
      <option
        key={user.id}
        value={user.id}

      > {user.username}</option >
    )
  })

  const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
  const validTitleClass = !title ? "form__input--incomplete" : ''
  const validTextClass = !text ? "form__input--incomplete" : ''

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

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
              {options}
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
          {isAdmin || isManager ?
            (<button
              title="Delete"
              className="icon-button gap-2 bg-red-500"
              onClick={handleTaskDelete} >
              Delete Task <Trash />
            </button>) : null
          }
        </div>
      </form>
    </div>
  )
}

export default EditTaskForm
