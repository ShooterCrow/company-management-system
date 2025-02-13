import { useLoginMutation } from "./authApiSlice"
import { setCredentials } from "./authSlice"
import { useDispatch } from "react-redux"
import { useRef, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import usePersist from "../../hooks/usePersist"

import ErrorComponent from "../../components/ErrorComponent"
import InputComponent from "../../components/InputComponent"
import PulseLoader from "react-spinners/PulseLoader"

const Login = () => {
  const userRef = useRef()
  const errorRef = useRef()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    // userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrorMsg("")
  }, [username, password])

  const errorClass = errorMsg ? true : false

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <PulseLoader />
    </div>
  )

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)
  const handlePersistToggle = () => setPersist(prev => !prev)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername("")
      setPassword("")
      navigate("/dash")
    } catch (error) {
      if (!error?.status) {
        setErrorMsg("No Response from the Server")
      } else if (error?.status === 400) {
        setErrorMsg("Username and Password is Required")
      } else if (error?.status == 401) {
        setErrorMsg("Unauthorized")
      } else {
        setErrorMsg(error?.data?.message)
      }
      errorRef?.current?.focus()
    }
  }

  return (
    <div className="m-10">
      {/* <p ref={errorRef} aria-live="assertive">{errorMsg}</p> */}
      {/* <div ref={errorRef}> */}
      <ErrorComponent el={errorRef} errorClass={errorClass} errorContent={errorMsg} />

      {/* </div> */}
      <header>
        <h2>Login</h2>
      </header>
      <main>
        <div className="flex">
        <form className="w-full flex justify-center" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center w-1/2">
            <InputComponent
              labelText="Username:"
              type="text"
              id="username"
              name="username"
              ph="Enter your username"
              value={username}
              ref={userRef}
              autocomplete="off"
              onchange={handleUserInput}
              required
              classes="form-input" />

            <InputComponent
              labelText="Password:"
              type="password"
              id="password"
              name="password"
              ph="Enter your password"
              value={password}
              onchange={handlePasswordInput}
              required
              classes="form-input" />

            <button className="bg-blue-600 text-white cursor-pointer rounded my-2 py-2">Sign In</button>

            <div className="flex gap-2 items-center">
              <label htmlFor="persist" className="form-label">
                Trust this device: 
              </label>
              <input
                type="checkbox"
                className="size-4"
                name="persist"
                checked={persist}
                onChange={handlePersistToggle}
                id="persist" />
            </div>

          </div>
        </form>
        </div>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </div>
  )
}

export default Login
