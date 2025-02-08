import { useState } from 'react'
import InputComponent from '../../components/InputComponent'

const EditTaskForm = ({ task, users }) => {
  const [user, setUser] = useState(task.user)
  const [title, setTitle] = useState(task.title)
  const [text, setText] = useState(task.text)
  const [listOfUsers, setListOfUsers] = useState("")

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    console.log(e.target.value)
  }

  const handleDescChange = (e) => {
    setText(e.target.value)
  }
  
  const handleUserChange = (e) => {
    // console.log(users, 1)
  }

  if (users) {
    console.log("Users found")
  }

  return (
    <div className='flex justify-center'>
      <form className="flex flex-col w-1/2">
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
        <label className="form-label" htmlFor="users">
          Assigned To:
        </label>
        <select
          name="roles"
          value={user}
          className={`border overflow-hidden py-2 outline-none form-select`}
          onChange={handleUserChange}
          id="roles">
            <option>Sammy</option>
            <option>Sammy</option>
            <option>Sammy</option>
        </select>
      </form>
    </div>
  )
}

export default EditTaskForm
