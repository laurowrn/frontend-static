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
  brazilianMobileNumberRegex,
  argentinianMobileNumberRegex,
  nameRegex,
  numberOfGuestsRegex,
  passwordRegex,
  usernameRegex,
  birthdayRegex,
  ageRegex,
  validBrazilianDDDs,
  acceptedCountryCodes,
} from "@/constants/validation";

const errorMessages = {
  mandatoryField: "Este campo é obrigatório",
  invalidEmail: "Por favor, insira um email válido",
  invalidPassword:
    "A senha deve conter pelo menos um número, um caractere especial, uma letra minúscula e uma letra maiúscula (máximo 64 caracteres)",
  invalidName: "Por favor, insira um nome completo válido",
  invalidUsername:
    "O nome de usuário deve ter entre 3 e 20 caracteres e pode conter apenas letras, números e underscores",
  invalidBio: "A biografia deve ter entre 0 e 160 caracteres",
  invalidMobileNumber: "Por favor, insira um número de celular válido",
  invalidMobileNumber9: "Por favor, adicione o 9º dígito do seu número",
  invalidCountryCode: "Por favor, insira o código do país",
  invalidDDD: "Por favor, adicione um DDD válido ao seu número",
  invalidEventName: "Por favor, insira um nome de evento válido",
  invalidNumberOfGuests: "Por favor, insira um número de convidados válido",
  invalidDescription: `A descrição deve ter entre 0 e ${DESCRIPTION_MAX_LENGTH} caracteres`,
  invalidLocation: `A localização deve ter entre 1 e ${LOCATION_MAX_LENGTH} caracteres`,
  invalidDate: "Por favor, insira uma data válida no formato DD/MM/YYYY",
  invalidBirthday: "Por favor, insira uma data válida no formato DD/MM/YYYY",
  invalidDay: "Por favor, insira uma data válida",
  invalidAge: "Por favor, insira uma idade válida",
  invalidMinimumAge: "Você precisa ter pelo menos 18 anos",
};

const validateEmail = (
  email: string
): { isValid: boolean; errorMessage: string } => {
  if (!email) {
    return {
      isValid: false,
      errorMessage: errorMessages.mandatoryField,
    };
  } else {
    return emailRegex.test(email)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: errorMessages.invalidEmail,
        };
  }
};

const validatePassword = (
  password: string
): { isValid: boolean; errorMessage: string } => {
  if (!password) {
    return {
      isValid: false,
      errorMessage: errorMessages.mandatoryField,
    };
  } else {
    return passwordRegex.test(password)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: errorMessages.invalidPassword,
        };
  }
};

const validateName = (
  name: string
): { isValid: boolean; errorMessage: string } => {
  if (!name) {
    return {
      isValid: false,
      errorMessage: errorMessages.mandatoryField,
    };
  } else {
    return nameRegex.test(name)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: errorMessages.invalidName,
        };
  }
};

const validateUsername = (
  username: string
): { isValid: boolean; errorMessage: string } => {
  if (!username) {
    return {
      isValid: false,
      errorMessage: errorMessages.mandatoryField,
    };
  } else {
    return usernameRegex.test(username)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: errorMessages.invalidUsername,
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
        errorMessage: errorMessages.invalidBio,
      };
};

const validateMobileNumber = (mobileNumber: string) => {
  if (!mobileNumber) {
    return {
      isValid: false,
      errorMessage: errorMessages.mandatoryField,
    };
  }
  if (!acceptedCountryCodes.some((code) => mobileNumber.startsWith(code))) {
    return {
      isValid: false,
      errorMessage: errorMessages.invalidCountryCode,
    };
  }

  const countryCode = mobileNumber.slice(0, 3);
  const numberWithoutCountryCode = mobileNumber.slice(3);

  if (!/^\d+$/.test(numberWithoutCountryCode)) {
    return {
      isValid: false,
      errorMessage: errorMessages.invalidMobileNumber,
    };
  }

  if (countryCode === "+55") {
    const ddd = numberWithoutCountryCode.slice(0, 2);
    if (!validBrazilianDDDs.has(ddd)) {
      return {
        isValid: false,
        errorMessage: errorMessages.invalidDDD,
      };
    }
    if (numberWithoutCountryCode.length == 10) {
      return {
        isValid: false,
        errorMessage: errorMessages.invalidMobileNumber9,
      };
    }
    if (numberWithoutCountryCode.length != 11) {
      return {
        isValid: false,
        errorMessage: errorMessages.invalidMobileNumber,
      };
    }
  }

  return { isValid: true, errorMessage: "" };
};

const validateEventName = (
  eventName: string
): { isValid: boolean; errorMessage: string } => {
  if (!eventName) {
    return {
      isValid: false,
      errorMessage: errorMessages.mandatoryField,
    };
  } else {
    return eventNameRegex.test(eventName)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: errorMessages.invalidEventName,
        };
  }
};

const validateNumberOfGuests = (
  numberOfGuests: string
): { isValid: boolean; errorMessage: string } => {
  if (!numberOfGuests) {
    return {
      isValid: false,
      errorMessage: errorMessages.mandatoryField,
    };
  } else {
    return numberOfGuestsRegex.test(numberOfGuests)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: errorMessages.invalidNumberOfGuests,
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
        errorMessage: errorMessages.invalidDescription,
      };
};

const validateLocation = (
  location: string
): { isValid: boolean; errorMessage: string } => {
  if (!location) {
    return {
      isValid: false,
      errorMessage: errorMessages.mandatoryField,
    };
  } else {
    return locationRegex.test(location)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: errorMessages.invalidLocation,
        };
  }
};

const validateDate = (
  date: string
): { isValid: boolean; errorMessage: string } => {
  if (!date) {
    return {
      isValid: false,
      errorMessage: errorMessages.mandatoryField,
    };
  } else {
    return dateRegex.test(date)
      ? { isValid: true, errorMessage: "" }
      : {
          isValid: false,
          errorMessage: errorMessages.invalidDate,
        };
  }
};

const validateBirthday = (
  birthday: string
): { isValid: boolean; errorMessage: string } => {
  if (!birthday) {
    return {
      isValid: false,
      errorMessage: errorMessages.mandatoryField,
    };
  }
  if (!birthdayRegex.test(birthday)) {
    return {
      isValid: false,
      errorMessage: errorMessages.invalidBirthday,
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
      errorMessage: errorMessages.invalidDay,
    };
  }
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (
    age < 18 ||
    (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
  ) {
    return {
      isValid: false,
      errorMessage: errorMessages.invalidMinimumAge,
    };
  }
  return { isValid: true, errorMessage: "" };
};

const validateAge = (
  age: string
): { isValid: boolean; errorMessage: string } => {
  console.log(age);
  if (!age) {
    console.log("idade vazia");
    return {
      isValid: false,
      errorMessage: errorMessages.mandatoryField,
    };
  } else if (!ageRegex.test(age)) {
    console.log("idade invalida");
    return {
      isValid: false,
      errorMessage: errorMessages.invalidAge,
    };
  } else {
    console.log("menor de idade");
    const ageNumber = parseInt(age, 10);
    if (ageNumber < 18) {
      return {
        isValid: false,
        errorMessage: errorMessages.invalidMinimumAge,
      };
    }
    return { isValid: true, errorMessage: "" };
  }
};

const validateInstagram = (
  instagram: string
): { isValid: boolean; errorMessage: string } => {
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
  validateAge,
  validateInstagram,
};
