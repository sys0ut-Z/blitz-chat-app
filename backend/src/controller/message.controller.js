import ChatUserModel from '../models/user.model.js'
import MessageUserModel from '../models/message.model.js'
import { getReceiverSocketId, server } from '../../index.js';

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await ChatUserModel.find({_id: {$ne: loggedInUserId}}).select("-password")
    // *                       fetch all users except me(current user)

    res.status(200).json({
      success: true,
      users:filteredUsers
    })
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      catcherror: true,
      message: error.message
    })
  }
}

const getMessages = async (req, res) => {
  try {
    const {id: userToChatId} = req.params;
    const myId = req.user._id; 
    // * senderId is my Id --> I will send the message 

    const messages = await MessageUserModel.find({
      // * either I am the sender & user is receiver OR user is sender & I am the receiver
      $or: [
        {senderId:myId, receiverId:userToChatId},
        {senderId:userToChatId, receiverId:myId}
      ]
    });

    res.status(200).json({
      success: true,
      messages
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      catcherror: true,
      message: error.message
    })
  }
}

const sendMessage = async (req, res) => {
  try {
    const {text} = req.body; // message payload
    const secure_url = req.imageUrl;
    const {id: receiverId} = req.params;
    const myId = req.user._id;

    const message = await MessageUserModel.create({
      senderId: myId,
      receiverId,
      text,
      image: secure_url, // doesn't matter if image is there or undefined, it will be decided by the database
    });

    // ^ get receivers socket id to send him/her message
    const receiversSocketId = getReceiverSocketId(receiverId);

    // ! if receiver is online then id will NOT be undefined, so send the message
    if(receiversSocketId){
      server.to(receiversSocketId).emit("newMessage", message);
    }

    res.status(201).json({
      success: true,
      message
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      catcherror: true,
      message: error.message
    });
  }
}

export {
  getUsersForSidebar,
  getMessages,
  sendMessage,
}