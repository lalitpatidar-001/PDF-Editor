import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import toast from 'react-hot-toast';

/*
 * EditNavbar Component:
 * This component represents the navigation bar for the EditPdf component.
 * It provides options for arranging pages, generating and downloading PDFs, and saving extracted PDFs.
 * The component utilizes Material-UI icons for menu and buttons for various actions.
 * Features:
 * - Selecting sequence of pages (sequential or manual)
 * - Generating PDF based on selected pages
 * - Downloading the generated PDF
 * - Saving extracted PDF to the server
 * - Responsive design with menu options for smaller screens
*/

const EditNavbar = (
    { isInSequence, handleSequenceChange, setOpenDialog, handlePDFSaveClick, generatedPdfUrl, generateNewPdf, name, setGeneratedPdfUrl, setSelectedPages,generatedPdf,setGeneratedPdf }
    ) => {

    const [menuOpen, setMenuOpen] = useState(false)
    const [buttonMenuOpen, setButtonMenuOpen] = useState(false)
    
    // Function to handle download of the generated PDF
    const handleDownloadPdf = () => {
        const link = document.createElement('a');
        link.href = generatedPdfUrl;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("PDF Downloaded Successfully")
    }

    return (
        <div className=' bg-gray-500 py-1 fixed top-[55px] right-0 z-50 flex   gap-2 items-center w-full justify-between px-3 ' >

            {/* show nav options only if there is no pdf generated */}
            {!generatedPdf ?
                <div className={`
                 flex gap-2 sm:items-center sm:flex-row sm:static sm:p-0
                 absolute left-[2px] top-[45px] p-2 flex-col bg-gray-500   
                 ${menuOpen ? "visible" : "hidden sm:flex"}
                 `}
                >
                {/* toggle button to know more about pdf re-arrange system */}
                    <button onClick={()=>setOpenDialog(true)} className='bg-blue-600 text-white rounded-full w-fit px-2 py-1 text-center font-bold underline cursor-pointer ' >Learn</button>

                    {/* radio options for pdf re-arrange */}
                    <label className='flex items-center font-bold gap-1 justify-between'>
                        Arrage In Order
                        <input type='radio' value="select" name='page-sequence' className='h-4 w-5' checked={isInSequence === "select"}
                            onChange={handleSequenceChange}
                        />
                    </label>
                    <label className='flex items-center font-bold gap-1 justify-between'>
                        Arrage Manually
                        <input type='radio' name='page-sequence' className='h-4 w-5'
                            checked={isInSequence === "manualy"}
                            value="manualy"
                            onChange={handleSequenceChange}
                        />
                    </label>

                </div>
                :
                <div>
                {/* cancel button (set generatedPdf null) display only if there is generated pdf */}
                    <button
                        onClick={() => setGeneratedPdf(null)}
                        className='shadow-lg font-bold px-2 py-1 rounded text-white bg-red-600'>cancel</button>
                </div>
            }

            <div className={`sm:w-fit w-full`}>
            {/* display download and save pdf option only if generated pdf not null */}
                {generatedPdf ?
                    <>
                        {/* menu button for small screen with MUI MenuIcon */}
                        <div className='sm:hidden absolute right-1 top-1 text-white ' onClick={() => setButtonMenuOpen(!buttonMenuOpen)}><MenuIcon /></div>
                        <div className={` sm:flex-row gap-2 sm:items-center sm:static self-end absolute right-0 top-[45px] flex flex-col sm:bg-transparent bg-gray-500 sm:p-0 p-2
                        ${buttonMenuOpen ? "visible" : "hidden sm:flex"}
                        `}>

                            {/* Download pdf button */}
                            <button className=' shadow-lg font-bold px-2 py-1 rounded text-white bg-blue-600'
                                onClick={handleDownloadPdf}
                            >Download PDF</button>
                            {/* button to save generated button to server */}
                            <button className=' shadow-lg font-bold px-2 py-1 rounded text-white bg-blue-600' onClick={handlePDFSaveClick}>Save PDF</button>

                        </div>
                    </>
                    :
                    <div className='flex justify-between w-full '>
                    {/* display if no generated pdf */}
                        {/* menu for small screen */}
                        <div className='sm:hidden text-white' onClick={() => setMenuOpen(!menuOpen)}><MenuIcon /></div>
                       
                        <div className='flex gap-2 items-center'>

                            {/* button to deselct all pdf pages checkbox */}
                            <button className=' shadow-lg font-bold px-2 py-1 rounded text-white bg-red-600'
                                onClick={() => setSelectedPages([])}
                            >Clear</button>

                            {/* button to generate pdf from selected pages */}
                            <button className=' shadow-lg font-bold px-2 py-1 rounded text-white bg-blue-600'
                                onClick={generateNewPdf}
                            >Generate PDF</button>

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default EditNavbar