import React from 'react'
import { Form } from 'react-bootstrap'

const SelectInput = ({ label, optionsArray, state, setState }) => {
    const handleChange = (e)=>[
        setState(e.target.value)
    ]
    return (
        <Form.Group className="mb-3" controlId="input-select-type">
            <Form.Label>{label}</Form.Label>
            <Form.Select
                value={state}
                onChange={handleChange}
            >
                <option className='select-option' value={0}>Select {label}</option>
                {optionsArray?.map(optionItem => {
                    return <option className='select-option' key={optionItem} value={optionItem}>{optionItem}</option>
                })}
            </Form.Select>
        </Form.Group>
    )
}

export default SelectInput