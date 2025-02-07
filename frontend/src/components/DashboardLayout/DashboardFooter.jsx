import { useNavigate, useLocation } from "react-router-dom"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const DashboardFooter = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onHomeBtnClicked = () => {
        navigate("/dash")
    }

    return <>
        <footer>
            {
                pathname !== "/dash" ?
                    <button title="Home" onClick={onHomeBtnClicked}><FontAwesomeIcon icon={faHouse} /></button>
                    : null
            }
        </footer>
    </>

}
export default DashboardFooter