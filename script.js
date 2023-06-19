const form = document.querySelector('.calculator__form');

const dayError = document.querySelector('.day__input-error');
const monthError = document.querySelector('.month__input-error');
const yearError = document.querySelector('.year__input-error');
const error = document.querySelectorAll('.error');
let validationError = true;

// display custom error to user

const showError = (inputField, message) => {
  inputField.textContent = message;
  inputField.parentElement.classList.add('active');
};

// remove previous error if any
const hideError = () => {
  error.forEach((el) => {
    el.textContent = '';
    el.parentElement.classList.remove('active');
  });
};

// check is input field is empty or not

const checkInputEmpty = (day, month, year) => {
  hideError();
  if (day.length > 0) {
    validationError = false;
  }
  if (day === '') {
    showError(dayError, 'This field is required');
  }
  if (month === '') {
    showError(monthError, 'This field is required');
  }
  if (year === '') {
    showError(yearError, 'This field is required');
  }

  return validationError;
};

// if input field not empty then check is day in valid format

const checkIsDayValid = (day, month, year) => {
  if (month.length === 0 && day < 1 && day > 31) {
    showError(dayError, 'Must be a valid date');
    validationError = true;
    return;
  }

  let leapYear = year % 400 === 0 || (year % 100 != 0 && year % 4 == 0);

  const maxDaysInMonth = [
    31,
    leapYear ? 29 : 28,
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
  if (
    day >= 1 &&
    day <= 31 &&
    day <= maxDaysInMonth[month > 12 ? 0 : month - 1]
  ) {
    validationError = false;
  } else {
    showError(dayError, 'Must be a valid date');
    validationError = true;
  }
  return validationError;
};

const isMonthValid = (month) => {
  if (month.length === 0) return;
  if (month > 12 || month < 1) {
    showError(monthError, 'Must be a valid month');
    validationError = true;
  }
};

const isYearValid = (year) => {
  if (year.length === 0) return;
  const currentYear = new Date(Date.now()).getFullYear();
  if (year > currentYear) {
    showError(yearError, 'Must be in past');
    validationError = true;
  }
  if (year.length < 4) {
    showError(yearError, 'Enter year in 4 digit');
    validationError = true;
  }
};

// Display age to user
const showAgeOutput = (year, month, day) => {
  const resultDiv = document.querySelector('.calculator__result');
  resultDiv.classList.add('animate');
  const yearEl = document.querySelector('.age-year');
  const monthEl = document.querySelector('.age-month');
  const dayEl = document.querySelector('.age-day');

  yearEl.textContent = year;
  monthEl.textContent = month;
  dayEl.textContent = day;
};

// Event Listener
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    // user click on submit button or press enter
    if (e.type === 'submit' || e.key === 'enter') {
      // check is input field empty or not
      if (!checkInputEmpty(day, month, year)) {
        checkIsDayValid(day, month, year);
      }
      isMonthValid(month);
      isYearValid(year);

      // check age if there no validation error
      if (!validationError) {
        const date = new Date(Date.now()).toString();
        const timeZone = date.split(' ')[6];

        const convertDateToEpoch = Date.parse(
          `${year}-${month}-${day} ${timeZone}`
        );

        const userCurrentAge = new Date() - convertDateToEpoch;

        const ageDate = new Date(userCurrentAge);
        const ageYear = ageDate.getUTCFullYear() - 1970;
        const ageMonth = ageDate.getUTCMonth();
        const ageDay = ageDate.getUTCDate() - 1;
        showAgeOutput(ageYear, ageMonth, ageDay);
      }
    }
  });
}
