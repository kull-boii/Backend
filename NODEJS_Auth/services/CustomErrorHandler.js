class CustomErrorHandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }

  // static: so we dont need to create object
  // for email already exists in DB
  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }

  // if email entered doesnt match the emails in db
  static wrongCredentials(message = "Username or password is wrong") {
    return new CustomErrorHandler(401, message);
  }
}

module.exports = CustomErrorHandler;
