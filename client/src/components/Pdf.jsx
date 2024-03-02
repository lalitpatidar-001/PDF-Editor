import React, { useEffect, useState } from 'react'
import pdfIcon from "../assets/pdf-icon.png";
import { format } from "timeago.js"
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axiosInstance from '../axios';
import {toast} from "react-hot-toast"
import { useDispatch } from 'react-redux';
import { removePdf } from '../redux/slices/pdfSlice';
import Loading from './Loading';

/*
    Pdf Component:
        * Responsible to render all accepted props pdf of user
        * onclick of particular pdf redirect to SinglePdfpage
        * Provide a delete button to delete particular pdf
*/

const Pdf = ({ name, createdAt, _id }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loading , setLoading] = useState(false);
    const dispatch = useDispatch();

    // deleting a pdf
    const handleClickDeletePdf = async()=>{ 
        try{
            setLoading(true)
            const response = await axiosInstance.delete(`/pdf/${_id}`);
            console.log(response)
            if(response.status === 200){
                toast.success("PDF Deleted successfully");
                dispatch(removePdf({id:_id})) // removing from strore
                setMenuOpen(false)
            }
        }catch(error){
            console.log(error);
        }
        finally{
            setLoading(false)
        }
    }

    if(loading){
        return <Loading text="Deleting..."/>
    }

    return (
        <div className='relative'>

            <Link to={`/pdf/${_id}`}>

                <div
                    className='sm:h-[250px] sm:w-[201px] h-fit 
             w-[80vw]  bg-white cursor-pointer flex flex-col items-center py-1 sm:m  rounded overflow-hidden'

                >
                    <img className='sm:w-[100%]
              drop-shadow-2xl h-[250px] w-[200px]' src={pdfIcon} />
                    <div className="text-[1rem]  font-bold overflow-hidden whitespace-nowrap w-[90%] text-center">
                        <span className='truncate  '>{name}</span>
                    </div>
                    <span className='text-[10px]  self-end pr-1 text-gray-500 '>{format(createdAt)}</span>
                </div>
            </Link>
            {/* vertical dot menu toggle */}
            <div onClick={()=>setMenuOpen(!menuOpen)} className='absolute top-0 right-0 cursor-pointer'><MoreVertIcon /></div>

            {/* menu list - delete button */}
            {menuOpen &&
                <div className='absolute top-0 right-7 flex flex-col  w-fit  bg-white shadow-lg rounded'>
                    <span className='cursor-pointer p-1 rounded hover:bg-gray-300' onClick={handleClickDeletePdf}>delete</span>
                </div>}
        </div>
    )
}

export default Pdf