import { useState } from 'react'

const EditTaskForm = ({task, users}) => {
  const [user, setUser] = useState(task.user)
  const [title, seTitle] = useState(task.title)
  const [text, setText] = useState(task.text)
  // const {title, text, user} = task
  console.log(title, text, user, users)
  return (
    <div>
      
    </div>
  )
}

export default EditTaskForm
