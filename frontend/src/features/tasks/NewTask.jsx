import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersApiSlice";
import { selectAllUsers } from "../users/usersApiSlice";

const NewTask = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))
    if (user) {
        
        return (
            <option value={userId}>
                {user.username}
            </option>
        )
    } else return null
}

export default NewTask
