const EMAIL_MAX_LENGTH = 254;
const PASSWORD_MAX_LENGTH = 64;
const NAME_MAX_LENGTH = 50;
const USERNAME_MAX_LENGTH = 20;
const BIO_MAX_LENGTH = 160;
const MOBILE_NUMBER_MAX_LENGTH = 15;
const EVENT_NAME_MAX_LENGTH = 100;
const NUMBER_OF_GUESTS_MAX_LENGTH = 3;
const DESCRIPTION_MAX_LENGTH = 500;
const LOCATION_MAX_LENGTH = 200;
const BIRTHDAY_MAX_LENGTH = 8;
const AGE_MAX_LENGTH = 2;
const INSTAGRA_MAX_LENGTH = 30;
const CUPOM_MAX_LENGTH = 30;

const emailRegex = new RegExp(
  `^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,})){1,${
    EMAIL_MAX_LENGTH - 1
  }}$`
);
const passwordRegex = new RegExp(
  `^(?=.*\\d)(?=.*\\W)(?=.*[a-z])(?=.*[A-Z]).{10,${PASSWORD_MAX_LENGTH - 1}}$`
);
const nameRegex = new RegExp(
  `^(?=.{1,${NAME_MAX_LENGTH - 1}}$)[A-Za-z]+(?: [A-Za-z]+)*\\s*$`
);
const usernameRegex = new RegExp(
  `^[a-zA-Z0-9_]{3,${USERNAME_MAX_LENGTH - 1}}$`
);
const bioRegex = new RegExp(`^.{0,${BIO_MAX_LENGTH}}$`);
const brazilianMobileNumberRegex = /^\+55(\d{2})(\d{8,9})$/;
const argentinianMobileNumberRegex = /^\+54(\d{2,4})(\d)$/;
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
const ageRegex = new RegExp(`^\\d{2}$`);

const validBrazilianDDDs = new Set([
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "21",
  "22",
  "24",
  "27",
  "28",
  "31",
  "32",
  "33",
  "34",
  "35",
  "37",
  "38",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "51",
  "53",
  "54",
  "55",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "71",
  "73",
  "74",
  "75",
  "77",
  "79",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
]);
const acceptedCountryCodes = [
  "+54",
  "+591",
  "+55",
  "+56",
  "+57",
  "+506",
  "+53",
  "+593",
  "+503",
  "+502",
  "+504",
  "+52",
  "+505",
  "+507",
  "+595",
  "+51",
  "+598",
  "+58",
  "+1",
  "+44",
  "+61",
  "+64",
  "+353",
  "+27",
  "+91",
  "+65",
];
export {
  validBrazilianDDDs,
  acceptedCountryCodes,
  emailRegex,
  passwordRegex,
  nameRegex,
  usernameRegex,
  bioRegex,
  brazilianMobileNumberRegex,
  argentinianMobileNumberRegex,
  eventNameRegex,
  numberOfGuestsRegex,
  descriptionRegex,
  locationRegex,
  dateRegex,
  birthdayRegex,
  ageRegex,
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
  AGE_MAX_LENGTH,
  INSTAGRA_MAX_LENGTH,
  CUPOM_MAX_LENGTH,
};
