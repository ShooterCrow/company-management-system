import { useLoginMutation } from "./authApiSlice"
import { setCredentials } from "./authSlice"
import { useDispatch } from "react-redux"
import { useRef, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import ErrorComponent from "../../components/ErrorComponent"

const Login = () => {
  const userRef = useRef()
  const errorRef = useRef()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrorMsg("")
  }, [username, password])

  const errorClass = errorMsg ? true : false

  if (isLoading) return <p>Loading...</p>

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)

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
    <div>
      {/* <p ref={errorRef} aria-live="assertive">{errorMsg}</p> */}
      {/* <div ref={errorRef}> */}
      <ErrorComponent el={errorRef} errorClass={errorClass} errorContent={errorMsg} />

      {/* </div> */}
      <header>
        <h2>Login</h2>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
            className="form-input" />
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordInput}
            required
            className="form-input" />
          <button>Sign In</button>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </div>
  )
}

export default Login
