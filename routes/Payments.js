const express=require('express')
const router=express.Router()


const {capturePayment,verifySignature}=require('../controllers/RazorPay')

router.post('/capturePayment',capturePayment)
router.post('/verifySignature',verifySignature)

module.exports=router