import React from 'react'

const Button= ({type,fullWidth,title}) => {
  return (
    <div>
      <button type={type} className={`${fullWidth ? "w-full" : "w-fit" } bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 `}>{title}</button>
    </div>
  )
}

export default Button
