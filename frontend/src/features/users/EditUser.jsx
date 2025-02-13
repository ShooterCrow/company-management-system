import { useParams } from "react-router-dom"
import { useGetUsersQuery } from './usersApiSlice'
import PulseLoader from "react-spinners/PulseLoader"
import EditUserForm from "./EditUserForm"

const EditUser = () => {
  const { id } = useParams()

  const {user} = useGetUsersQuery("usersList", {
    selectFromResult: ({data}) => ({
      user: data?.entities[id]
    })
  })

  return (
    <>
      {
        user ? <EditUserForm user={user} /> : <PulseLoader />
      }
    </>
  )
}

export default EditUser
