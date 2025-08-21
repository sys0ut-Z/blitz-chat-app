import React from 'react'
import { RxCross1 } from "react-icons/rx";
import { useAuthStore } from '../store/authStore.js'
import { useChatStore } from '../store/chatStore';

const ChatHeader = () => {
  const {onlineUsers} = useAuthStore();
  const {selectedUser, setSelectedUser} = useChatStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <RxCross1 className='size-4' />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader