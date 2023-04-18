const userModel = require("../models/User");

exports.createUser = async (element) => {
  return await userModel.create(element);
};

exports.findNameUser = async (element)=>{
  return await userModel.findOne(element)
}