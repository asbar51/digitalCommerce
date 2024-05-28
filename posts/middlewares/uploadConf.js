import path from 'path';
import multer from 'multer';

// Multer configuration
const storage = multer.diskStorage({
  destination: './uploads/images',
  filename: function (req, file, cb) {
    console.log("file: ",file)
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const uploadFile = upload.single('image'); // Assuming you are using 'image' as the field name

export default uploadFile;
