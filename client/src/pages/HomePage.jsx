import React from 'react'
import UploadNewPDF from '../components/UploadNewPDF'
import AllPdf from '../components/AllPdf'

/*
  HomePage component:
    * First component user see if loggedin
    * Render a option to upload new pdf 
    * Render all user's pdf from server
*/
const HomePage = () => {
  return (
    <>
      <div className='flex mt-[54px]  justify-center  min-h-screen bg-[#dddddd]'>

        <div className=' flex flex-col gap-1 max-w-[1024px] w-full'>
          <UploadNewPDF />
          <AllPdf/>
        </div>
      </div>
    </>
  )
}

export default HomePage