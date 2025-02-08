import { useGetUsersQuery } from "../users/usersApiSlice"
import { useAddNewTaskMutation } from "./tasksApiSlice"
import NewTask from "./NewTask"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import ErrorComponent from "../../components/ErrorComponent"

const NewTaskForm = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  const [addNewTask, {
    isLoading: isAddTaskLoading,
    isSuccess: isAddTaskSuccess,
    isError: isAddTaskError,
    error: addTaskerror
  }] = useAddNewTaskMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (isAddTaskSuccess) {
      setUserId("")
      setTitle("")
      setDesc("")
      navigate("/dash/tasks")
    }

  }, [isAddTaskSuccess, navigate])


  let listOfUsers
  const [userId, setUserId] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  // const []

  const handleSelctUser = (e) => {
    if (!e.target.value || e.target.value == "Select one option") {
      e.target.classList.add("outline-2", "outline-offset-2", "outline-red-500")
    } else {
      e.target.classList.remove("outline-2", "outline-offset-2", "outline-red-500")
    }
    setUserId(e.target.value)
  }
  if (isSuccess) {
    const { ids } = users
    listOfUsers = ids?.length ? ids.map(id => <NewTask key={id} userId={id} />) : null
  }

  const handleTitleChange = (e) => {
    const title = e.target.value.trim()
    if (title) {
      setTitle(title)
    }
  }

  const handleDescChange = (e) => {
    const desc = e.target.value.trim()
    if (desc) {
      setDesc(desc)
    }
  }

  const [errorClass, setErrorClass] = useState(false)
  const [errorContent, setErrorContent] = useState()

  const handleTaskSubmit = async (e) => {
    e.preventDefault()
    const newUser = await addNewTask({ user: userId, title, text: desc })
    newUser?.error ? setErrorClass(true) : setErrorClass(false)
    setErrorContent(newUser?.error?.data?.message)
    console.log(errorContent, errorClass)
  }

  let content
  if (isLoading) content = <p>Loading...</p>
  if (isError) content = <p className={errorClass}>{error?.data?.message}</p>
  if (isSuccess) {
    content = <>
      <div className="flex flex-col justify-center items-center ">
        <ErrorComponent errorClass={errorClass} errorContent={errorContent} />
        <div className="flex flex-col w-1/2">
          <h2>New Task</h2>
          <form className="flex flex-col">
            <label htmlFor="usersSelect" className="form-label">
              Select User to Assign Task To:
            </label>
            <select
              name="userSelect"
              id="userSelect"
              className="border border-gray-500"
              onChange={handleSelctUser}
              onBlur={handleSelctUser}>
              <option className="text-gray-500">Select one option</option>
              {listOfUsers}
            </select>
            <label htmlFor="taskTitle" className="form-label">
              Title of Task:
            </label>
            <input
              type="text"
              id="taskTitle"
              name="title"
              className="border border-gray-500"
              placeholder="Enter Task Title"
              onChange={handleTitleChange} />
            <label htmlFor="taskDesc" className="form-label">
              Describe the Task:
            </label>
            <textarea
              name="text"
              onBlur={handleDescChange}
              className="border border-gray-500"
              id="taskDesc" />
            <button
              className="px-4 py-2 bg-green-500 rounded mt-2"
              onClick={handleTaskSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  }

  return content
}

export default NewTaskForm
