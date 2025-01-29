const EMAIL_MAX_LENGTH = 254;
const PASSWORD_MAX_LENGTH = 64;
const NAME_MAX_LENGTH = 50;
const USERNAME_MAX_LENGTH = 20;
const BIO_MAX_LENGTH = 160;
const MOBILE_NUMBER_MAX_LENGTH = 11;
const EVENT_NAME_MAX_LENGTH = 100;
const NUMBER_OF_GUESTS_MAX_LENGTH = 3;
const DESCRIPTION_MAX_LENGTH = 500;
const LOCATION_MAX_LENGTH = 200;

const emailRegex = new RegExp(
  `^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,})){1,${
    EMAIL_MAX_LENGTH - 1
  }}$`
);
const passwordRegex = new RegExp(
  `^(?=.*\\d)(?=.*\\W)(?=.*[a-z])(?=.*[A-Z]).{10,${PASSWORD_MAX_LENGTH - 1}}$`
);
const nameRegex = new RegExp(
  `^(?=.{1,${NAME_MAX_LENGTH - 1}}$)[A-Z][a-z]*(?: [A-Z][a-z]*)*$`
);
const usernameRegex = new RegExp(
  `^[a-zA-Z0-9_]{3,${USERNAME_MAX_LENGTH - 1}}$`
);
const bioRegex = new RegExp(`^.{0,${BIO_MAX_LENGTH}}$`);
const mobileNumberRegex = new RegExp(
  `^\\+?[1-9]\\d{${MOBILE_NUMBER_MAX_LENGTH - 1}}$`
);
const eventNameRegex = new RegExp(`^.{1,${EVENT_NAME_MAX_LENGTH}}$`);
const numberOfGuestsRegex = new RegExp(
  `^[1-9][0-9]{0,${NUMBER_OF_GUESTS_MAX_LENGTH - 1}}$`
);
const descriptionRegex = new RegExp(`^.{0,${DESCRIPTION_MAX_LENGTH}}$`);
const locationRegex = new RegExp(`^.{1,${LOCATION_MAX_LENGTH}}$`);
const dateRegex = new RegExp(
  /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/
);

const validateEmail = (
  email: string
): { isValid: boolean; errorMessage: string } => {
  if (!email) {
    return {
      isValid: false,
      errorMessage: "This field is mandatory",
    };
  } else {
    return emailRegex.test(email)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: "Please enter a valid email (max 254 characters)",
        };
  }
};

const validatePassword = (
  password: string
): { isValid: boolean; errorMessage: string } => {
  if (!password) {
    return {
      isValid: false,
      errorMessage: "This field is mandatory",
    };
  } else {
    return passwordRegex.test(password)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage:
            "Password must contain at least one number, one special character, one lowercase and one uppercase letter (max 64 characters)",
        };
  }
};

const validateName = (
  name: string
): { isValid: boolean; errorMessage: string } => {
  if (!name) {
    return {
      isValid: false,
      errorMessage: "This field is mandatory",
    };
  } else {
    return nameRegex.test(name)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: "Please enter a valid full name",
        };
  }
};

const validateUsername = (
  username: string
): { isValid: boolean; errorMessage: string } => {
  if (!username) {
    return {
      isValid: false,
      errorMessage: "This field is mandatory",
    };
  } else {
    return usernameRegex.test(username)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage:
            "Username must be 3-20 characters long and can only contain letters, numbers, and underscores",
        };
  }
};

const validateBio = (
  bio: string
): { isValid: boolean; errorMessage: string } => {
  return bioRegex.test(bio)
    ? { isValid: true, errorMessage: "" }
    : {
        isValid: false,
        errorMessage: "Bio must be 0-160 characters long",
      };
};

const validateMobileNumber = (
  mobileNumber: string
): { isValid: boolean; errorMessage: string } => {
  if (!mobileNumber) {
    return {
      isValid: false,
      errorMessage: "This field is mandatory",
    };
  } else {
    return mobileNumberRegex.test(mobileNumber)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: "Please enter a valid mobile number",
        };
  }
};

const validateEventName = (
  eventName: string
): { isValid: boolean; errorMessage: string } => {
  if (!eventName) {
    return {
      isValid: false,
      errorMessage: "This field is mandatory",
    };
  } else {
    return eventNameRegex.test(eventName)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: "Please enter a valid event name",
        };
  }
};

const validateNumberOfGuests = (
  numberOfGuests: string
): { isValid: boolean; errorMessage: string } => {
  if (!numberOfGuests) {
    return {
      isValid: false,
      errorMessage: "This field is mandatory",
    };
  } else {
    return numberOfGuestsRegex.test(numberOfGuests)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: "Please enter a valid event name",
        };
  }
};

const validateDescription = (
  description: string
): { isValid: boolean; errorMessage: string } => {
  return descriptionRegex.test(description)
    ? { isValid: true, errorMessage: "" }
    : {
        isValid: false,
        errorMessage: `Description must be 0-${DESCRIPTION_MAX_LENGTH} characters long`,
      };
};

const validateLocation = (
  location: string
): { isValid: boolean; errorMessage: string } => {
  if (!location) {
    return {
      isValid: false,
      errorMessage: "This field is mandatory",
    };
  } else {
    return locationRegex.test(location)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: `Location must be 1-${LOCATION_MAX_LENGTH} characters long`,
        };
  }
};

const validateDate = (
  date: string
): { isValid: boolean; errorMessage: string } => {
  if (!date) {
    return {
      isValid: false,
      errorMessage: "This field is mandatory",
    };
  } else {
    return dateRegex.test(date)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: "Please enter a valid date in the format MM/DD/YYYY",
        };
  }
};

export {
  validateEmail,
  EMAIL_MAX_LENGTH,
  validatePassword,
  PASSWORD_MAX_LENGTH,
  validateName,
  NAME_MAX_LENGTH,
  validateUsername,
  USERNAME_MAX_LENGTH,
  validateBio,
  BIO_MAX_LENGTH,
  validateMobileNumber,
  MOBILE_NUMBER_MAX_LENGTH,
  validateEventName,
  EVENT_NAME_MAX_LENGTH,
  validateNumberOfGuests,
  NUMBER_OF_GUESTS_MAX_LENGTH,
  validateDescription,
  DESCRIPTION_MAX_LENGTH,
  validateLocation,
  LOCATION_MAX_LENGTH,
  validateDate,
};
