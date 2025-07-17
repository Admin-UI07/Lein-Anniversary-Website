if (localStorage.getItem('authenticated') === 'true') {
 window.location.replace('index.html');
}

const POSSIBLE_BONDS = ['Kumain', 'Gumala', 'Eating', 'Sumimba', 'Church', 'Pray', 'Talk about God'].map(item => item.toLowerCase());
const SECRET_DATE = '2023-07-21';

const signFail = document.querySelector('.sign-fail');
const warningAuth = document.querySelector('.warning-auth');
const warn = document.querySelector('.warn');
const logInForm = document.querySelector('.logIn-Form');

let timeoutId;

logInForm.addEventListener('submit', (event) => {

 event.preventDefault();

 const date = document.querySelector('.js-date').value;
 const favouriteBond = document.querySelector('.js-bond').value.trim().toLowerCase();

 if (!date || !favouriteBond) {
  showError('Please fill all the field.');
  return;
 }

 const isValidBond = POSSIBLE_BONDS.includes(favouriteBond);
 const isCorrectDate = date === SECRET_DATE;

 if (isValidBond && isCorrectDate) {
  localStorage.setItem('authenticated', 'true');
  window.location.replace('index.html');
 } else {
  showError('Mali Mommy!');
 }

 logInForm.reset();
});

function showError(message) {

 if (timeoutId) {
  clearTimeout(timeoutId);
 }

 signFail.classList.add('sign-failed');
 warningAuth.classList.add('warning-authen');
 warn.innerText = message;

 timeoutId = setTimeout(() => {
  signFail.classList.remove('sign-failed');
  warningAuth.classList.remove('warning-authen');
  warn.innerText = '';
 }, 3000);
}


// Curved Text

new CircleType(document.querySelector('.curved-title'))
 .radius(2000);