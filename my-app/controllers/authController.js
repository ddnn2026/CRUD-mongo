const authService = require("../services/authService");

exports.hello = (req, res) => {
  let password = "123";
  const hash = authService.hashedPW(password);
  const compare = authService.compareHash("text", hash);

  res.json({
    data: hash,
    compare: compare,
  });
};

exports.signup = (req, res) => {
  let password = "123";
  const hash = authService.hashedPW(password);
  const compare = authService.compareHash(password, hash);

  res.json({
    data: hash,
    compare: compare,
  });
};

