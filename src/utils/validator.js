
const validateFromRules = (value, validationRules) => {
  let errorMessage = ''; // Initialize empty error message string

  for (const ruleName in validationRules) {
    const ruleValue = validationRules[ruleName];
        
    // Check for required field
    if (ruleName === 'required' && ruleValue === true && !value) {
      errorMessage += 'This field is required.\n'; // Add error message with newline
    } else if (value) { // Only validate if there's a value (skips empty optional fields)
      // Check for email type
      if (ruleName === 'email' && ruleValue === true && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMessage += 'Invalid email format.\n';
      } else if (ruleName === 'phone' && ruleValue === true) {
        const phoneRegex = /^\d{10}$/; // Example for 10-digit phone numbers
        if (!phoneRegex.test(value)) {
          errorMessage += 'Invalid phone number format.\n';
        }
      } else if (ruleName === 'identification' && ruleValue === true) {
        const dniRegex = /^\d{8}[A-Z]$/; // Example for Spanish DNI (8 digits + letter)
        const passportRegex = /^[A-Z]{1}\d{7}$/; // Example for simple Passport format (letter + 7 digits)
        if (!dniRegex.test(value) && !passportRegex.test(value)) {
          errorMessage += 'Invalid identification format (DNI or Passport expected).\n';
        }
      } else if (ruleName === 'date' && ruleValue === true) {
        let responseDateValidator = validateDate(value);
        if (responseDateValidator !== '') {
          errorMessage += responseDateValidator;
        }
      }
    }
  }
  
    return {
        isValid: errorMessage.trim().length === 0,
        message: errorMessage.trim()
    } // Return true if no errors
};

const validateDate = (value) => {
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  if (!dateRegex.test(value)) {
    return 'Invalid date format (YYYY-MM-DD expected).';
  }

  const [year, month, day] = value.split('-');
  const yearNumber = parseInt(year);
  const monthNumber = parseInt(month);
  const dayNumber = parseInt(day);

  // Check for valid year
  if (yearNumber < 1 || yearNumber > 9999) {
    return 'Invalid year.';
  }

  // Check for valid month (considering leap years)
  const maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (monthNumber < 1 || monthNumber > 12) {
    return 'Invalid month.';
  } else if (monthNumber === 2 && isLeapYear(yearNumber) && dayNumber > 29) {
    return 'Invalid day for February in a leap year.';
  } else if (dayNumber < 1 || dayNumber > maxDaysInMonth[monthNumber - 1]) {
    return 'Invalid day for the specified month.';
  }

  return ''; // Date is valid
};

const isLeapYear = (year) => {
  if (year % 4 !== 0) return false;
  if (year % 100 === 0 && year % 400 !== 0) return false;
  return true;
};

module.exports = {
    validateFromRules,
    validateDate
};