const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.hashedPW = (pw) => {
  var salt = bcrypt.genSaltSync(10) + "crud";
  var hash = bcrypt.hashSync(pw, salt);
  return hash;
};

exports.compareHash = (text, hash) => {
  if (bcrypt.compareSync(text, hash)) {
    return true;
  } else {
    return false;
  }
};