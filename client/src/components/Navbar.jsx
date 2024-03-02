import React from 'react'
import { useDispatch } from 'react-redux'
import { signOutUser } from '../redux/slices/userSlice';
import { Link } from 'react-router-dom';

/*
    Navbar component :
        * Responsible to render Logo and Logout button
*/

const Navbar = () => {
    const dispatch = useDispatch();
    const handleLogoutClick = () => {
        dispatch(signOutUser());
    }
    return (
        <div className='h-[50px] flex fixed w-full top-0 z-40 items-center shadow-lg justify-between p-4 bg-white'>
            {/* left */}
            <div className='flex items-center justify-between gap-8'>
                <Link to="/">
                    <div className='text-xl font-bold'><span className='text-red-500'>PDF</span><span> Editor</span></div>
                </Link>
            </div>

            {/* right */}
            <div className=''>
                <button
                    onClick={handleLogoutClick}
                    className='font-bold border-2 border-black px-2'>Logout</button>
            </div>
        </div>
    )
}

export default Navbar