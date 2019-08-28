const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateUpdateInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.fname = !isEmpty(data.fname) ? data.fname : '';
    data.lname = !isEmpty(data.lname) ? data.lname : '';
    data.email = !isEmpty(data.email) ? data.email : "";
    data.cardNumber = !isEmpty(data.cardNumber) ? data.cardNumber : '';
    data.cardExpirationDate = !isEmpty(data.cardExpirationDate) ? data.cardExpirationDate : '';
    data.cardCVV = !isEmpty(data.cardCVV) ? data.cardCVV : '';
    // Email checks
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