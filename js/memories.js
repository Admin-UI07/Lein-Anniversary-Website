document.addEventListener('DOMContentLoaded', () => {
 const fileInput = document.getElementById('file-input');
 const fileButton = document.getElementById('upload-button');
 const imgPreview = document.getElementById('upload-container');
 const sectionPreview = document.querySelector('.section-for-photos');

 const initDb = () => {
  return new Promise((resolve, reject) => {

    const request = indexedDB.open('imagesUploadDB', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
      }
    }

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    }

    request.onerror = (event) => {
      console.error('Error IndexedDB: ', event.target.error);
      reject(event.target.error);
    }

  });
 }

 const initialized = async () => {
  await initDb();
  await loadImgFromDb();
 }

 initialized();

 fileButton.addEventListener('click', () => {
  fileInput.click();
 });

 fileInput.addEventListener('change', (event) => {
  const files = event.target.files;

  if (files || files.length > 0) {
    processFile(files);
  }
 });

 async function processFile(files) {
  for (const file of Array.from(files)) {
    if (file.type.match('image.*')) {
      const imgSrc = await readFileAsUrl(file);
      await saveImgToDb(imgSrc);
      createImagePreview(imgSrc);
    }
  }
 }

 function readFileAsUrl(file) {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
 }

 function createImagePreview(imgSrc) {
  const imgItem = document.createElement('div');
  imgItem.className = 'preview-item';

  const img = document.createElement('img');
  img.src = imgSrc;
  img.alt = 'image';
  img.classList.add('img-item');

  imgItem.appendChild(img);
  imgPreview.appendChild(imgItem);
  updateEmptyContainerWarning();
 }

 // DATABASES (SAVING & LOADING IMAGES) ==>

  async function saveImgToDb(src) {
    return new Promise((resolve, reject) => {

      const transaction = db.transaction('images', 'readwrite');
      const store = transaction.objectStore('images');

      const request = store.add({ src });

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  }
  

  async function loadImgFromDb() {
    return new Promise((resolve, reject) => {

      const transaction = db.transaction('images', 'readonly');
      const store = transaction.objectStore('images');

      const request = store.getAll();

      request.onsuccess = () => {
        request.result.forEach(img => {
          createImagePreview(img.src);
        })
        updateEmptyContainerWarning();
        resolve();
      }

      request.onerror = (e) => reject(e.target.error);

    });
  }

  const clrButton = document.createElement('button');
  clrButton.textContent = 'clear all images';

  clrButton.addEventListener('click', async () => {
    if (confirm('are you sure about that?')) {
      await clearAllImages();
      imgPreview.innerHTML = '';
      updateEmptyContainerWarning();
    }
  });

  //document.body.appendChild(clrButton);

  async function clearAllImages() {
    return new Promise((resolve, reject) => {

      const transaction = db.transaction('images', 'readwrite');
      const store = transaction.objectStore('images');

      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e.target.error);
    });
  }

  const goBack = document.querySelector('.fa-arrow-left');

  goBack.addEventListener('click', () => {
    location.replace('main.html');
  });

  function updateEmptyContainerWarning() {
    const existingWarning = document.querySelector('.warning-board');

    if (imgPreview.children.length === 0) {
      if (!existingWarning) {
        const warningBoard = document.createElement('div');
        warningBoard.className = 'warning-board';

        const mainTextWarning = document.createElement('h1');
        mainTextWarning.textContent = 'Empty Image Container';

        const mainParagraphWarning = document.createElement('p');
        mainParagraphWarning.textContent = 'Yun lang, walang pictures mommy. Need na natin mag upload.';

        warningBoard.appendChild(mainTextWarning);
        warningBoard.appendChild(mainParagraphWarning);
        sectionPreview.appendChild(warningBoard);
      }
    } else {
      if (existingWarning) {
        existingWarning.remove();
      }
    }
  }

  // hearts falling down BG ==>

  function hearts() {
    const heartDivs = document.createElement('i');
    heartDivs.classList.add('fa-solid', 'fa-heart');

    heartDivs.style.left = Math.random() * 100 + 'vw';
    heartDivs.style.animationDuration = Math.random() * 5 + 2 + 's';

    sectionPreview.appendChild(heartDivs);

    setTimeout(() => {
      heartDivs.remove();
    }, 5000);
  }
  hearts();

  setInterval(hearts, 200);
  
});
