import React from 'react'

function FormRowSelect(props) {
    const { labelText, name, value, handleChange, list } = props
    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {labelText || name}
            </label>
            <select
                name={name}
                value={value}
                id={name}
                onChange={handleChange}
                className='form-select'
            >
                {list.map((itemValue, index) => {
                    return (
                        <option key={index} value={itemValue}>
                            {itemValue}
                        </option>
                    );
                })}
            </select>
        </div>
    )
}

export default FormRowSelect