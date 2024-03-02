import React from 'react'
import { Link } from 'react-router-dom'

/*
 * AuthActions Component:
 * This component provides additional actions related to authentication, such as navigating to other authentication-related pages.
 * It displays a horizontal line with "Or" text in between, followed by a link to another authentication-related page.
 * Features:
 * - Displaying a horizontal line with "Or" text in between
 * - Providing a link to another authentication-related page
 */

const AuthActions = ({text,path, pageName}) => {
  return (
    <div className='w-full'>
      <div className='w-full flex gap-2 items-center'>
        <span className='w-full h-[1px] border-[1px] border-gray-200 '></span>
        <span className='text-gray-600'>Or</span>
        <span className='w-full h-[1px] border-[1px] border-gray-200 '></span>
      </div>
      <div className='flex items-center gap-1'>
        <span className='font-semibold '>{text}</span>
        <Link className='text-blue-500 font-semibold cursor-pointer' to={path}>{pageName}</Link>
      </div>
    </div>
  )
}

export default AuthActions
