import React, {forwardRef } from 'react'

const InputComponent = forwardRef (({ labelText, type, id, name, ph, value, autocomplete, onchange, classes }, ref) => {
    return (
        <>
            <label className="form-label" htmlFor={id}>
                {labelText}
            </label>
            <input
                type={type}
                id={id}
                ref={ref}
                name={name}
                placeholder={ph}
                value={value}
                autoComplete={autocomplete}
                onChange={onchange}
                className={`my-2 ${classes} border border-gray-200 py-2 px-4`} />
        </>
    )
})

export default InputComponent
