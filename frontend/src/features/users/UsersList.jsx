import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import PulseLoader from "react-spinners/PulseLoader"
import useTitle from "../../hooks/useTitle"

const UsersList = () => {
  useTitle("View all User")

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery("UsersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content
  let tableContent

  if (isLoading) content = <PulseLoader />

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {

    const { ids } = users

    content = ids?.length
      ? ids.map(userId => <User key={userId} userId={userId} />)
      : null
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-900">User Roles</h2>
        </div>
        {content}
      </div>
    </div>
  );
}
export default UsersList

