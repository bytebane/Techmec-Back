const newarv =require("../models/newarvModel");
const prod =require("../models/prodModel");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

exports.createNewarv = async (req,res,next)=>{
    
    try {
        const getProd = await prod.findOne({name: req.body.product})
        const newarvExist= await newarv.findOne({product: getProd._id})
        if (newarvExist) return res.status(400).send({ success: false, message: "Product already exists! Try Updating" });
        const newNewarv = {
          newarvImg: req.body.newarvImg,
          product: getProd._id,
        };
      //const newProduct = await createProductObj(req);
      
      const newArv = await newarv.create(newNewarv);
      return res.status(200).send({ message: "New Arrival created successfully!", newArv });
    } catch (error) {
      if (error.code === 11000) return res.status(200).send({ message: "Already exist! Try Updating" });
      return res.status(400).send({ message: "Unable to create new arrivals", error: " " + error });
    }
};

exports.getNewarv = async (req, res, next)=> {
    newarv.find({}, "newarvImg createdAt _id product", (error, newarrivals) => {
        if (error) return res.status(400).send({status: false, message: "Something went wrong!",error: error});
        return res.status(200).send({status: true, message: "showing New Arrival's list!", count: newarrivals.length, newarrivals: newarrivals, });
    });
};

exports.editNewarv = async (req, res, next)=>{
    try{
        const getProd = await prod.findOne({name: req.body.product})
        const newarvExists =await newarv.findOne({ product: getProd._id})
        if (newarvExists){ 
            return res.status(400).send({ success: false, message: "This item already exist in the list!! Try another." });
        }
        const updatedArv = await newarv.findByIdAndUpdate(req.params.arvId,{product: getProd._id}, {new:true});
        if (!updatedArv) {
            return res.status(400).send({success: false, message: "Could not update!" });
          }
          return res.status(200).send({success: true, message: "Successfully updated!", updatedArv });
      
        } catch (error) {
          return res.status(400).send({success: false, message: error, error: error });
    }
};

exports.deleteNewarv = async (req, res,next) => {
    try{
        const deletedArv = await newarv.findByIdAndDelete(req.params.arvId);
        if (!deletedArv) {
            return res.status(400).send({success: false, message: "Could not delete" });
        }
        return res.status(200).send({success: true, message: "Deleted successfully", deletedArv });
    }
    catch (error) {
        return res.status(400).send({success: false, message: "Something went wrong!", error:error });
    }
};