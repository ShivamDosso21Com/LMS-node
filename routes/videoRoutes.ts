import { Router } from 'express';
import multer from 'multer';
import { uploadVideo, getVideos } from '../controllers/videoController';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post('/upload', upload.single('video'), uploadVideo);
router.get('/videos', getVideos);

export default router;
