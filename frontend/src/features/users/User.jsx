import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { Pencil } from 'lucide-react'

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <div className={`divide-y divide-gray-200 ${cellStatus}`}>
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-900">{user.username}</span>
                  <span className="text-sm text-gray-500">{userRolesString}</span>
                </div>
                <button 
                  onClick={handleEdit}
                  className="inline-flex items-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                  aria-label={`Edit ${user.username}'s role`} >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
          </div>

        )

    } else return null
}
export default User
