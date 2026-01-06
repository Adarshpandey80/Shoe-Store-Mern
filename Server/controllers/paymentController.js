
const Razorpay = require("razorpay");
const crypto = require("crypto");
const OrderModel = require("../models/orderModel")


const orderPayment = async (req, res) => {
    console.log(req.body);
    try {
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }
        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }

}


// const verifyPayment = async (req, res) => {
//     try {
//         const {
//             razorpay_orderID,
//             razorpay_paymentID,
//             razorpay_signature,
//             userId,
//             amount,
//             products } = req.body;
//             console.log(req.body)
//         const sign = razorpay_orderID + "|" + razorpay_paymentID;
//         const resultSign = crypto
//             .createHmac("sha256", process.env.KEY_SECRET)
//             .update(sign.toString())
//             .digest("hex");

       

//         // ❌ If signature invalid
//         if (razorpay_signature !== expectedSign) {
//             return res.status(400).json({ message: "Payment verification failed" });
//         }

//         // ✅ SAVE ORDER
//         const order = await OrderModel.create({
//             userId,
//             orderId: razorpay_orderID,
//             paymentId: razorpay_paymentID,
//             amount,
//             products,
//             paymentStatus: "success"
//         });

//         res.status(200).json({
//       message: "Payment verified successfully",
//       order,
//     });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal Server Error!" });
//     }
// }


const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_orderID,
      razorpay_paymentID,
      razorpay_signature,
      userId,
      amount,
      products,
    } = req.body;

    const sign = razorpay_orderID + "|" + razorpay_paymentID;

    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // ✅ SAVE ORDER
    const order = await OrderModel.create({
      userId,
      orderId: razorpay_orderID,
      paymentId: razorpay_paymentID,
      amount,
      products,
      paymentStatus: "success",
    });

    res.status(200).json({
      message: "Payment verified & order saved",
      order,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { orderPayment, verifyPayment }; 