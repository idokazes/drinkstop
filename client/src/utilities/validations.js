import {
  ALLOWED_EXTENSIONS,
  MIN_EMAIL_LENGTH,
  MIN_FULL_NAME_LENGTH,
} from "../constants";

export const validateFile = (file) => {
  const extension = file.name.split(".").pop();
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return "File type not allowed. Please upload a png or jpg file.";
  }
};

export function validateFullName(fullName) {
  if (fullName.length < MIN_FULL_NAME_LENGTH) {
    return `Full name must be at least ${MIN_FULL_NAME_LENGTH} characters long.`;
  }
}

export const validateEmail = (email) => {
  if (email.length < MIN_EMAIL_LENGTH) {
    return `Email must be at least ${MIN_EMAIL_LENGTH} characters long.`;
  }

  if (email.indexOf("@") === -1) {
    return "Email must contain @.";
  }

  if (email.indexOf(".") === -1) {
    return `Email must contain "."`;
  }
};

export const validatePhone = (phone) => {
  if (phone.length < 10) {
    return "Phone number must be at least 10 characters long.";
  }
};

export const validateAddress = (address) => {
  if (address.length < 3) {
    return "Address must be at least 3 characters long.";
  }
};

export const validatePassword = (password) => {
  const regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d.*\\d.*\\d.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
  );

  if (!regex.test(password)) {
    return "Password must contain at least 8 characters, one uppercase, one lowercase, at least 4 digits and one special case character";
  }
};
