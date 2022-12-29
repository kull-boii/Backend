const CustomErrorHandler = require("../services/customErrorHandler");
const JwtService = require("../services/JwtService");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthroized());
  }

  const token = authHeader.split(" ")[1];
  try {
    const { _id, role } = await JwtService.verify(token);
    const user = {
      _id,
      role,
    };
    req.user = user;
    next();
  } catch (error) {
    return next(CustomErrorHandler.unAuthroized());
  }
};

module.exports = auth;
