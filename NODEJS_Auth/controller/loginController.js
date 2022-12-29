const Joi = require("joi");
const User = require("../models/user");
const CustomErrorHandler = require("../services/customErrorHandler");
const bcrypt = require("bcrypt");
const JwtService = require("../services/JwtService");

async function login(req, res, next) {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  const { error } = loginSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(CustomErrorHandler.wrongCredentials());
    }

    // compare the passwords
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return next(CustomErrorHandler.wrongCredentials());
    }

    // generate token
    const access_token = JwtService.sign({
      _id: user._id,
      role: user.role,
    });

    res.json({ access_token });
  } catch (error) {
    return next(error);
  }
}

module.exports = login;
