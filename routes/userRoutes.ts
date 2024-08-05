import { Router } from 'express';
import { create, get, findAll, login, forgotPassword, forgotPasswordVerify, updateStudent, otpGenerate, forgotPasswordVerify3 } from '../controllers/userController';
import authenticateToken from '../middleware/middleware';

const router = Router();

router.post('/student/create', create);
router.post('/student/otp-generate', otpGenerate);
router.patch('/student/update', authenticateToken,updateStudent);
router.get('/student/get',authenticateToken, get);
router.get('/student/getAll', findAll);

//login route

router.post('/login',login);
router.post('/student/forgot-password',forgotPassword);
router.post('/student/forgot-password/verify',forgotPasswordVerify);
router.post('/student/forgot-password/reset-password',forgotPasswordVerify3);

export default router;
