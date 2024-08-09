import { Router } from 'express';
import multer from 'multer';
import { uploadVideo, getVideos } from '../controllers/videoController';

const router = Router();

 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
// const upload = multer({ storage });
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
}).single('video'); // Adjust the size as per your needs


// router.post('/upload', uploadVideo);

router.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: 'File too large' });
      }
    } else if (err) {
      return res.status(500).json({ error: 'File upload failed', details: err });
    }

    // Call the uploadVideo controller if the file is uploaded successfully
    uploadVideo(req, res);
  });
});

router.get('/videos', getVideos);

export default router;