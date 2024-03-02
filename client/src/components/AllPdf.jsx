import React, { useEffect, useState } from 'react'
import Pdf from './Pdf';
import axiosInstance from '../axios'
import { useDispatch, useSelector } from 'react-redux';
import {getAllPdf } from "../redux/slices/pdfSlice"
import Loading from './Loading';

/*
 * AllPdf Component:
 * This component displays all the PDF files uploaded by the user.
 * It fetches the PDFs from the server using axiosInstance and Redux for state management.
 * The component renders Pdf components for each PDF file retrieved.
 * If no PDFs are available, it displays a message indicating so.
 * Features:
 * - Fetching PDF files from the server
 * - Displaying PDF files using Pdf component
 * - Handling loading state while fetching PDFs
*/

const AllPdf = () => {
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(false)
  const { id } = useSelector(state => state.user);
  const { pdf } = useSelector(state => state.pdf);
  useEffect(() => {
    async function getPdfs(id) {
      try {
        setLoading(true)
        const response = await axiosInstance.get(`/pdf/pdfs/${id}`);
        console.log("pdfs",response.data.data);
        dispatch(getAllPdf({pdfs:response.data.data}))

      } catch (error) {
        console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
    getPdfs(id);
  }, [id,])


  if(loading){
    return <Loading text="Loading your pdf's"/>
  }

  return (
    <div className='mx-[2px] flex gap-1 flex-wrap w-[100%]  justify-center'>
      {
        pdf?.length === 0 ?

          <h1 className='bg-gray-400 p-2 mt-4 font-bold'>No PDF File yet!</h1>
          :
          <>
       { pdf?.map((item) => (
            <Pdf {...item}/>
            )
            )}
          </>
      }
    </div>
  )
}

export default AllPdf