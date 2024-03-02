import React from 'react'
import { useParams } from 'react-router-dom'
import EditPdf from '../components/EditPdf';
import { pdfjs } from 'react-pdf';

/*
    EditPdfPage Component:
       * This component renders the page for editing a PDF document.
       * It fetches the ID parameter from the URL using the useParams hook.
       * Sets the worker source for PDF.js to enable PDF rendering.
       * Renders the EditPdf component passing the ID of the PDF document to be edited.
*/

const EditPdfPage = () => {
    const {id} = useParams();

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
      ).toString();

  return (
    <div
    className='mt-[55px] bg-[#dddddd] p-2'
    >
    {/* displat all pages of pdf and provide option to edit */}
        <EditPdf id={id}/>
    </div>
  )
}

export default EditPdfPage