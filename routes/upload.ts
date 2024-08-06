import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';



// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Define the filename
  }
});

// Initialize multer with the defined storage
const upload = multer({ storage });

const router = Router();



// Single file upload expected with field name 'file'
router.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  console.log('file is her',req.file)
  if (!req.file) {
    return res.status(400).send({ error: 'File is required' });
  }

  res.status(200).send({
    message: 'File uploaded successfully',
    file: req.file
  });
});

export default router;
