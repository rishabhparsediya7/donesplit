const jwt = require("jsonwebtoken");
const HttpError = require("../CustomClasses/HttpError");

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new HttpError("Authentication failed!", 403);
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
    if (decodedToken) {
      req.userData = { id: decodedToken.id, email: decodedToken.email };
      next();
    }
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({ message: "Token expired" });
  }
};
module.exports = {
  checkToken,
};
