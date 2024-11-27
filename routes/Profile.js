const express=require('express')

const router=express.Router()

const {deleteAccount,
    updateProfile,
    getAllUserDetails,
    
}= require('../controllers/Profile')
const {auth}=require('../controllers/Auth')

router.delete('/deleteProfile', deleteAccount)
router.post('/updateProfile',auth,updateProfile)
router.get('/getalluserdetails',auth,getAllUserDetails)

module.exports=router