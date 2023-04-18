const userService = require("../services/userService");
const authService = require("../services/authService");

var validator = require("validator");

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
