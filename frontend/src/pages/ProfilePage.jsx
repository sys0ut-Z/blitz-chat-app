import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore.js'
import { AiOutlineUser } from "react-icons/ai";
import { IoCameraOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";

const ProfilePage = () => {
  const {authUser, isUpdatingProfile, updateProfile} = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    // ! user cannot change it's profile pic more than 10 times
    // if(imageCount > 10){
    //   return toast.error("limit reached, you cannot update your profile pic");
    // }

    const file = e.target.files[0];
    setSelectedImg(file); // set it for objectUrl

    if(!file)
      return;

    // upload image to cloudinary via multer
    await updateProfile({ profilePic:file });
  }

  return (
    <div className='h-screen pt-20'>
      <div className='max-w-xl mx-auto px-4 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>

          {/* Heading section */}
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>User Profile</h1>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={authUser.profilePic ? authUser.profilePic : selectedImg ? URL.createObjectURL(selectedImg) : "/avatar.png"}
                alt="Profile"
                className="size-24 sm:size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <IoCameraOutline className="size-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
          </div>

          {/* // ! Update Details - Immutable */ }
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <AiOutlineUser className="size-4 sm:size-5" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <IoMailOutline className="size-4 sm:size-5" />
                Email
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage