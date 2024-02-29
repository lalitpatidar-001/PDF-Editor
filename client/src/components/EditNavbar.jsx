import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

/*
 * EditNavbar Component:
 * This component represents the navigation bar for the EditPdf component.
 * It provides options for arranging pages, generating and downloading PDFs, and saving extracted PDFs.
*/

const EditNavbar = (
    { isInSequence, handleSequenceChange, setOpenDialog, handlePDFSaveClick, generatedPdf, generateNewPdf, name, setGeneratedPdf, setSelectedPages }
    ) => {

    const [menuOpen, setMenuOpen] = useState(false)
    const [buttonMenuOpen, setButtonMenuOpen] = useState(false)
    
    // Function to handle download of the generated PDF
    const handleDownloadPdf = () => {
        const link = document.createElement('a');
        link.href = generatedPdf;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className=' bg-gray-500 py-1 fixed top-[55px] right-0 z-50 flex   gap-2 items-center w-full justify-between px-3 ' >

            {!generatedPdf ?
                <div className={`
                 flex gap-2 sm:items-center sm:flex-row sm:static sm:p-0
                 absolute left-[2px] top-[45px] p-2 flex-col bg-gray-500   
                 ${menuOpen ? "visible" : "hidden sm:flex"}
                 `}
                >
                    <button onClick={()=>setOpenDialog(true)} className='bg-blue-600 text-white rounded-full w-fit px-2 py-1 text-center font-bold underline cursor-pointer ' >Learn</button>

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
                    <button
                        onClick={() => setGeneratedPdf(null)}
                        className='shadow-lg font-bold px-2 py-1 rounded text-white bg-red-600'>cancel</button>
                </div>
            }

            <div className={`sm:w-fit w-full`}>
                {generatedPdf ?
                    <>
                        <div className='sm:hidden absolute right-1 top-1 text-white ' onClick={() => setButtonMenuOpen(!buttonMenuOpen)}><MenuIcon /></div>
                        <div className={` sm:flex-row gap-2 sm:items-center sm:static self-end absolute right-0 top-[45px] flex flex-col sm:bg-transparent bg-gray-500 sm:p-0 p-2
                ${buttonMenuOpen ? "visible" : "hidden sm:flex"}
                `}>
                            <button className=' shadow-lg font-bold px-2 py-1 rounded text-white bg-blue-600'
                                onClick={handleDownloadPdf}
                            >Download PDF</button>
                            <button className=' shadow-lg font-bold px-2 py-1 rounded text-white bg-blue-600' onClick={handlePDFSaveClick}>Save Extract PDF</button>
                        </div>
                    </>
                    :
                    <div className='flex justify-between w-full '>
                        <div className='sm:hidden text-white' onClick={() => setMenuOpen(!menuOpen)}><MenuIcon /></div>
                        <div className='flex gap-2 items-center'>
                            <button className=' shadow-lg font-bold px-2 py-1 rounded text-white bg-red-600'
                                onClick={() => setSelectedPages([])}
                            >Clear</button>
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