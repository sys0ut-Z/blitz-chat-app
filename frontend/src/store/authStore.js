import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import {toast} from 'react-toastify'
import {io} from 'socket.io-client'
import { BACKEND_URL } from '../constants/otherUrls.js'

const baseURL = import.meta.env.MODE === "development" ? BACKEND_URL : "/";

export const useAuthStore = create((set, get) => ({
  // initial states
  authUser: null,
  isSigningUp: false, // when user clicks signUp button, then it will be true(i.e. loading state)
  isLogginIn: false, // when user click loginIn button, then it will be true(i.e. loading state)
  isUpdatingProfile: false, // .....
  isCheckingAuth: true, // loader(loading state)
  // imageCount: 0,
  onlineUsers: [],
  socket: null, // store socket id in this user

  // reducer functions
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/chat-user/check");

      set({
        authUser: response.data,
      });

      // connect socket here
      get().connectSocket(); 
    } catch (error) {
      set({
        authUser: null,
      });
      
      console.log(error);
      // toast.error(error.message);
    }
    finally{
      set({
        isCheckingAuth: false
      })
    }
  },

  signup: async (data) => {
    set({ isSigningUp:true }) // loader is true coz user has entered the details and clicked sign up button
    try {
      const response = await axiosInstance.post("/chat-user/signup", data);

      if(!response.data.success){
        return toast.error(response.data.message);
      }

      set({authUser: response.data.user}); // update state
      toast.success(response.data.message);
      
      // * when user signs in then also connect with socket
      get().connectSocket(); // call socket server
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      set({ isSigningUp:false }); // remove loader
    }
  },

  login : async (data) => {
    set({ isLogginIn:true }) // login loader
    try {
      const response = await axiosInstance.post("/chat-user/login", data);
      // console.log("store login 1");
      
      if(!response.data.success){
        return toast.error(response.data.message);
      }
      set({ authUser:response.data.user });
      // console.log("store login 2");
      
      // * when user successfully logs in then we will mark it's socket id
      get().connectSocket(); // call socket server
      // console.log("store login 3");
      
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      set({ isLogginIn:false });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/chat-user/logout");

      if(!response.data.success){
        return toast.error(response.data.message);
      }

      set({ authUser:null }); // clear the data
      get().disconnectSocket(); // disconnect socket

      toast.success("You have been logged out from the website");
    } catch (error) {
      toast.error(error.message);
    }
  },

  updateProfile: async ({profilePic}) => {
    set({ isUpdatingProfile:true }); // loader
    try {
      // multer will not be able to recognize the key, so we must have to make formData and pass image se {key:value} pair
      const formData = new FormData();
      formData.append("image", profilePic);

      const response = await axiosInstance.post("/chat-user/update-profile", formData, {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      });

      if(!response.data.success){
        return toast.error(response.data.message);
      }

      // * increase image count
      // ^ to upload multiple state, it is preferred to use state variable to avoid any issue
      set({ authUser: response.data.user });

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }finally {
      set({ isUpdatingProfile:false }); // set loader to false
    }
  },

  // connect socket method
  connectSocket : () => {
    const {authUser} = get();

    // if use is not authenticated OR user is already connected(then don't create a new connection)
    if(!authUser || get().socket?.connected)
      return;

    const socket = io(baseURL, {
      query: {
        userId: authUser._id
      }
    });
    socket.connect();
    
    set({ socket }); 

    // userIds are keys
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers:userIds });
    });
  },

  disconnectSocket : () => {
    // if user is connected then only disconnect it
    if(get().socket?.connected) // OR get().socket?.connected
      get().socket.disconnect();
  }
}))