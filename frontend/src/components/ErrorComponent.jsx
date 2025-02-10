import { useState, useEffect } from 'react'

const ErrorComponent = ({ errorClass, errorContent }) => {
    const [visible, setVisible] = useState(!!errorContent)

    useEffect(() => {
        if (!errorContent) return
        setVisible(true)

        const hideError = () => setVisible(false)

        const timer = setTimeout(() => {
            hideError()
        }, 3000)
        document.addEventListener("click", hideError)

        return () => {
            clearTimeout(timer)
            document.removeEventListener("click", hideError)
        }

    }, [errorContent])

    if (!visible) return null

    return (
        <>
            <p className={`${errorClass ? "errormsg absolute bg-red-500 px-10 py-5" : "hidden errormsg"}`}>{errorContent}</p>
        </>
    )
}

export default ErrorComponent
