import React from 'react'
import {useAuthStore} from '../store/authStore.js'
import { useChatStore } from '../store/chatStore.js';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import ThemeChange from './ThemeChange.jsx';

const Navbar = () => {
  const {logout, authUser} = useAuthStore();
  const {setSelectedUser} = useChatStore();

  const logoutHandler = async () => {
    await logout();
    setSelectedUser(null); // on logout remove selected user
  }

  return (
    <nav className='border-b border-base-300 fixed w-full top-0 z-40
    backdrop-blur-lg bg-base-100/80'>
      <div className='container mx-auto px-4 h-16'>
        <div className='flex items-center justify-between h-full'>

          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <IoChatbubbleEllipsesOutline className="size-7 text-[#6264FF]" />
              </div>
              <h1 className="text-lg font-bold">Blitz Chat App</h1>
            </Link>
          </div>

          <div className='flex items-center gap-3'>
            <ThemeChange />
            {
              // ! if user is authenticated then only we will show profile & logout button
              authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <AiOutlineUser className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logoutHandler}>
                  <FiLogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar