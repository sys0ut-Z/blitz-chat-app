import jwt from 'jsonwebtoken'
import ChatUserModel from '../models/user.model.js'

export const authUserMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(token ? "Yes" : "No");
    
    if(!token){
      return res.status(401).json({
        success: false,
        message: "Not an authorized user, pls Login"
      })
    }
    // console.log("token 2");
    
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("token 3");
    
    const user = await ChatUserModel.findById(decodeToken.userId).select("-password");
    
    req.user = user;
    // console.log("token 4");
    next();
  } catch (error) {
    // console.log("token 5 catch");
    console.log(error.message);
    res.status(500).json({
      success: false,
      catcherror: true,
      message: error.message
    })
  }
}