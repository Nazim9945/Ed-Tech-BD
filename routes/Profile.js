const express=require('express')

const router=express.Router()

const {deleteAccount,
    updateProfile,
    getAllUserDetails,
    
}= require('../controllers/Profile')
const {auth}=require('../middlewares/auth')

router.delete('/deleteProfile', deleteAccount)
router.post('/updateProfile',auth,updateProfile)
router.get('/getalluserdetails',auth,getAllUserDetails)

module.exports=router