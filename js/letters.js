userCheck();

const goBack = document.querySelector('.fa-arrow-left');

goBack.addEventListener('click', () => {
 location.replace('index.html');
});

const uploadLetterBtn = document.querySelector('.open-modal');
const inputModalSection = document.querySelector('.input-modal-section');
const modalOverlay = document.querySelector('.modal-overlay');

uploadLetterBtn.addEventListener('click', () => {
 inputModalSection.style.display = 'flex';
 modalOverlay.style.display = 'block';
});

modalOverlay.addEventListener('click', () => {
 inputModalSection.style.display = 'none';
 modalOverlay.style.display = 'none';
});

const lettersData = JSON.parse(localStorage.getItem('lettersItem')) || [];

const lettersContainer = document.querySelector('.letters-child-container');
const titleInput = document.querySelector('.input-title');
const mainTextInput = document.querySelector('.input-main-text');
const authorInput = document.querySelector('.input-author');
const submitLetterBtn = document.querySelector('.modal-submit-btn');
const deleteAllLettersBtn = document.querySelector('.ftr-delete-all-btn');

submitLetterBtn.addEventListener('click', () => {
 addLetters();
 inputModalSection.style.display = 'none';
 modalOverlay.style.display = 'none';
});

renderLetters();
checkLetters();

function addLetters() {
 const title = titleInput.value.trim();
 const mainText = mainTextInput.value.trim();
 const author = authorInput.value.trim();

 if (!title && !mainText || !author) {
  console.log('wrong');
  return;
 }

 lettersData.push({
  title,
  mainText,
  author
 });

 localStorage.setItem('lettersItem', JSON.stringify(lettersData));

 renderLetters();
}

function renderLetters() {
 let lettersHTML = ``;

 lettersData.forEach(letters => {
  lettersHTML += `
   <div class="letter-wrapper">
    <div class="input-box">
     <i class="fa-solid fa-square-minus"></i>
     <h2 class="letter-title">Title: <span>${letters.title}</span></h2>
    </div>
    <div class="input-box-main-text">
     <p class="letter-main-text">${letters.mainText}</p>
    </div>
    <div class="input-box">
     <h4 class="letter-author">Author: <span>${letters.author}</span></h4>
    </div>
   </div>
  `;
 });

 lettersContainer.innerHTML = lettersHTML;

 document.querySelectorAll('.fa-square-minus').forEach((deleteBtn, index) => {
  deleteBtn.addEventListener('click', () => {
   lettersData.splice(index, 1);
   localStorage.setItem('lettersItem', JSON.stringify(lettersData));
   renderLetters();
   checkLetters();
  });
 });

 console.log(lettersHTML);
}

function checkLetters() {
 if (!lettersData.length) {
  const warningBoard = document.createElement('div');
  warningBoard.className = 'warning-board';

  const mainTextWarning = document.createElement('h1');
  mainTextWarning.textContent = 'Aray ko! Walang letters.';

  const mainParagraphWarning = document.createElement('p');
  mainParagraphWarning.textContent = 'Yun lang, walang Letters mommy. Need na natin mag upload.';

  warningBoard.appendChild(mainTextWarning);
  warningBoard.appendChild(mainParagraphWarning);
  lettersContainer.appendChild(warningBoard);

  return;
 }
}

const footerCtr = document.querySelector('.footer-container');
const footerNav = Array.from(footerCtr.querySelectorAll('.ftr-nav')).map(ftr_nav => ({
  ftr_nav
}));
  

footerNav.forEach(navBtn => {
 navBtn.ftr_nav.addEventListener('click', () => {
  const navName = navBtn.ftr_nav.textContent.toLowerCase();
  if (navName === 'home') {
   window.location.replace('index.html');
   return;
  }
  window.location.replace(`${navName}.html`);
 });
});

deleteAllLettersBtn.addEventListener('click', () => {
 if (confirm('Are you sure?')) {
  localStorage.removeItem('lettersItem');
  lettersData.length = 0;
  renderLetters(); // Update the UI
  checkLetters();
 }
});

function userCheck() {
 if (localStorage.getItem('authenticated') !== 'true') {
  window.location.replace('login-page.html');
  return;
 }
}