import React from 'react'
import CircularProgress from '@mui/joy/CircularProgress';

const Loading = ({text}) => {
  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'>
        <CircularProgress color="primary" />
        <span>{text?text:"Loading..."}</span>
    </div>
  )
}

export default Loading