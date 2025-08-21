import ChatUserModel from '../models/user.model.js'
import { encryptPass } from '../util/PasswordUtil.js'
import { createToken } from '../util/tokenUtil.js';
import bcrypt from 'bcrypt'
import Validator from 'validator'

const registerUser = async (req, res) => {
  try {
    const {fullName, email, password} = req.body;
    
    if(!fullName || !email || !password){
      return res.status(400).json({
        success: false,
        message: "Pls fill all the fields"
      })
    }

    // check password length
    if(password.length < 6){
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
      })
    }

    if(!Validator.isEmail(email)){
      return res.status(400).json({
        success: false,
        message: "Pls enter a valid email"
      })
    }

    // check for existing user
    const existingUser = await ChatUserModel.findOne({email});

    if(existingUser){
      return res.status(400).json({
        success: false,
        message: "User Account with this email already exists"
      })
    }

    // encrypt password
    const hashedPass = encryptPass(password);

    const user = await ChatUserModel.create({fullName, email, password: hashedPass});

    // create a token
    const token = createToken(user._id);
    
    // ! maxAge must be in milliseconds
    res
    .cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "strict", // cookie will only be sent if the request is coming from the same site (not from another domain).
      secure: process.env.NODE_ENV !== 'development', // cookie will be sent only over HTTPS when the app is not in development mode.
    })
    .json({
      success: true,
      message: "Account created Successfully",
      user 
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      catcherror: true,
      message: error.message
    })
  }
}

const loginUser = async (req, res) => {
  try {
    // console.log("cont login 1");
    const {email, password} = req.body;
    
    if(!email || !password){
      return res.json({
        success: false,
        message: "Pls fill all the fields"
      })
    }
    // console.log("cont login 2");
    
    const existingUser = await ChatUserModel.findOne({email});
    // console.log("cont login 3");
    
    if(!existingUser){
      return res.json({
        success: false,
        message: "User not found, pls Sign Up"
      })
    }
    
    // console.log("cont login 4");
    const verifyPass = bcrypt.compareSync(password, existingUser.password);
    
    if(!verifyPass){
      return res.json({
        success: false,
        message: "Pls enter a correct password"
      })
    }
    // console.log("cont login 5");
    
    // create a token
    const token = createToken(existingUser._id);
    // console.log("cont login 6");
    
    // ^ store new token in cookies
    res
    .cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "strict", // cookie will only be sent if the request is coming from the same site (not from another domain).
      secure: process.env.NODE_ENV !== 'development', // cookie will be sent only over HTTPS when the app is not in development mode.
    })
    .json({
      success: true,
      message: "You have been successfully logged in to your account",
      user: existingUser
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      catcherror: true,
      message: error.message
    })
  }
}

const logoutUser = (req, res) => {
  try {
    // clear cookie
    res.cookie("token", null, {maxAge: 0});

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      catcherror: true,
      message: error.message
    })
  }
}

const updateProfile = async (req, res) => {
  try {
    const secure_url = req.imageUrl;
    const userId = req.user._id;

    // console.log("1"); 
    if(!secure_url){
      return res.json({
        success: false,
        message: "Profile pic is required",
      });
    }
    
    // console.log("2");
    // // upload to cloudinary
    // const response = await uploadToCloudinary(profilePic);
    // console.log("3");
    
    const updatedUser = await ChatUserModel.findByIdAndUpdate(userId, {profilePic:secure_url}, {new:true});
    
    // console.log("3");
    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      catcherror: true,
      message: error.message
    })
  }
}

// * this function will be called when we refresh our application
const checkUser = (req, res) => {
  try {
    // console.log("check user 1");
    // it will just send the authenticated user back to the client
    if(!req.user){
      return res.json({
        success: false,
        message: "Not an authorized user, pls signup or login"
      })
    }
    
    // console.log("check user 2");
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      catcherror: true,
      message: error.message,
    })
  }
}

export {
  registerUser,
  loginUser,
  logoutUser,
  updateProfile,
  checkUser
}