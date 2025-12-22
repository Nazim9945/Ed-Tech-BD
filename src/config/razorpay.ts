import Razorpay from 'razorpay'

import 'dotenv/config'

const instanceRazorPay=new Razorpay({
  key_id: process.env.KEY_ID as string,
  key_secret: process.env.KEY_SECRET as string,
});
export default instanceRazorPay
