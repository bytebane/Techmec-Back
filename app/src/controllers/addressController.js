const User = require("../models/userModel");
const Address = require("../models/addressModel");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.createAddress = async (req, res, next) => {
  try {
    const myUser = await User.findById(req.body.user);
    const alreadyExists = await Address.findOne({
      user: myUser._id,
      fullName: req.body.fullName,
      houseNo: req.body.houseNo,
      area: req.body.area,
      landmark: req.body.landmark,
      city: req.body.city,
      phone: req.body.phone,
    });

    if (alreadyExists)
      return res
        .status(400)
        .send({ status: false, message: "Address already exists!" });

    const newAddress = new Address({
      user: req.body.user,
      fullName: req.body.fullName,
      houseNo: req.body.houseNo,
      area: req.body.area,
      landmark: req.body.landmark,
      city: req.body.city,
      pin: req.body.pin,
      phone: req.body.phone,
    });

    newAddress.save((error, savedAddress) => {
      if (error) {
        return res.status(400).send({
          status: false,
          message: "Something went wrong!",
          error: error,
        });
      }
      return res.status(200).send({
        status: true,
        message: "Address Successfully Added!",
        address: savedAddress,
      });
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Unable to add Address", error: " " + error });
  }
};

exports.getAddress = async (req, res, next) => {
  await Address.find({ user: req.params.userId }, (error, addresses) => {
    if (error)
      return res.status(400).send({
        status: false,
        message: "Something went wrong!",
        error: error,
      });
    return res.status(200).send({
      status: true,
      message: "showing Address list!",
      count: addresses.length,
      addresses: addresses,
    });
  });
};

exports.editAddress = async (req, res, next) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.addrId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedAddress) {
      return res
        .status(400)
        .send({ success: false, message: "Could not update Address!" });
    }
    return res.status(200).send({
      success: true,
      message: "Successfully updated!",
      updatedAddress,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: error, error: error });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const delAddr = await Address.findByIdAndDelete(req.params.addrId);

    if (!delAddr) {
      return res
        .status(400)
        .send({ success: false, message: "Could not Delete Address!" });
    }
    return res.status(200).send({
      success: true,
      message: "Successfully Deleted!",
      deletedAddress: delAddr,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: error, error: error });
  }
};
