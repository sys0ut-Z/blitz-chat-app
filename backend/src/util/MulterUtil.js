import { singleFile } from "../config/multer.config.js";
import {uploadToCloudinary} from '../util/CloudinaryUtil.js'
import fs from 'fs';

export const uploadToMulterAndCloudinary = async (req, res, next) => {
  await singleFile(req, res, async (error) => {
    // ! if file exists then only upload it on cloudinary
    if(req.file){

      // check for errors
      if(error){
        return res.json({
          success: false,
          message: error.message
        })
      }
      
      const response = await uploadToCloudinary(req.file.path);
      
      if(!response.url || !response.public_id || !response.secure_url){
        return res.json({
          success: false,
          message: response.message, // error.message
        })
      }

      // unlink file from local directory
      fs.unlink(req.file.path, (error) => {
        if(error){
          return res.json({
            success:false,
            message: "Unable to unlink the file"
          })
        }
      });
  
      req.imageUrl = response.secure_url;
    }
    next();
  })
}