const excdeal =require("../models/excdealModel");
const prod =require("../models/prodModel");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

exports.createExcdeal = async (req,res,next)=>{
    const excdealExist= await excdeal.findOne({dealno:req.body.dealno})
    if (excdealExist) return res.status(400).send({ success: false, message: "Deal already exists! Try Updating" });
  
    try {
      const getProd = await prod.findOne({name: req.body.product})
      const newExcdeal = {
          dealno: req.body.dealno,
          product: getProd._id,
      };
      //const newProduct = await createProductObj(req);
      
      const excDeal = await excdeal.create(newExcdeal);
      return res.status(200).send({ message: "Deal created successfully!", excDeal });
    } catch (error) {
      if (error.code === 11000) return res.status(200).send({ message: "Deal already exist! Try Updating" });
      return res.status(400).send({ message: "Unable to create new deals", error: " " + error });
    }
};

exports.getExcdeal = async (req, res, next)=> {
    // excdeal.find({}, "dealno createdAt _id product", (error, excDeals) => {
    //     if (error) return res.status(400).send({status: false, message: "Something went wrong!",error: error});
    //     return res.status(200).send({status: true, message: "showing Exclusive Deal's list!", count: excDeals.length, excDeals, });
    // });
    excdeal.find({}, {})
    // .select("-__v -updatedAt")
  // .select("-_id -__v -updatedAt")
    .populate("product", "_id name productImage description mrPrice sPrice quantity colors category")
    .exec((err, excdeal) => {
      if (err) return res.status(400).send({ message: "error showing deals", err });
      return res.status(200).send({ message: "showing all deals in the list", excdeal: excdeal });
    });
};

exports.editExcdeal = async (req, res, next)=>{
    try{
        const getProd = await prod.findOne({name: req.body.product})
        const excdealExists =await excdeal.findOne({ product: getProd._id})
        if (excdealExists){ 
            return res.status(400).send({ success: false, message: "This Deal already exist!! Try another." });
        }
        const updatedDeal = await excdeal.findByIdAndUpdate(req.params.dealId,{ dealno: req.body.dealno, product: getProd._id}, {new:true});
        if (!updatedDeal) {
            return res.status(400).send({success: false, message: "Could not update deal!" });
          }
          return res.status(200).send({success: true, message: "Successfully updated!", updatedDeal });
      
        } catch (error) {
          return res.status(400).send({success: false, message: error, error: error });
    }
};

exports.deleteExcdeal = async (req, res,next) => {
    try{
        const deletedDeal = await excdeal.findByIdAndDelete(req.params.dealId);
        if (!deletedDeal) {
            return res.status(400).send({success: false, message: "Could not delete deal" });
        }
        return res.status(200).send({success: true, message: "Deleted successfully", deletedDeal });
    }
    catch (error) {
        return res.status(400).send({success: false, message: "Something went wrong!", error:error });
    }
};