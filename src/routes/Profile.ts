import express from 'express'
const router=express.Router()

import  {deleteAccount,
    updateProfile,
    getUserDetails,
    updateProfilePic
    
} from '../controllers/Profile'
import {auth} from '../middlewares/auth'

router.delete('/deleteProfile',auth, deleteAccount)
router.put('/updateProfile',auth,updateProfile)
router.put('/updateProfilePic',auth,updateProfilePic)
router.get('/getUserDetails',auth,getUserDetails)

export default router;