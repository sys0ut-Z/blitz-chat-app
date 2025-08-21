import cloudinary from 'cloudinary'

export const uploadToCloudinary = async (profilePic) => {
  try {
    const response = await cloudinary.v2.uploader.upload(profilePic);
    return response;
  } catch (error) {
    return error;
  }
}