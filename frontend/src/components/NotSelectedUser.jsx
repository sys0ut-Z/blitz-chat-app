import React from 'react'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'

const NotSelectedUser = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-5">
        {/* Icon Display */}
        <div className="flex justify-center gap-3 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
              justify-center"
            >
              <IoChatbubbleEllipsesOutline className="size-7 sm:size-9 text-[#6264FF]" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-xl sm:text-2xl font-bold">Welcome to Blitz Chat App!</h2>
        <p className="text-xs sm:text-base-content/60">
          Start a conversation
        </p>
      </div>
    </div>
  )
}

export default NotSelectedUser