import { useSelector } from "react-redux";
import { selectTaskById } from "./tasksApiSlice"
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";


const Task = ({ taskId }) => {
    const task = useSelector(state => selectTaskById(state, taskId))
    const navigate = useNavigate()

    if (task) {
        const createdAt = new Date(task.createdAt).toLocaleString()
        const updatedAt = new Date(task.updatedAt).toLocaleString()
        const handleEdit = () => navigate(`/dash/tasks/${taskId}`)
        return (
            <>
                {!task ? <p>No tasked assigned</p> : null}
                <div className="divide-y w-full flex justify-center divide-gray-200">
                    <div className="flex gap-5 border-b py-2 w-full justify-between items-center px-5 py-4">
                        <div className="font-bold text-left">
                            {task.user}
                        </div>
                        <div className="font-medium w-1/10">
                            {task.title}
                        </div>
                        <div className="w-1/2 break-text">
                            <div>{task.text}</div>
                            <div className="flex mt-3 text-xs text-gray-500 justify-between">
                                <p>Created At: {createdAt}</p>
                                <p>Updated At: {updatedAt}</p>
                            </div>
                        </div>
                        <div className={task.completed ? "text-green-500" : "text-red-500"}>
                            <p>{task.completed ? "Completed" : "Not Completed"}</p>
                        </div>
                        <div onClick={handleEdit} className="cursor-pointer">
                            <Pencil />
                        </div>
                    </div>

                </div>
            </>
        )
    } else return null
}

export default Task