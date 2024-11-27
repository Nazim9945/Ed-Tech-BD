const express=require('express')
const router=express.Router()


const {signin,signup,sendotp,changepassword}=require('../controllers/Auth');
const {auth}=require('../middlewares/auth')
const {resetpasswordtoken,resetpasswordupdate}=require('../controllers/ResetPassword')


router.post('/sendotp',sendotp)
router.post('/signup',signup)
router.post('/login',signin)

router.post('/reset-password-token',resetpasswordtoken)
router.post('/reset-password',resetpasswordupdate)
router.post('/changePassword',auth,changepassword)

module.exports=router