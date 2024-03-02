import React from 'react'

/*
 * Button Component:
 * This component represents a button element with customizable properties such as type, width, and title.
 * It renders a button with a specified title and styling, and optionally allows it to span the full width of its container.
 * Features:
 * - Customizable button type (e.g., "button", "submit")
 * - Optional full-width button rendering
 * - Customizable button title
 */

const Button= ({type,fullWidth,title}) => {
  return (
    <div>
      <button type={type} className={`${fullWidth ? "w-full" : "w-fit" } bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 `}>{title}</button>
    </div>
  )
}

export default Button
