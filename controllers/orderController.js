const Order = require("../models/orderModel");
const Product = require("../models/prodModel");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.createOrders = async (req, res, next) => {
  // var prodArr = req.body.products.map(function (item) {
  //   return item;
  // });
  // console.log(prodArr);
  // req.body.productId.forEach(function (item, index, array) {
  //   console.log(item, index);
  // });
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
  };

  try {
    // const stock = await Product.findById(newOrder.products);
    // console.log(stock);
    // if (req.body.quantity > stock.quantity)
    //   return res.status(200).send({ message: "Product is out of stock" });
    const order = await Order.create(newOrder);
    // const update = { quantity: stock.quantity - newOrder.quantity };
    // await Product.findByIdAndUpdate(stock.id, update, { new: true });
    return res
      .status(200)
      .send({ message: "Order created successfully!", order: order });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "unable to create order", error: " " + error });
  }
};

exports.getOrders = async (req, res, next) => {
  await Order.find({}, {}, query)
    .populate("products", "name sPrice")
    .exec((err, orders) => {
      if (err) return res.status(400).send({ message: "showing order", err });
      return res.status(200).send({ message: "showing order", orders });
    });
};

exports.deleteOrders = async (req, res, next) => {
  try {
    const deletedOrder = await Product.findByIdAndDelete(req.params.orderId); // the `await` is very important here!

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
