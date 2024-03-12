const jwt = require("jsonwebtoken");

const generateToken = (id, email, number) => {
  const token = jwt.sign(
    { id: id, verification: email || number },
    process.env.JWT_SECRETKEY,
    {
      expiresIn: "2d",
    }
  );
  return token;
};

module.exports = {
  generateToken,
};
