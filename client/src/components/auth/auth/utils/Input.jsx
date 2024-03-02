import React from 'react'

/*
 * Input Component:
 * This component represents an input field with customizable properties such as id, name, type, label, placeholder, value, and onChange function.
 * It renders an input field with a specified label, type, placeholder, and styling.
 * Features:
 * - Customizable input field properties (id, name, type, label, placeholder, value, onChange, required)
 * - Styling with borders and rounded corners
 */

const Input = ({id,name,type,label,placeholder,value,onChange,required}) => {
  return (
    <div>
      <div className='mb-4'>
        <label className="block text-gray-700 font-bold mb-2" htmlFor="Full-Name">  {label} :</label>
        <input className="border border-gray-300 rounded-lg px-3 py-2 w-full" type={type} onChange={(e)=>onChange(e)} name={name} id={id} placeholder={placeholder} required={required} />
       
      </div>
    </div>
  )
}

export default Input
