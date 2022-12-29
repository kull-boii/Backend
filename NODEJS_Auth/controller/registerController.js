const Joi = require("joi");
const bcrypt = require("bcrypt");
const CustomErrorHandler = require("../services/customErrorHandler");

const User = require("../models/user");
const JwtService = require("../services/JwtService");

async function register(req, res, next) {
  /*
  Steps to register a user:
  - Validate a user
  - Authorize a user
  - Check if the user is already present in the DB
  - prepare model
  - Store in database
  - Generate a JWT token
  - Send response  
  */

  // Validation
  const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    repeat_password: Joi.ref("password"),
  });

  const { error } = registerSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  // check if user is already in the DB
  try {
    const exist = await User.exists({ email: req.body.email });
    if (exist) {
      return next(CustomErrorHandler.alreadyExist("This Email Already exists"));
    }
  } catch (err) {
    return next(err);
  }

  // destructre
  const { name, email, password } = req.body;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const userProfile = new User({
    name,
    email,
    password: hashedPassword,
  });

  let access_token;
  try {
    const result = await userProfile.save();
    console.log(result);
    access_token = JwtService.sign({
      _id: result._id,
      role: result.role,
    });
  } catch (err) {
    return next(err);
  }

  return res.json({ access_token });
}

module.exports = { register };
