const DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;

function isValidDateFormat(str) {
    return DATE_REGEX.test(str);
}

module.exports = { isValidDateFormat };
