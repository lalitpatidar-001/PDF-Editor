import React from 'react'
import CircularProgress from '@mui/joy/CircularProgress';

/*
  Loading component :
    * Responsible to update user for activity by renering a circular loader
    * take a text props to display a dynamic loading indicator 
    * if text props is null display default text
*/
const Loading = ({text}) => {
  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'>
        <CircularProgress color="primary" />
        <span>{text?text:"Loading..."}</span>
    </div>
  )
}

export default Loading