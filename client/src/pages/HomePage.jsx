import React from 'react'
import UploadNewPDF from '../components/UploadNewPDF'
import AllPdf from '../components/AllPdf'

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