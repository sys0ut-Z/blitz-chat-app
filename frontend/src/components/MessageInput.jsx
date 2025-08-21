import React, { useRef, useState } from 'react'
import {useChatStore} from '../store/chatStore.js'
import { RxCross1 } from "react-icons/rx";
import { CiImageOn } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import {toast} from 'react-toastify'

const MessageInput = () => {

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const {sendMessage} = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if(!file.type.startsWith("image/")){
      toast.error("Please select an image file");
      return;
    }

    setImagePreview(file);
  }

  const removeImage = () => {
    setImagePreview(null);
    if(fileInputRef.current){
      fileInputRef.current.value = null;
      // remove image reference
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // if message is empty(no text or image)
    if((text && text.trim().length === 0) && !imagePreview)
      return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview
      });

      // reset the states
      setText("");
      setImagePreview(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send the message");
    }

  }

  return (
    <div className='p-4 w-full'>

      {/* Preview the selected Image */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview && URL.createObjectURL(imagePreview)}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <RxCross1 className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-2'>
          <input type="text"
            className='w-full input input-bordered rounded-lg input-sm sm:input-md'
            placeholder='Type a message...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input type="file"
            accept="image/*"
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* If image is in preview then the button will be green */}
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                    ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <CiImageOn size={23} />
          </button>
        </div>

        {/* Send button */}
        <button
          type="submit"
          className="btn btn-sm btn-circle p-2"
          disabled={!text.trim() && !imagePreview}
        >
          <FiSend size={23} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput