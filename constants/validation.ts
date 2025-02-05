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
const BIRTHDAY_MAX_LENGTH = 8;

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
const birthdayRegex = new RegExp(
  /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
);

export {
  emailRegex,
  passwordRegex,
  nameRegex,
  usernameRegex,
  bioRegex,
  mobileNumberRegex,
  eventNameRegex,
  numberOfGuestsRegex,
  descriptionRegex,
  locationRegex,
  dateRegex,
  birthdayRegex,
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  NAME_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
  BIO_MAX_LENGTH,
  MOBILE_NUMBER_MAX_LENGTH,
  EVENT_NAME_MAX_LENGTH,
  NUMBER_OF_GUESTS_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  LOCATION_MAX_LENGTH,
  BIRTHDAY_MAX_LENGTH,
};
