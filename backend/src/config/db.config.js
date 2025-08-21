import mongoose from 'mongoose'
export const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}/chat_app`)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("error while connecting to the database : ", error));
}