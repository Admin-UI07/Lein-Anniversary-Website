checkUser();

let navBar = document.querySelector('.js-navbar');

showNav();

function showNav() {
 const navBarHTML = `
  <div class="nav">
      <div class="logo">
        <img src="img/leo-shine-logo.png" alt="image-logo">
      </div>

      <div class="menu">
        <li class="menu-nav">HOME</li>
        <li class="menu-nav">MEMORIES</li>
        <li class="menu-nav">LETTERS</li>
      </div>

      <div class="bars-menu-btn">
        <i class="fa-solid fa-bars"></i>
        <i class="fa-solid fa-xmark"></i>
      </div>
      
      <div class="log-out">
        <button class="log-out-btn js-log-out-btn">Exit</button>
        <i class="fa-solid fa-right-from-bracket"></i>
      </div> 
    </div>
 `;

 navBar.innerHTML = navBarHTML;
}

const logOutButton = document.querySelector('.js-log-out-btn');

logOutButton.addEventListener('click', () => {
  localStorage.removeItem('authenticated');
  window.location.replace('login-page.html');
});

const menuItem = document.querySelectorAll('.menu-nav');

menuItem.forEach(item => {
  item.addEventListener('click', () => {
    const text = item.textContent.trim();

    if (text === 'HOME') {
      window.location.replace('index.html');
    } else if (text === 'MEMORIES') {
      window.location.replace('memories.html');
    } else if (text === 'LETTERS') {
      window.location.replace('letters.html');
    }
  });
});

function checkUser() {
  if (localStorage.getItem('authenticated') !== 'true') {
    window.location.replace('login-page.html');
  }
}

const showMenu = (toggleId, navId) => {
  const toggle = document.querySelector(toggleId);
  const nav = document.querySelector(navId);

  toggle.addEventListener('click', () => {
    nav.classList.toggle('show-menu');

    toggle.classList.toggle('show-x-bars');
  });
}

showMenu('.bars-menu-btn', '.menu');