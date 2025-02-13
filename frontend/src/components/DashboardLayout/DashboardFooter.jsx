import { useNavigate, useLocation } from "react-router-dom"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useAuth from "../../hooks/useAuth"

const DashboardFooter = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const {username, status} = useAuth()

    const onHomeBtnClicked = () => {
        navigate("/dash")
    }

    return <>
        <footer className="bg-gray-200 fixed w-full bottom-0 py-3">
            <div className="flex justify-between mx-5">
                
            {
                pathname !== "/dash" ?
                    <button title="Home" onClick={onHomeBtnClicked}><FontAwesomeIcon icon={faHouse} /></button>
                    : null
            }
            <p>Current User: {username}</p>
            <p>Role: {status}</p>
            </div>
        </footer>
    </> 

}
export default DashboardFooter