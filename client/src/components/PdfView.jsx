import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import ConfirmDialog from './ConfirmDialog';
import Loading from './Loading';
import { STATIC_PATH } from '../axios';

/* 
    PdfView Component:
    This component is responsible for rendering a PDF document by fetching from backend.
    It displays each page of the PDF along with the total number of pages.
    Additionally, it provides a loading indicator while the document is being loaded.
*/

function PdfView({ pdf }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading ,setLoading] = useState(false);
    const [pdfPath , setPdfPath ] = useState(null); 
    const [pageWidth, setPageWidth] = useState(window.innerWidth); // State to hold page width

    //  static path of pdf
    useEffect(()=>{
        const path = STATIC_PATH + pdf.path;
        setPdfPath(path);
    },[pdf])


    function onDocumentLoadSuccess({ numPages }) {
        // on successfull loading of pdf
        setLoading(false);
        setNumPages(numPages);
    }
    function onDocumentLoadStart (){
        setLoading(true);
    }

    useEffect(() => {
        // setting width dynamically
        function handleResize() {
            setPageWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
        {
            loading ? <Loading text="Loading Pdf..."/>
            :
            <div className='mt-1 h-[calc(100vh-60px)] w-full'>
            <Document file={pdfPath} 
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadStart={onDocumentLoadStart} >

                {/* number of pages */}
                <span className='text-sm font-bold text-gray-600'>
                    Pages {numPages}
                </span>

                {/* all pages of pdf */}
                <div className='mx-auto overflow-y-auto h-[calc(100vh-60px)] w-full'>
                    {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
                        <div className='relative' key={`page_${page}`}>
                        {/* rendering each page  */}
                            <Page
                                pageNumber={page}
                                renderAnnotationLayer={false}
                                renderTextLayer={false}
                                width={pageWidth} 
                            />
                            <div className='absolute top-0 right-0'>{page}/{numPages}</div>
                        </div>
                    ))}
                </div>
            </Document>
        </div>}
        </>

    );
}

export default PdfView;
