import { Outlet } from "react-router-dom"
import DashboardHeader from "./DashboardHeader"
import DashboardFooter from "./DashboardFooter"
import { ArrowBigLeftDashIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

const DashboardLayout = () => {
    const navigate = useNavigate()
    const handlePrevPage = () => {
        navigate(-1)
    }
    return (
        <div>
            <DashboardHeader />
            <div className="dash-container mx-10">
                <div onClick={handlePrevPage} className="flex cursor-pointer bg-red-300 px-2 py-1 rounded w-fit">
                    <ArrowBigLeftDashIcon />
                    Go Back
                </div>
                <Outlet />
            </div>
            <DashboardFooter />
        </div>
    )
}

export default DashboardLayout
