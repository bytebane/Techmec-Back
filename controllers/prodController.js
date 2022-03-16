const Product = require("../models/prodModel");
const Cat = require("../models/cateModel");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.createProduct = async (req, res, next) => {
  const productExist = await Product.findOne({ name: req.body.name });
  if (productExist)
    return res
      .status(400)
      .send({ success: false, message: "Product already exists! Try Again" });

  try {
    const mycategory = await Cat.findOne({ name: req.body.category });
    const newProduct = {
      category: mycategory._id,
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      mrPrice: req.body.mrPrice,
      sPrice: req.body.sPrice,
      colors: req.body.colors,
    };
    //const newProduct = await createProductObj(req);

    const product = await Product.create(newProduct);
    return res
      .status(200)
      .send({ message: "Product created successfully!", product });
  } catch (error) {
    if (error.code === 11000)
      return res.status(200).send({ message: "product already exist" });
    return res
      .status(400)
      .send({ message: "unable to create product", error: " " + error });
  }
};

exports.updateProducts = async (req, res) => {
  const filter = { _id: req.params.prodId };
  // await Product.findByIdAndUpdate(filter, update);

  try {
    const mycategory = await Cat.findOne({ name: req.body.category });
    const newProduct = {
      category: mycategory._id,
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      mrPrice: req.body.mrPrice,
      sPrice: req.body.sPrice,
      colors: req.body.colors,
    };
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.prodId,
      { $set: newProduct },
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(400)
        .send({ success: false, message: "Could not update Product" });
    }
    return res.status(200).send({
      success: true,
      message: "Successfully updated",
      updatedProd: updatedProduct,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "An error has occurred, unable to update Product",
      error: error,
    });
  }
};

exports.getProducts = (req, res, next) => {
  const pageNo = parseInt(req.query.pageNo);
  const size = 3;

  if (pageNo <= 0) {
    return res
      .status(200)
      .send({ error: true, message: "invalid page number" });
  }

  const query = {
    //skip = size * (pageNo - 1),
    //limit = size,
  };

  Product.find({}, {}, query)
    .select("-__v -updatedAt")
    // .select("-_id -__v -updatedAt")
    .populate("category", "-_id name")
    .exec((err, products) => {
      if (err)
        return res.status(400).send({ message: "error showing products", err });
      return res
        .status(200)
        .send({ message: "showing all products in the list", products });
    });
};

exports.deleteProducts = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.prodId); // the `await` is very important here!

    if (!deletedProduct) {
      return res
        .status(400)
        .send({ success: false, message: "Could not delete product" });
    }
    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "Something went wrong!", error: error });
  }
};

// const createProductObj = async (req) => {
//   return {
//     category: mycategory._id,
//       name: req.body.name,
//       description: req.body.description,
//       quantity: req.body.quantity,
//       mrPrice: req.body.mrPrice,
//       sPrice: req.body.sPrice,
//       colors: req.body.colors,
//       productImage: req.file.filename,
//     // category: req.body.categoryId,
//     // name: req.body.name,
//     // price: req.body.price,
//     // description: req.body.description,
//     // productImage: req.file.filename,
//     // quantity: req.body.quantity,
//   };
// }
