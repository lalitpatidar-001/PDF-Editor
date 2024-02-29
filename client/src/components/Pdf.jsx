import React, { useEffect } from 'react'
import pdfIcon from "../assets/pdf-icon.png";
import { format } from "timeago.js"
import { Link } from 'react-router-dom';


const Pdf = ({ name, createdAt,_id }) => {

    return (
        <>

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
        </>
    )
}

export default Pdf