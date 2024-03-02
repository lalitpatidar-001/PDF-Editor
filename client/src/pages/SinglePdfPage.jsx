import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../axios';
import { pdfjs } from 'react-pdf';
import PdfView from '../components/PdfView';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';

/*
    SinglePdfPage Component:
        * This component renders a single PDF document retrieved from the server based on the provided ID.
        * It displays the PDF viewer component (PdfView) to view the PDF content.
        * If the PDF is not found or there is an error while fetching it, it displays an error message and redirects 
          the user to the home page.
        * It also provides an option to edit the PDF by navigating to the edit page for the PDF.
*/

const SinglePdfPage = () => {
    const { id } = useParams()
    const [pdf, setPdf] = useState({});
    const [loading ,setLoading ] = useState(false);
    const navigate = useNavigate();

    // react-pdf configuration
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
    ).toString();

    // fetch pdf by id
    useEffect(() => {
        async function getPdf(id) {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/pdf/${id}`);
                console.log(response);
                if(response.status === 200){
                    setPdf(response.data.data);
                }
            } catch (error) {
                console.log(error)
                if(error.response.status === 404){
                    toast.error("pdf not found!")
                    navigate("/")
                }else{
                    toast.error("something went wrong!");
                    navigate("/")
                }
            }finally{
                setLoading(false);
            }
        }
        getPdf(id);
    }, [id]);


    if(loading) return <Loading text="Loading Pdf..."/>

    return (
        <>
        {
        <div className='mt-[51px] flex flex-col items-center overflow-hidden bg-[#dddddd] relative'>
            <div className='fixed top-[48px] z-40 flex gap-2  p-1 w-full  justify-end'>
            {/* redired to edit pdf page */}
                <Link to={`/edit-pdf/${id}`}>
                    <div className='text-white bg-blue-600 rounded px-2 py-1 font-bold cursor-pointer ' >Edit Pdf</div>
                </Link>
            </div>
            {/* display pdf pages  */}
            <PdfView pdf={pdf} />
        </div>
        }
        </>
    )
}

export default SinglePdfPage