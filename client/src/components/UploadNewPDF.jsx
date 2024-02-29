import React, { useState } from 'react'
import PDFIcon from "../assets/pdf-logo.png"
import toast from 'react-hot-toast';
import axiosInstance from '../axios';
import { X } from "phosphor-react"
import { useDispatch, useSelector } from 'react-redux';
import { updatePdf } from '../redux/slices/pdfSlice';

/*
    UploadNewPdf Component:
    This component allows users to upload PDF files. 
    It validates the file type and sends it to the server for storage.
    Upon successful upload, it displays the uploaded PDF preview, provides a button to remove the file, 
    and triggers a Redux action to update the state.
*/

const UploadNewPDF = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const dispatch = useDispatch();
    const { id } = useSelector(state => state.user)

    // handel file change and validate file type
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(file);
        } else {
            toast.error("Upload only pdf file")
            setPdfFile(null);
        }
    }

    // upload  pdf to backend 
    const handleClickUploadPDF = async () => {
        if (pdfFile) {
            try {
                const formData = new FormData();
                formData.append("pdfFile", pdfFile)
                const response = await axiosInstance.post(`/pdf/upload/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "mulitpart/form-data"
                        }
                    });
                console.log(response)
                if (response.status === 201) {
                    toast.success("PDF file uploaded successfully");
                    // adding pdf to redux store
                    dispatch(updatePdf({ pdf: response.data.data }));
                    setPdfFile(null)
                }
            } catch (error) {
                const status = error.response.status;
                const data = error.response.data;
                console.log(error)
                if (status === 404 && data.message === "pdf file not found") {
                    toast.error("PDf Not found, please upload a valid pdf file")
                }
                else {
                    toast.error("Something went wrong on server")
                }
            }
        }
    }

    return (
        <div className=' flex flex-col items-center justify-center h-fit  mt-[2px] mx-[2px] gap-2 py-2  bg-white'>
            <span className='text-red-500'>only upload file in pdf format!</span>

            <div className='relative bg-gray-400 rounded'>

                {/*cross button - clear uploaded pdf state */}
                {pdfFile && <div
                    onClick={() => setPdfFile(null)}
                    className='absolute -right-[25px] -top-[10px] text-2xl cursor-pointer '><X /></div>}

                <label className='cursor-pointer' htmlFor='pdf-input'>
                {pdfFile ?
                        {/* display pdf preview if exist */}
                        (<embed
                            className='h-[150px] w-[150px] '
                            src={URL.createObjectURL(pdfFile)}
                            type='application/pdf'
                        />) 
                        :
                        <div className='relative'>
                        {/* display pdf image if no file choosed */}
                        <img className='h-[150px] w-[150px] ' src={PDFIcon} />
                        <span className='absolute text-xl text-red-600  font-bold left-[25px] -bottom-2'>Click here</span>
                        </div>
                    }
                </label>
                {/* pdf file input */}
                <input
                    id='pdf-input'
                    type='file'
                    accept='application/pdf'
                    className='h-[0.1px] w-[0.1px]'
                    onChange={handleFileChange}
                />
            </div>
            <button
              onClick={handleClickUploadPDF}
                className={`
                ${!pdfFile && "bg-blue-300 cursor-no-drop"}
                bg-blue-600 p-2 rounded text-white
                text-xl font-bold  `}>Upload PDF</button>
        </div>
    )
}

export default UploadNewPDF