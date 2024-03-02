import React, { useEffect, useState } from 'react';
import axiosInstance, { STATIC_PATH } from '../axios';
import { Document, Page } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
import { useDispatch, useSelector } from 'react-redux';
import { addGeneratedPdf, updatePdf } from '../redux/slices/pdfSlice';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';
import EditNavbar from './EditNavbar';
import Loading from './Loading';

/*
    EditPdf Component:
    This component allows users to edit and manipulate PDF files. 
    It provides functionalities like selecting pages, rearranging them, and generating a new PDF based on the user's selection.
    Users can also save the generated PDF back to the server.
    The component utilizes react-pdf and pdf-lib libraries for PDF manipulation.
    It integrates with Redux for state management and axios for HTTP requests.
    Features:
    - Selecting pages from the original PDF.
    - Rearranging the order of selected pages.
    - Generating a new PDF based on the selected pages.
    - Previewing and navigating through the generated PDF.
    - Saving the generated PDF back to the server.
*/

const EditPdf = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id: userId } = useSelector(state => state.user)

    const [openDialog, setOpenDialog] = useState(false)
    const [isInSequence, setIsInSequence] = useState("select");

    const [pdf, setPdf] = useState(null);
    const [name, setName] = useState(null)

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedPages, setSelectedPages] = useState([]);

    const [generatedPdfUrl, setGeneratedPdfUrl] = useState(null);
    const [generatedPdf, setGeneratedPdf] = useState(null);

    const [isGenerating, setIsGenerating] = useState(false);
    const [loading, setLoading] = useState(false);

    const [pageWidth, setPageWidth] = useState(window.innerWidth); // State to hold page width


    // sort selected pages if user choose "arrange by order"
    const sortPages = (selectedPages) => {
        const sortedPages = selectedPages.sort((a, b) => a - b);
        setSelectedPages(sortedPages);
    }

    // hadle radio button toggle for pdf order re-arrange
    const handleSequenceChange = (e) => {
        setIsInSequence(e.target.value);
    }

    // Update page width when window is resized
    useEffect(() => {
        function handleResize() {
            setPageWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // fetch pdf from server
    useEffect(() => {
        async function getPdf(id) {
            try {
                const response = await axiosInstance.get(`/pdf/${id}`);
                const path = STATIC_PATH + response.data.data.path;
                setPdf(path);
                setName(response.data.data.name);
            } catch (error) {
                toast.error("something went wrong ")
            }
        }
        getPdf(id);
    }, [id]);

    // saving generated pdf to server
    const handlePDFSaveClick = async () => {
        try {
            setLoading(true)
            if (!generatedPdf) {

                return toast.success("Error , please generate pdf before saving")
            }
            const pdfBlob = new Blob([generatedPdf], { type: 'application/pdf' })
            const response = await axiosInstance.post(`/pdf/upload/${userId}`, { pdfFile: pdfBlob, name }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response.status === 201) {
                toast.success("Extracted Pdf saved successfully");
                dispatch(updatePdf({ pdf: response.data.data }))
                navigate("/")
            }
        } catch (error) {
            if (error.response.status === 404) {
                toast.error("Pdf file not found, can not save");
            }
            else {
                toast.error("something went wrong");
            }
        }
        finally{
            setLoading(false)
        }
    }



    // handle checkbox  click for selected pages 
    const handleCheckBoxClick = (index) => {
        if (selectedPages.includes(index)) {
            setSelectedPages(prev => prev.filter(page => page !== index)); // removing if already checked
        } 
        else {
            setSelectedPages(prev => [...prev, index]); // updating state with new selected index
        }
    }


    // generating new pdf
    const generateNewPdf = async () => {
        try {
            setIsGenerating(true);
            const response = await axiosInstance.get(pdf, { responseType: 'arraybuffer' });
            const existingPdfBytes = response.data;

            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const newPdfDoc = await PDFDocument.create();

            // sort if user want sequencial pdf 
            if (isInSequence === "select") {
                sortPages(selectedPages)
            }
            // getting each selected page and coping it to new pdf doc
            for (const pageIndex of selectedPages) {
                const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageIndex - 1]);
                newPdfDoc.addPage(copiedPage);
            }
            const newPdfBytes = await newPdfDoc.save();

            const pdfBlob = new Blob([newPdfBytes], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            toast.success("Pdf generated successfully")
            setGeneratedPdfUrl(pdfUrl);
            setGeneratedPdf(pdfBlob)
        } catch (error) {
            toast.error("error in generating extracted pdf, try again");
        }
        finally {
            setIsGenerating(false)
        }
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    if(loading) return <Loading text="Uploading Generated Pdf..."/>


    return (
        <>
            <div className='relative'>

                {/* display if no page is selected  */}
                {selectedPages.length === 0 && !loading && <span className='fixed top-[55px] right-0  z-50  text-red-500 bg-white p-1 shadow-lg rounded'>select at least one page to extract</span>}

                {/* display nav bar with option if atleast one page is selected */}
                {selectedPages.length > 0 &&
                    <EditNavbar
                        isInSequence={isInSequence}
                        handleSequenceChange={handleSequenceChange}
                        setOpenDialog={setOpenDialog}
                        handlePDFSaveClick={handlePDFSaveClick}
                        generatedPdfUrl={generatedPdfUrl}
                        generateNewPdf={generateNewPdf}
                        setGeneratedPdf={setGeneratedPdf}
                        name={name}
                        setGeneratedPdfUrl={setGeneratedPdfUrl}
                        setSelectedPages={setSelectedPages}
                        generatedPdf={generatedPdf}
                    />}

                {!generatedPdf
                    ?
                    <div>
                        {/* display all pages to select for rearranging and extraction (if still pdf not generated) */}
                        {pdf && (
                            <Document
                                file={pdf}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                <div className='flex gap-2 mt-[40px]  flex-wrap min-h-screen w-full justify-center '>

                                    {Array.from(new Array(numPages), (el, index) => (
                                        <div className='relative h-fit w-fit' key={`page_${index + 1}`} >
                                            <span className='absolute right-1 z-40  text-gray-500'>{index + 1}</span>

                                            <Page className="border-blue-300 border w-fit h-[200px] overflow-hidden"
                                                key={`page_${index + 1}`}
                                                pageNumber={index + 1}
                                                renderAnnotationLayer={false}
                                                renderTextLayer={false}
                                                height={200}
                                            />
                                            {/* checkbox for selection */}
                                            <input
                                                onChange={() => handleCheckBoxClick(index + 1)}
                                                checked={selectedPages.includes(index + 1)}
                                                type='checkbox' className='absolute h-[20px] 
                                                   bottom-1 right-1 
                                                  cursor-pointer   border-blue-500 border-blue-2  ' />
                                        </div>
                                    ))}
                                </div>
                            </Document>
                        )}
                    </div>
                    :
                    <>
                        {
                            isGenerating?
                            <Loading text="Generating PDF..."/>
                            :
                            
                            <div className='h-screen mt-[30px]'>
                            {/* display newly generated pdf if exist */}
                            <Document file={generatedPdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                                <span className='text-sm font-bold text-gray-600'>
                                    Pages {numPages}
                                </span>
                                <div className='h-[calc(100vh-50px)] flex flex-col items-center gap-[2px] overflow-y-scroll bottom-1 border-black shadow-lg cursor-text'>
                                    {Array.apply(null, Array(numPages)).map((x, i) => i + 1)
                                        .map((page) => (
                                            <div className='relative' key={`page_${page}`}>
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
                }
            </div>
            {/* Dialog box for Instruction */}
            {openDialog && <ConfirmDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />}
        </>
    );
};

export default EditPdf;
