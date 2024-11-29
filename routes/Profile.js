const express=require('express')

const router=express.Router()

const {deleteAccount,
    updateProfile,
    getUserDetails,
    updateProfilePic
    
}= require('../controllers/Profile')
const {auth}=require('../middlewares/auth')

router.delete('/deleteProfile',auth, deleteAccount)
router.put('/updateProfile',auth,updateProfile)
router.put('/updateProfilePic',auth,updateProfilePic)
router.get('/getUserDetails',auth,getUserDetails)

module.exports=router