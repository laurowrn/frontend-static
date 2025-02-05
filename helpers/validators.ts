import {
  bioRegex,
  dateRegex,
  DESCRIPTION_MAX_LENGTH,
  descriptionRegex,
  emailRegex,
  eventNameRegex,
  LOCATION_MAX_LENGTH,
  BIRTHDAY_MAX_LENGTH,
  locationRegex,
  mobileNumberRegex,
  nameRegex,
  numberOfGuestsRegex,
  passwordRegex,
  usernameRegex,
  birthdayRegex,
} from "@/constants/validation";

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

const validateBirthday = (
  birthday: string
): { isValid: boolean; errorMessage: string } => {
  if (!birthday) {
    return {
      isValid: false,
      errorMessage: "This field is mandatory",
    };
  }
  if (!birthdayRegex.test(birthday)) {
    return {
      isValid: false,
      errorMessage: "Please enter a valid date in the format DD/MM/YYYY",
    };
  }
  const [day, month, year] = birthday.split("/").map(Number);
  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };
  const daysInMonth: number[] = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  if (day > daysInMonth[month - 1]) {
    return {
      isValid: false,
      errorMessage: "Please enter a valid date",
    };
  }
  return { isValid: true, errorMessage: "" };
};

export {
  validateEmail,
  validatePassword,
  validateName,
  validateUsername,
  validateBio,
  validateMobileNumber,
  validateEventName,
  validateNumberOfGuests,
  validateDescription,
  validateLocation,
  validateDate,
  validateBirthday,
};
