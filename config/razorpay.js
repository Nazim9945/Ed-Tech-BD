const Razorpay=require('razorpay')

require('dotenv').config()

exports.instanceRazorPay=new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

