
import {Router} from 'express';
import { createNotesFunction, deleteNotesFunction, getByCourseIdFunction, getNotesFunction } from '../controllers/notesController';

const router = Router();

router.post('/notes/create',createNotesFunction);
router.get('/notes/getAll',getNotesFunction);
router.get('/notes/getByCourseId/:id',getByCourseIdFunction);
router.delete('/notes/deleteByCourseId/:topicId',deleteNotesFunction);

export default router;
