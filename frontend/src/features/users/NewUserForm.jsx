import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"
import { Save } from "lucide-react"
import UtilityForm from "../../components/UtilityForm"
import useTitle from "../../hooks/useTitle"

const USER_REGEX = /^[A-z0-9]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
  useTitle("Create New User")

  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState("")
  const [validPassword, setValidPassowrd] = useState(false)
  const [roles, setRoles] = useState(["Employee"])

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassowrd(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess) {
      setUsername("")
      setPassword("")
      setRoles([])
      navigate("/dash/users")
    }
  }, [isSuccess, navigate])

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  const handleRolesChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value)
    setRoles(values)
  }

  //Same as making an if statement to check if the values are boolean and is not loading
  const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
  const handleUserSave = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ username, password, roles })
    }
  }

  const options = Object.values(ROLES).map((role) => {
    return (
      <option
        className="my-2 border border-gray-200 py-2 px-4"
        key={role}
        value={role}>
        {role}
      </option>
    )
  })

  // const errorClass = isError ? "errormsg" : "offscreen"
  // const validUserClass = !validUsername ? "form-input-incomplete" : ""
  // const validPwdClass = !validPassword ? "form-input-incomplete" : ""
  // const validRolesClass = !Boolean(roles.length) ? "form-input-incomplete" : ""

  return (
    <>
      <UtilityForm
        title={"Create New User"}
        username={username}
        handleUsernameChange={handleUsernameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
        handleRolesChange={handleRolesChange}
        options={options}
        canSave={canSave}
        handleUserSave={handleUserSave}
        updateError={error}
        isUpdateError={isError}
        validUsername={validUsername}
        validPassword={validPassword}
        roles={roles}
      />
    </>
  )
}

export default NewUserForm
