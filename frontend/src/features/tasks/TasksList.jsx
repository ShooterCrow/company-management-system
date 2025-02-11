import Task from "./Task"
import { useGetTasksQuery } from "./tasksApiSlice"

const TasksList = () => {
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
  let tableContent 

  
  if (isSuccess) {
    // console.log(tasks.entities["key", Object.entries(tasks)])
    let { ids } = tasks

    return (
      <div className="flex justify-center">
        <div className="shadow w-10/12 flex flex-col items-center p-5 m-5 justify-center">
          <p className="text-center font-bold">User Tasks</p>
          {tableContent = ids?.length ? ids.map(taskId => {
            return <Task key={taskId} taskId={taskId} />
          }) : null}
        </div>
      </div>
    )

  }

  return (
    <>
      {isLoading && "Loading..."}
      {isError && error?.data?.message}
      {isSuccess && tableContent}
    </>
  )
}

export default TasksList
