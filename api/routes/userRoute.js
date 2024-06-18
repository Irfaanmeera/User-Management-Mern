import express from 'express'
import {  updateUser, userHome } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router()
router.get('/',userHome);
router.post('/update/:id',verifyToken,updateUser)

export default router;
