import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== "development") {
            const verifyRefreshToken = async () => {
                console.log("Verifying refresh token")
                try {
                    await refresh()
                    setTrueSuccess(true)
                } catch (err) {
                    console.log(err)
                }
            }
            if (!token && persist) verifyRefreshToken()
        }
        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])

    let content
    if (!persist) {
        console.log("No persist")
        content = <Outlet />
    } else if (isLoading) {
        console.log("Loading...")
        content = <p>Loading...</p>
    } else if (isError) {
        console.log("Error")
        content = (
            <div className="flex justify-center items-center h-full flex-col">
                <p>{error?.data?.message} </p>

                <Link to="/login">
                <p>Try<span className="font-bold text-blue-500 3xl"> Logging in </span>Again</p>
                </Link>


            </div>
        )
    } else if (isSuccess && trueSuccess) {
        console.log("token and uninitialized")
        console.log(isUninitialized)
        content = <Outlet />
    } else if (persist) {
        content = <Outlet />
    }
    return content
}

export default PersistLogin
