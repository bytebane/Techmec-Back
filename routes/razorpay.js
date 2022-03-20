const router = require("express").Router();
const Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: process.env.RP_KeyId,
  key_secret: process.env.RP_KeySecret,
});

router.post("/", (req, res) => {
  const options = {
    amount: req.body.amount, // amount in the smallest currency unit
    currency: "INR",
    //   receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function (err, order) {
    // console.log(order);
    if (err) return res.status(400).send({ message: "Error", error: err });
    return res
      .status(200)
      .send({ message: "showing order", orderId: order.id, orderInfos: order });
  });
});
module.exports = router;
