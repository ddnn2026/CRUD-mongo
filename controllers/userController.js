const userService = require("../services/userService");
const authService = require("../services/authService");

var validator = require("validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const userExisting = await userService.findNameUser({
      name: req.body.name,
    });
    const checkEmail = validator.isEmail(req.body.email);
    if (!checkEmail) {
      res.status(422).json({ message: "Email validator" });
    } else if (userExisting != null) {
      res.status(422).json({ message: "User existing" });
    } else {
      let element = {
        email: req.body.email,
        password: authService.hashedPW(req.body.password),
        name: req.body.name,
      };
      const user = await userService.createUser(element);
      res.json({ data: user, status: "Create User Success" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;
  let loadUser;
  await userService
    .findNameUser({ email: email })
    .then((element) => {
      if (!element) {
        console.log("user not found");
        const error = new Error("A user with email could not be found");
        error.statusCode = 401;
        error.message = "A user with email could not be found";

        throw error;
      }
      console.log("user found");
      loadUser = element;
      return authService.compareHash(pass, element.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        console.log("Wrong");
        const error = new Error("Wrong password");
        error.statusCode = 401;
        error.message = "Wrong password";
        throw error;
      }

      const paramsToken = {
        email: loadUser.email,
        userId: loadUser._id.toString(),
      };

      const token = authService.createToken(paramsToken, "david");

      res.status(200).json({
        token: token,
        userId: loadUser._id.toString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.json({
        code: err.statusCode,
        message: err.message,
      });
      next(err);
    });
};
