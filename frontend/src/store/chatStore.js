import {create} from 'zustand'
import {toast} from 'react-toastify'
import { axiosInstance } from '../lib/axios.js'
import { useAuthStore } from './authStore.js'

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading:true }); // loader
    try {
      const response = await axiosInstance.get("/chat-messages/users");

      if(!response.data.success){
        return toast.error(response.data.message);
      }

      set({ users:response.data.users });
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      set({ isUserLoading:false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading:true }); // loader
    try {
      // only fetch the message of clicked user
      const response = await axiosInstance.get(`/chat-messages/${userId}`);

      if(!response.data.success){
        return toast.error(response.data.message);
      }

      set({ messages:response.data.messages });
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      set({ isMessagesLoading:false });
    }
  },

  sendMessage: async ({text, image}) => {
    const {selectedUser, messages} = get(); // it will fetch current variables
    try {
      const formData = new FormData();
      formData.append("text", text);
      formData.append("image", image);

      const response = await axiosInstance.post(`/chat-messages/send/${selectedUser._id}`, formData);

      if(!response.data.success){
        return toast.error(response.data.message);
      }

      set({messages:[...messages, response.data.message]});
    } catch (error) {
      toast.error(error.message);
    } 
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  subscribeToMessages: () => {
    const {selectedUser} = get();

    if(!selectedUser)
      return;

    // ^ IMPORT THE STATE OF ANOTHER STORE
    const {socket} = useAuthStore.getState(); // OR socket = useAuthStore.getState().socket;

    // TODO : optimize later
    socket.on("newMessage", (newMessage) => {
      /* 
        ! ISSUE 
        -> if the user is selected let us suppose, John Doe and if I select another user and send the message to John Doe then that message will be delivered to current selected user which is not John Doe, so to fix this, we will check senderId & selectedUser id
      */
      /* 
        * SOLUTION
        -> if we select any user and send the message then we have written the logic such that it will store both senderId & receiverId,
          but let us suppose I have changed the user, still previous Id is stored in newMessage and hence we can compare it and check 
          whether current user is selected User or not,
          
        -> if id does not matches then we have changed the user, don't worry, message would be send to the selected User but it would
          not be visible in the chat of current selected user
      */
      if(newMessage.senderId !== selectedUser._id)
        return;

      set({
        messages: [...get().messages, newMessage]
      })
    });
  },

  unSubscribeMessages: () => {
    const {socket} = useAuthStore.getState();

    // & remove event listener
    socket.off("newMessage");
  }
}));