import multer from 'multer'

const storage = multer.diskStorage({
  destination: "D:\\MERN_projs\\chat_app\\backend\\src\\public",
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}`);
  }
});

export const singleFile = multer({storage}).single("image");