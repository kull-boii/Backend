const Joi = require("joi");
const CustomErrorHandler = require("../services/customErrorHandler");

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
    const exist = await URLSearchParams.exists({ email: req.body.email });
    if (exist) {
      return next(CustomErrorHandler.alreadyExist("This Email Already exists"));
    }
  } catch (err) {
    return next(err);
  }

  return res.send("Good");
}

module.exports = { register };
