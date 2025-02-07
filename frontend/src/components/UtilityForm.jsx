import { Save, Trash } from "lucide-react"

const UtilityForm = ({ title,
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
    handleRolesChange,
    options,
    active,
    handleActiveChange,
    canSave,
    handleUserSave,
    handleUserDelete,
    delError,
    updateError,
    isUpdateError,
    isDelError,
    validUsername,
    validPassword,
    roles = roles ?? null
}) => {

    let errorEl
    const errorClass = (isUpdateError || isDelError) ? "bg-red-500 px-10 py-5" : "offscreen"
    const validUserClass = !validUsername ? "form-input-incomplete" : ""
    const validPwdClass = password && !validPassword ? "form-input-incomplete" : ""
    const validRolesClass = !Boolean(roles.length) ? "form-input-incomplete" : ""
    let errorContent
    if (delError?.data?.message || updateError?.data?.message) {
        errorContent = (delError?.data?.message || updateError?.data?.message) ?? "d"
    }
    if (errorClass && (delError?.data?.message || updateError?.data?.message)) {
        errorEl = document.querySelector(".errormsg")
        setTimeout(() => {
            errorEl.classList.add("hidden")
        }, 5000)
        document.onclick = () => {
            if (errorEl.classList.contains("bg-red-500")) {
                errorEl.classList.add("hidden")
            }
        }
    }

    return (
        <div className="flex justify-center items-center h-100">
            <p className={`${errorClass} errormsg absolute`}>{errorContent}</p>
            <form className="w-1/2 flex flex-col justify-center">
                <div className="flex justify-between">
                    <h2>{title}</h2>
                </div>
                <div className="flex flex-col">
                    <label className="form-label" htmlFor="username">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter a Username (3-20 Characters)"
                        value={username}
                        autoComplete="off"
                        onChange={handleUsernameChange}
                        className={`my-2 ${validUserClass} border border-gray-200 py-2 px-4`} />
                    <label className="form-label" htmlFor="password">
                        Password: <span className="nowrap">4-12 and Special Characters</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter a new password"
                        value={password}
                        autoComplete="off"
                        onChange={handlePasswordChange}
                        className={`my-2 ${validPwdClass} border border-gray-200 py-2 px-4`} />

                </div>

                <label className="form-label" htmlFor="roles">
                    Roles:
                </label>
                <select
                    name="roles"
                    multiple
                    size={3}
                    value={roles}
                    className={`overflow-hidden ${validRolesClass} h-40 outline-none form-select`}
                    onChange={handleRolesChange}
                    id="roles">
                    {options}
                </select>
                {handleActiveChange ? <div className="flex gap-2">
                    <label className="form-label" htmlFor="active">
                        Active:
                    </label>
                    <input
                        type="checkbox"
                        id="active"
                        name="active"
                        value={active}
                        checked={active}
                        onChange={handleActiveChange}
                        className={`form-input`}
                    />
                </div> : null}
                <div className="flex mt-5 justify-between">
                    <button
                        disabled={!canSave}
                        title="Save"
                        className="icon-button gap-2 bg-green-500"
                        onClick={handleUserSave} >
                        Save Changes <Save />
                    </button>
                    {handleUserDelete ? <button
                        title="Delete"
                        className="icon-button gap-2 bg-red-500"
                        onClick={handleUserDelete} >
                        Delete User<Trash />
                    </button> : null}
                </div>
            </form>
        </div>
    )
}

export default UtilityForm
