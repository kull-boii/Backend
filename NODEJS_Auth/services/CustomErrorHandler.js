class CustomErrorHandler extends Error {
  constructor(status, msg) {
    this.status = status;
    this.message = msg;
  }

  // static: so we dont need to create object
  // for email already exists in DB
  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }
}

module.exports = CustomErrorHandler;
