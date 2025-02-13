import { useGetUsersQuery } from '../users/usersApiSlice'

const NewTask = ({ userId }) => {
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    })

    if (user) {

        return (
            <option value={userId}>
                {user.username}
            </option>
        )
    } else return null
}

export default NewTask
