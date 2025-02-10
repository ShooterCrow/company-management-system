import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { ROLES } from "../../config/roles"
import { Trash, Save } from "lucide-react"
import UtilityForm from "../../components/UtilityForm"

const USER_REGEX = /^[A-z0-9]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
    const [updateUser, {
        isLoading: isUpdateLoading,
        isSuccess: isUpdateSuccess,
        isError: isUpdateError,
        error: updateError
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState("")
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isUpdateSuccess || isDelSuccess) {
            setUsername("")
            setPassword("")
            setRoles([])
            navigate("/dash/users")
        }
    }, [isUpdateSuccess, isDelSuccess, navigate])

    const handleUsernameChange = (e) => setUsername(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const handleRolesChange = (e) => {
        const values = Array.from(e.target.selectedOptions, option => option.value)
        setRoles(values)
    }
    const handleActiveChange = () => setActive(previous => !previous)

    const handleUserSave = async (e) => {
        e.preventDefault()
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, username, roles, active })
        }
    }

    const handleUserDelete = async (e) => {
        e.preventDefault()
        const result = await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                className="my-2 border border-gray-200 py-2 px-4"
                key={role}
                value={role}>
                {role}
            </option>
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isUpdateLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isUpdateLoading
    }

    return (
        <>
            <UtilityForm
                title={"Edit User"}
                username={username}
                handleUsernameChange={handleUsernameChange}
                password={password}
                handlePasswordChange={handlePasswordChange}
                handleRolesChange={handleRolesChange}
                options={options}
                active={active}
                handleActiveChange={handleActiveChange}
                canSave={canSave}
                handleUserSave={handleUserSave}
                handleUserDelete={handleUserDelete}
                updateError={updateError}
                delError={delError}
                isDelError={isDelError}
                isUpdateError={isUpdateError}
                validUsername={validUsername}
                validPassword={validPassword}
                roles={roles}
            />
        </>
    )
}

export default EditUserForm
