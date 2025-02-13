import Task from "./Task"
import { useGetTasksQuery } from "./tasksApiSlice"
import useAuth from "../../hooks/useAuth"
import PulseLoader from "react-spinners/PulseLoader"
import useTitle from "../../hooks/useTitle"

const TasksList = () => {
  useTitle("View all Tasks")

  const {username, isAdmin, isManager}=useAuth()
  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTasksQuery("TasksList", {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })
  
  if (isSuccess) {
    // console.log(tasks.entities["key", Object.entries(tasks)])
    let { ids, entities } = tasks

    let filteredIds
    if (isAdmin || isManager) {
      filteredIds = ids
    } else {
      filteredIds = ids.filter(taskId => entities[taskId].username === username)
    }

    return (
      <div className="flex justify-center">
        <div className="shadow w-10/12 flex flex-col items-center p-5 m-5 justify-center">
          <p className="text-center font-bold">User Tasks</p>
          {ids?.length && filteredIds.map(taskId => {
            return <Task key={taskId} taskId={taskId} />
          })}
        </div>
      </div>
    )

  }

  return (
    <>
      {isLoading && <div className="flex justify-center"><PulseLoader /></div>}
      {isError && error?.data?.message}
      {isSuccess && tableContent}
    </>
  )
}

export default TasksList
