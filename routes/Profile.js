const express=require('express')

const router=express.Router()

const {deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateProfilePic
    
}= require('../controllers/Profile')
const {auth}=require('../middlewares/auth')

router.delete('/deleteProfile', deleteAccount)
router.post('/updateProfile',auth,updateProfile)
router.put('/updateProfilePic',auth,updateProfilePic)
router.get('/getalluserdetails',auth,getAllUserDetails)

module.exports=router