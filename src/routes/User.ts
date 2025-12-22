import express from 'express'
const router=express.Router()


import {signin,signup,sendotp,changepassword} from '../controllers/Auth'
import {auth} from '../middlewares/auth'
import {resetpasswordtoken,resetpasswordupdate} from '../controllers/ResetPassword'


router.post('/sendotp',sendotp)
router.post('/signup',signup)
router.post('/login',signin)

router.post('/reset-password-token',resetpasswordtoken)
router.post('/reset-password',resetpasswordupdate)
router.post('/changePassword',auth,changepassword)

export default router;