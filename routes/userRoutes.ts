import { Router } from 'express';
import { create, get, findAll, login, forgotPassword, forgotPasswordVerify, updateStudent, otpGenerate, forgotPasswordVerify3, Logout, DeleteFunction, updatePassword, BatchCreate, updateProfilePhoto, getProfilePhoto, checkReferalCode, ReferAndEarnMoney } from '../controllers/userController';
import authenticateToken from '../middleware/middleware';


const router = Router();

router.post('/student/create', create);
router.post('/student/otp-generate', otpGenerate);
router.patch('/student/update', authenticateToken,updateStudent);
router.get('/student/get',authenticateToken, get);
router.delete('/student/delete',authenticateToken, DeleteFunction);
router.get('/student/getAll',authenticateToken, findAll);

//login route
router.post('/login',login);
router.get('/logout',authenticateToken,Logout);
router.post('/student/forgot-password',forgotPassword);
router.post('/student/forgot-password/verify',forgotPasswordVerify);
router.post('/student/forgot-password/reset-password',forgotPasswordVerify3);

// update profile photo of user 
router.post('/student/profilephoto',authenticateToken,updateProfilePhoto)
//update passowrd 
router.put('/password/update',authenticateToken,updatePassword);
//get profile photo
router.get('/profile-photo',authenticateToken, getProfilePhoto);
//check refereal code 
router.get('/student/refercode/:referalCode',checkReferalCode)
router.get('/referEarn',ReferAndEarnMoney)
//create batch
router.post('/batch',BatchCreate);

export default router;
