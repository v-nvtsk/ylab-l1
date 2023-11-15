/* eslint-disable import/extensions */
import fetch from './fetch.js';
import { isValidEmail, isValidPassword } from './validation.js';

function clearForm(form) {
  [...form.elements].forEach((element) => {
    // eslint-disable-next-line no-param-reassign
    if (element.name) element.value = '';
  });
}

const resetElementValidity = (el) => {
  el.classList.remove('valid');
  el.classList.remove('invalid');
};

export function setElementValidationState(element, isValidState) {
  const setElementValid = (el) => {
    el.classList.remove('invalid');
    el.classList.add('valid');
  };

  const setElementInvalid = (el) => {
    el.classList.remove('valid');
    el.classList.add('invalid');
  };

  if (element.value === '') {
    resetElementValidity(element);
  } else if (isValidState) {
    setElementValid(element);
  } else {
    setElementInvalid(element);
  }
  return element;
}

export function validateInputOnFocusLost(element, validationFunction) {
  element.addEventListener('blur', (event) => {
    const isValid = validationFunction(event.target.value);
    setElementValidationState(event.target, isValid);
  });
}
export function resetValidationOnInput(form) {
  form.addEventListener('input', (event) => {
    resetElementValidity(event.target);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const emailInput = document.querySelector('#email-input');
  const passwordInput = document.querySelector('#password-input');
  const submitBtn = document.querySelector('.form__submit-btn');

  validateInputOnFocusLost(emailInput, isValidEmail);
  validateInputOnFocusLost(passwordInput, isValidPassword);

  resetValidationOnInput(form);

  submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!isValidEmail(email) || !isValidPassword(password)) {
      return;
    }
    form.classList.add('loading');
    const response = await fetch('https://useanyurl.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();
    clearForm(form);
    form.classList.remove('loading');
    if (!data.error) {
      form.style.display = 'none';
      document.querySelector('h1').innerHTML = 'Signed in successfully';
    }
  });
});
