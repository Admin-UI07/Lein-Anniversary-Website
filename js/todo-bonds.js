userCheck();

const todoData = JSON.parse(localStorage.getItem('todoItems')) || [];
const addButton = document.querySelector('.js-add-button');
const todoWarning = document.querySelector('.todo-warning-display');
const todoDisplayHide = document.querySelector('.todo-display-section');
let warnText = '<img class="lonely-gif" src="/img/lonely.gif" alt=""><p class="warn-text">Empty Activities</p>';
const arrowBack = document.querySelector('.fa-arrow-left');

addButton.addEventListener('click', () => {
    getTodoList();
  });

if (!todoData.length) {
  todoWarning.classList.add('active');
  todoWarning.innerHTML = warnText;
  todoDisplayHide.classList.add('hide');
}

renderToDoList();

function renderToDoList() {
  let todoListHTML = ``;
  todoData.forEach(bond => {

    const html = `
    <div class="display-bond">
      <p>${bond.name}</p>
      <p>${bond.date}</p>
      <p>${bond.time}</p>
      <button class="js-done-button">DONE</button>
    </div>
    `;

  todoListHTML += html;
  });

  document.querySelector('.todo-display-section').innerHTML = todoListHTML;

  document.querySelectorAll('.js-done-button')
    .forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoData.splice(index, 1);
      localStorage.setItem('todoItems', JSON.stringify(todoData));
      renderToDoList();
      if (!todoData.length) {
        todoWarning.classList.add('active');
        todoWarning.innerHTML = warnText;
        todoDisplayHide.classList.add('hide');
      }
    });
  });
}

const todoName = document.querySelector('.js-input-bond');
const todoDate = document.querySelector('.js-date-bond');
const todoTime = document.querySelector('.js-time-bond');

newMinimumDate();

function newMinimumDate() {
  const thisYear = new Date().toISOString().split('T')[0];
  todoDate.min = thisYear;
}

function getTodoList() {
  const name = todoName.value.trim();
  const date = todoDate.value;

  const test = date.split('-');
  const thisYear = new Date().getFullYear();

  const [hours, minutes] = todoTime.value.split(':').map(Number);
  const hours12 = hours % 12 || 12;
  const amPm = hours >= 12 ? 'PM' : 'AM';

  const time = `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${amPm}`;

  if (!name || !date || !time || Number(test[0]) < thisYear) {
    console.log('Wrong');
    return;
  }

  todoData.unshift({
    name,
    date,
    time
  });

  localStorage.setItem('todoItems', JSON.stringify(todoData));

  todoWarning.classList.remove('active');
  todoWarning.innerHTML = '';
  todoDisplayHide.classList.remove('hide');

  todoName.value = '';
  todoDate.value = '';

  renderToDoList();
}

const savedData = JSON.parse(localStorage.getItem('todoSettings'));

if (savedData) {
  document.querySelector('.img-top').src = savedData.image;
  document.querySelector('.todo-title').textContent = savedData.title;
  document.querySelector('title').textContent = `Bond-Activity | ${savedData.title}?`;
  todoName.value = savedData.title
}

arrowBack.addEventListener('click', () => {
  location.replace('index.html');
})

function userCheck() {
  if (localStorage.getItem('authenticated') !== 'true') {
    window.location.replace('login-page.html');
    return;
  }
}