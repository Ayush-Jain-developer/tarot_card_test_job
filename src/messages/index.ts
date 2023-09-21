class Messages {
  static readonly emailExist = "Email already exists";

  static readonly dbSync = "Database is synced";

  static readonly dbSyncFail = "Unable to sync database:";

  static readonly signedUp = "Signed up successfully";

  static readonly dbConnection = "Database connection established successfully";

  static readonly dbConnectionFail = "Unable to connect to the database:";

  static readonly server = "Server started at port ";

  static readonly serverError = "Internal server error";

  static readonly passwordNotMatch =
    "Password and Confirm Password do not match";

  static readonly noUserExist = "User not found. Please signUp";

  static readonly wrongPassword = "Password incorrect";

  static readonly loggedIn = "Logged in successfully";

  static readonly tokenMissing = "Unauthorized - Token missing";

  static readonly invalidToken = "Unauthorized - Invalid token";

  static readonly wrongUserRole = "Unauthorized - User role is not correct";

  static readonly readerBioCreated = "Reader bio updated successfully";

  static readonly tokenExpired = "Unauthorized - User session expired";
}

export default Messages;
