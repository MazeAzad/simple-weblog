// prettier-ignore
const registerValidationObject = {
  firstName: {
    minLenght: 3,
    maxLength: 100,
    patternMatch1:/\d|\s/,
    patternMatch2:/[@|#|$|%|^|\*|\(|\)|.|<|>|~|\{|\}|\?|,|]/,
    errors:[]
  },
  lastName: {
    minLenght: 3,
    maxLength: 100,
    patternMatch1:/\d|\s/,
    patternMatch2:/[@|#|$|%|^|\*|\(|\)|.|<|>|~|\{|\}|\?|,|]/,
    errors:[]
  },
  email: {
    patternMatch:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    errors:[]
  },
  password: {
    minLenght: 6,
    maxLength: 100,
    patternMatch:/\s/,
    errors:[]
  },
  confirmPassword:{
    errors:[]
  }
};
function validationCheck(
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) {
  registerValidationObject.firstName.errors = [];
  registerValidationObject.lastName.errors=[];
  registerValidationObject.email.errors=[];
  registerValidationObject.password.errors=[];
  registerValidationObject.confirmPassword.errors=[];
  function firstNameCheck(firstName) {
    if (firstName.length < registerValidationObject.firstName.minLenght) {
      registerValidationObject.firstName.errors.push(
        "first name must be at least 3 characters"
      );
    }
    if (firstName.length > registerValidationObject.firstName.maxLength) {
      registerValidationObject.firstName.errors.push(
        "first name must be at most 100 characters"
      );
    }
    if ( registerValidationObject.firstName.patternMatch1.test(firstName))  {
        registerValidationObject.firstName.errors.push(
          "firs name must not have white space or numbers"
        );
    if(!(registerValidationObject.firstName.patternMatch2.test(firstName))){
      registerValidationObject.firstName.errors.push("first name must not have special character");
    }
    }
  }
  function lastNameCheck(lastName) 
  {
    if (lastName.length < registerValidationObject.lastName.minLenght) {
      registerValidationObject.lastName.errors.push(
        "last name must be at least 3 characters"
      );
    }
    if (lastName.length > registerValidationObject.lastName.maxLength) {
      registerValidationObject.lastName.errors.push(
        "last name must be at most 100 characters"
      );
    }
    if ( registerValidationObject.lastName.patternMatch1.test(lastName)) {
      registerValidationObject.lastName.errors.push(
        "last name must not have white space and numbers"
      );
    }
    if(registerValidationObject.lastName.patternMatch2.test(lastName)){
      registerValidationObject.lastName.errors.push("last name must not have special character");
    }
  }

  function emailCheck(email) {
    if (!registerValidationObject.email.patternMatch.test(email)) {
      registerValidationObject.email.errors.push("Email is not valid");
    }
  }
  function passwordCheck(password) {
    if (password.length < registerValidationObject.password.minLenght) {
      registerValidationObject.password.errors.push(
        "password must be at least 6 characters"
      );
    }
    if (password.length > registerValidationObject.password.maxLength) {
      registerValidationObject.password.errors.push(
        "password must be at most 100 characters"
      );
    }
    if(registerValidationObject.password.patternMatch.test(password)){
      registerValidationObject.password.errors.push("password must not have white space");
    }
  }
  function confirmPasswordCheck(confirmPassword) {
    if (confirmPassword !== password) {
      registerValidationObject.confirmPassword.errors.push(
        "confirm passowrd does not match"
      );
    }
  }
  firstNameCheck(firstName);
  lastNameCheck(lastName);
  emailCheck(email);
  passwordCheck(password);
  confirmPasswordCheck(confirmPassword);
  if (registerValidationObject.firstName.errors.length > 0) {
    return registerValidationObject.firstName.errors;
  }
  if (registerValidationObject.lastName.errors.length > 0) {
    return registerValidationObject.lastName.errors;
  }
  if (registerValidationObject.email.errors.length > 0) {
    return registerValidationObject.email.errors;
  }
  if (registerValidationObject.password.errors.length > 0) {
    return registerValidationObject.password.errors;
  }
  if (registerValidationObject.confirmPassword.errors.length > 0) {
    return registerValidationObject.confirmPassword.errors;
  }
    return [];
 }

module.exports = validationCheck;
