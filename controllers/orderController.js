const Order = require("../models/orderModel");
const Product = require("../models/prodModel");
const nodemailer = require("nodemailer");
const notiController = require("../controllers/notificationController");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAILID,
    pass: process.env.EMAILPASS,
  },
});

exports.createOrders = async (req, res, next) => {
  // var prodArr = req.body.products.map(function (item) {
  //   return item;
  // });
  // console.log(prodArr);
  // req.body.productId.forEach(function (item, index, array) {
  //   console.log(item, index);
  // });
  console.log(req.body.email);
  const mailOptions = {
    from: process.env.EMAILID,
    to: req.body.emailId,
    subject: "TechMec Order Placed",
    text: req.body.emailBody, //req.body.emailMsg;
  };
  const newOrder = {
    user: req.body.user,
    products: req.body.products,
    prodNames: req.body.prodNames,
    prodPrices: req.body.prodPrices,
    colors: req.body.colors,
    quantities: req.body.quantities,
    orderPrice: req.body.orderPrice,
    orderStatus: req.body.orderStatus,
    orderPayment: req.body.orderPayment,
    returnStatus: req.body.returnStatus,
    razorPayPaymentId: req.body.razorPayPaymentId,
    razorPayOrderID: req.body.razorPayOrderID,
    deliveredOn: req.body.deliveredOn,
    estDelDate: req.body.estDelDate,
    orderAddress: req.body.orderAddress,
  };

  try {
    // const stock = await Product.findById(newOrder.products);
    // console.log(stock);
    // if (req.body.quantity > stock.quantity)
    //   return res.status(200).send({ message: "Product is out of stock" });
    // const update = { quantity: stock.quantity - newOrder.quantity };
    // await Product.findByIdAndUpdate(stock.id, update, { new: true });
    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });
    const order = await Order.create(newOrder);
    notiController.createNotifications(req);
    transporter.sendMail(mailOptions);
    return res
      .status(200)
      .send({ message: "Order created successfully!", order: order });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "unable to create order", error: " " + error });
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const orderData = await Order.find({ user: req.params.userId });
    if (!orderData) {
      return res
        .status(400)
        .send({ success: false, message: "Admin Not Found" });
    }
    return res.status(200).send(orderData);
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "Error", error: error });
  }
};
exports.getOrders = async (req, res, next) => {
  await Order.find({}, {}) //, query)
    .populate("products", "name sPrice")
    .exec((err, orders) => {
      if (err) return res.status(400).send({ message: "Error", err });
      return res.status(200).send({ message: "showing order", orders });
    });
};

exports.updateOrders = async (req, res) => {
  const mailOptions = {
    from: process.env.EMAILID,
    to: req.body.emailId,
    subject: "TechMec Order Status",
    text: req.body.emailBody, //req.body.emailMsg;
  };
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedOrder) {
      return res
        .status(400)
        .send({ success: false, message: "Could not update Order" });
    }
    transporter.sendMail(mailOptions);
    return res.status(200).send({
      success: true,
      message: "Successfully updated",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "An error has occurred, unable to update Order",
      error: error,
    });
  }
};

exports.deleteOrders = async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId); // the `await` is very important here!

    if (!deletedOrder) {
      return res
        .status(400)
        .send({ success: false, message: "Could not delete Order" });
    }
    return res.status(200).send({
      success: true,
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "Something went wrong!", error: error });
  }
};
