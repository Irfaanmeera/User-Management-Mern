import express from 'express'
import {addUser, adminHome, adminLogin, deleteuser, edituserData, userEdit,} from '../controllers/adminController.js'
import { verifyToken } from '../utils/verifyAdmin.js'
import { adminLogout } from '../../client/src/redux/admin/adminSlice.js'

const router =express.Router()

router.post('/login',adminLogin)
router.post('logout',adminLogout)
router.get('/home',verifyToken,adminHome)
router.get('/edit/:id',edituserData)
router.post('/edit/:id',userEdit)
router.post('/addUser',verifyToken, addUser)
router.get('/deleteUser/:id',verifyToken, deleteuser)


export default router;


