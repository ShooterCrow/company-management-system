import { Outlet } from "react-router-dom"
import DashboardHeader from "./DashboardHeader"
import DashboardFooter from "./DashboardFooter"
import { ArrowBigLeftDashIcon, EditIcon, EyeIcon, LucideUserPlus, PenIcon, SettingsIcon, UserCogIcon, UserPlus, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import useAuth from "../../hooks/useAuth";

const DashboardLayout = () => {
    const [hidden, setHidden] = useState("hidden")
    const editRef = useRef()
    const { isManager, isAdmin } = useAuth()
    const navigate = useNavigate()

    const handleNewTaskBtn = () => navigate("/dash/tasks/create")
    const handleNewUserBtn = () => navigate("/dash/users/create")
    const handleTasksViewBtn = () => navigate("/dash/tasks")
    const handleUsersViewBtn = () => navigate("/dash/users")
    const showEditBtns = () => {
        hidden === "hidden" && setHidden("block")
        hidden === "block" && setHidden("hidden")
    }
    // useEffect(() => {
    //     const handleShow = () => setHidden("hidden")
    //     if (hidden === "block") {
    //         // console.log(11)
    //         document.addEventListener("click", handleShow)
    //     }
    //     return () =>{
    //         document.removeEventListener("click", handleShow)
    //     }
    // }, [hidden])

    return (
        <div>
            <DashboardHeader />
            <div className="dash-container mx-10">
                <Outlet />
                <div>
                    <div onClick={showEditBtns} className="flex absolute bottom-20 right-10">
                        {hidden &&
                            <div className={`${hidden ? "bg-blue-300" : "bg-red-300"} p-3 rounded-full`}>
                                <EditIcon />
                            </div>}
                        {!hidden && <div className="bg-red-300 p-3 rounded-full"> <X /> </div>}
                    </div>

                    <div className={`absolute flex gap-2 flex-col bottom-35 right-10 ${hidden}`} ref={editRef}>
                        <div onClick={handleUsersViewBtn} className="flex bottom-35 right-10">
                            <div className="bg-green-300  p-3 rounded-full">
                                <UserCogIcon />
                            </div>
                        </div>
                        {(isAdmin || isManager) ?
                            <div onClick={handleNewUserBtn} className="flex bottom-50 right-10">
                                <div className="bg-green-300  p-3 rounded-full">
                                    <UserPlus />
                                </div>
                            </div> : null
                        }
                        <div onClick={handleTasksViewBtn} className="flex bottom-65 right-10">
                            <div className="bg-green-300  p-3 rounded-full">
                                <EyeIcon />
                            </div>
                        </div>
                        <div onClick={handleNewTaskBtn} className="flex bottom-80 right-10">
                            <div className="bg-green-300  p-3 rounded-full">
                                <EditIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DashboardFooter />
        </div>
    )
}

export default DashboardLayout
