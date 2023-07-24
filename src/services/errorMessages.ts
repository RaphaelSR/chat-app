export const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "The email address is badly formatted.";
      case "auth/user-not-found":
        return "No user found for the provided email.";
      case "auth/wrong-password":
        return "The password is invalid for the given email.";
      case "auth/user-disabled":
        return "The user account has been disabled by an administrator.";
      case "auth/email-already-in-use":
        return "The email address is already in use by another account.";
      case "auth/operation-not-allowed":
        return "Password sign-in is disabled for this project.";
      case "auth/weak-password":
        return "The password is too weak.";
      default:
        return "An unknown error occurred.";
    }
  };
  