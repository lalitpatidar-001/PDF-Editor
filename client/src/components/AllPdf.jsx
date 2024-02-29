import React, { useEffect } from 'react'
import Pdf from './Pdf';
import axiosInstance from '../axios'
import { useDispatch, useSelector } from 'react-redux';
import {getAllPdf } from "../redux/slices/pdfSlice"

const AllPdf = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.user);
  const { pdf } = useSelector(state => state.pdf);
  useEffect(() => {
    async function getPdfs(id) {
      try {
        const response = await axiosInstance.get(`/pdf/pdfs/${id}`);
        console.log("pdfs",response.data.data);
        dispatch(getAllPdf({pdfs:response.data.data}))

      } catch (error) {
        console.log(error)
      }
    }
    getPdfs(id);
  }, [id,])
  return (
    <div className='mx-[2px] flex gap-1 flex-wrap w-[100%]  justify-center '>
      {
        pdf?.length === 0 ?
          <>
        
          </>
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