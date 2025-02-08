import React from 'react'

const ErrorComponent = ({ errorClass, errorContent }) => {
    if (errorClass) {
        let errorEl = document.querySelector(".errormsg")
        errorEl.classList.remove("hidden")
        if (!errorEl.classList.contains("hidden")) {
            document.onclick = () => {
                errorEl.classList.add("hidden")
            }
            setTimeout(() => {
                errorEl.classList.add("hidden")                
            }, 5000)
        }
    }
    return (
        <>
            <p className={`${errorClass ? "errormsg absolute bg-red-500 px-10 py-5" : "hidden errormsg"}`}>{errorContent}</p>
        </>
    )
}

export default ErrorComponent
