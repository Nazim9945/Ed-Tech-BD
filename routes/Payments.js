const express=require('express')
const router=express.Router()


const {capturePayments,verifySignature}=require('../controllers/RazorPay')

router.post('/capturePayment',capturePayments)
router.post('/verifySignature',verifySignature)

module.exports=router