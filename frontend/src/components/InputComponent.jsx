import React from 'react'

const InputComponent = ({ labelText, type, id, name, ph, value, autocomplete, onchange, classes }) => {
    return (
        <>
            <label className="form-label" htmlFor={id}>
                {labelText}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                placeholder={ph}
                value={value}
                autoComplete={autocomplete}
                onChange={onchange}
                className={`my-2 ${classes} border border-gray-200 py-2 px-4`} />
        </>
    )
}

export default InputComponent
