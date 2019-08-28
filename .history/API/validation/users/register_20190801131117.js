const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confPassword = !isEmpty(data.confPassword) ? data.confPassword : "";
    data.fname = !isEmpty(data.fname) ? data.fname : '';
    data.lname = !isEmpty(data.lname) ? data.lname : '';
    data.cardNumber = !isEmpty(data.cardNumber) ? data.cardNumber : '';
    data.cardExpirationDate = !isEmpty(data.cardExpirationDate) ? data.cardExpirationDate : '';
    data.cardCVV = !isEmpty(data.cardCVV) ? data.cardCVV : '';
    // Validations
    if (Validator.isEmpty(data.fname)) {
        errors.fname = "First Name field is required";
    }
    if (Validator.isEmpty(data.lname)) {
        errors.lname = "Last Name field is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.confPassword)) {
        errors.confPassword = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.confPassword)) {
        errors.confPassword = "Passwords must match";
    }
    if (Validator.isEmpty(data.cardNumber)) {
        errors.cardNumber = "Card number field is required";
    } else if (!Validator.isCreditCard(data.cardNumber)) {
        errors.cardNumber = "Please enter a valid card number";
    } else if (!Validator.isLength(data.cardNumber, { min: 16 })) {
        errors.cardNumber = "Please enter 16 digit valid card number"
    }
    if (Validator.isEmpty(data.cardExpirationDate)) {
        errors.cardExpirationDate = "Expiration field is required";
    }
    if (Validator.isEmpty(data.cardCVV)) {
        errors.cardCVV = "Cvv field is required";
    } else if (!Validator.isLength(data.cardCVV, { min: 3 })) {
        errors.cardCVV = "Please enter 3 digit number"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};