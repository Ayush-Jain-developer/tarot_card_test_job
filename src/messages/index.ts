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

  static readonly refreshTokenExpiry = "7 Days";

  static readonly tokensGenerated =
    "Access and Refresh tokens generated successfully";

  static readonly userData = "User Data";

  static readonly readerPaginatedData =
    "Reader data for the given page number and page size";

  static readonly invalidFileType =
    "Invalid file type. Only JPEG, JPG, PNG, and SVG files are allowed";

  static readonly userRating = "User review and rating saved successfully";

  static readonly ratingGiven =
    "Your rating has already been saved for the given user";

  static readonly serviceAdded = "New service added successfully";

  static readonly noCards = "No cards saved for the given user";

  static readonly userCards =
    "Following are the Cards saved for the given user";
}

export default Messages;
