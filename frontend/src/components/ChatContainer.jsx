import React, { useEffect, useRef } from 'react'
import MessageSkeleton from '../skeletons/MessageSkeleton.jsx';
import ChatHeader from './ChatHeader.jsx';
import { useChatStore } from '../store/chatStore.js';
import MessageInput from './MessageInput.jsx';
import { useAuthStore } from '../store/authStore.js';
import { formatTime } from '../lib/formatTime.js';

const ChatContainer = () => {
  const {authUser} = useAuthStore();
  const messageEndRef = useRef(null);

  const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unSubscribeMessages} = useChatStore();
  useEffect(() => {
    getMessages(selectedUser._id);

    // save message in zustand
    subscribeToMessages();

    // on clean up, remove event listener
    return () => unSubscribeMessages();
  }, [selectedUser._id, getMessages]);
  //* messages will be fetched when we type a new message OR selected user changes

  // scroll behavior
  useEffect(() => {
    // if there are some messages then only do this
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if(isMessagesLoading){
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            // ! if _id matches with my _id OR I am the sender then the message will be displayed on the right side
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            {/* // ^ to display profile pic while sending the message */}
            {/* <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div> */}

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <div className='my-2'>
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-xl mx-auto object-cover"
                  />
                </div>
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer