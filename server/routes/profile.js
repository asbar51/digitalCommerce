import express from 'express'
import { addProfile, getProfile, loginProfile, logout, updateProfile, uploadAvatar } from '../controllers/profile.js'
import { tokenChecker } from '../middlewares/tokenChecker.js'
import uploadFile from "../middlewares/uploadConf.js";


const router = express.Router()

router.get('/',tokenChecker,getProfile)
router.post('/sign_up',addProfile)
router.post('/login',loginProfile)
router.post('/upload/avatar',tokenChecker,uploadFile,uploadAvatar)
router.put('/update/:username',updateProfile)
router.delete('/delete/:username',logout)

export default router