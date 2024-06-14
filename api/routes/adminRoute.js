import express from 'express'
import {adminHome, adminLogin} from '../controllers/adminController.js'
import { verifyToken } from '../utils/verifyAdmin.js'
import { adminLogout } from '../../client/src/redux/admin/adminSlice.js'

const router =express.Router()

router.post('/login',adminLogin)
router.post('logout',adminLogout)
router.get('/home',verifyToken,adminHome)


export default router;


