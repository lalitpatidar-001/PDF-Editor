import React from 'react'
import CircularProgress from '@mui/joy/CircularProgress';

/*
  Loading component :
    * Responsible to update user for activity by renering a circular loader
    * take a text props to display a dynamic loading indicator 
    * if text props is null display default text
*/
const Loading = ({text,fit}) => {
  return (
    <div className={`flex  justify-center items-center ${fit?"h-fit flex-row":"h-screen flex-col"}   w-full`}>
        <CircularProgress color="primary" />
        <span>{text?text:"Loading..."}</span>
    </div>
  )
}

export default Loading