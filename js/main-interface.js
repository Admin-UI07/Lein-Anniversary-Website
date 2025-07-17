const audioPLayers = Array.from(document.querySelectorAll('.music-boxes')).map(box => ({
  element: box,
  audio: box.querySelector('audio'),
  button: box.querySelector('.play-buttons')
}));

let currentAudio;

audioPLayers.forEach(player => {
  player.button.addEventListener('click', () => {
    if (currentAudio === player.audio && !player.audio.paused) {
      pauseAudio(player);
      return;
    }

    audioPLayers.forEach(p => {
      if (p !== player) {
        pauseAudio(p);
      }
    });

    
    playAudio(player);
  });
});

function pauseAudio(player) {
  player.audio.pause();
  player.audio.currentTime = 0;
  player.button.classList.remove('show-play-pause');
  player.element.classList.remove('active');
  currentAudio = null;
}

function playAudio(player) {
  player.audio.play();
  player.button.classList.add('show-play-pause');
  player.element.classList.add('active');
  currentAudio = player.audio;
}

const todoBond = Array.from(document.querySelectorAll('.todo-boxes')).map(bond => ({
  box: bond,
  todoImg: bond.querySelector('img').src,
  todoTitle: bond.querySelector('h2').textContent
}));

todoBond.forEach(bonding => {
  bonding.box.addEventListener('click', () => {
    localStorage.setItem('todoSettings', JSON.stringify({
      image: bonding.todoImg,
      title: bonding.todoTitle
    }));
    window.location.replace('todo-bonds.html');
  });
});

// img-puzzle ==>

onload = resetImage();

document.querySelector('.reset-img-puzzle')
  .addEventListener('click', () => {
    onload = resetImage();
  });

function resetImage() {
  let parent = document.querySelector('.js-puzzle-container');
  let frag = document.createDocumentFragment();

  while (parent.children.length) {
    frag.appendChild(parent.children[Math.floor(Math.random() * parent.children.length)]);
  }
  
  parent.appendChild(frag);
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
}

// Dream House Section ==>

const dreamHouseButton = document.querySelector('.click-me-dh-house');
const dreamHouseAddActive = document.querySelector('.dh-image');

dreamHouseButton.addEventListener('click', () => {
  dreamHouseAddActive.classList.add('active');
  dreamHouseButton.classList.add('remove');
});