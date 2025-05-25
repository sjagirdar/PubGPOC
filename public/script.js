const imgA = document.getElementById('imgA');
const imgB = document.getElementById('imgB');
const button = document.getElementById('next-btn');

let currentIndex = 1;
const maxImages = 18;

let activeImg = imgA;
let hiddenImg = imgB;

// Returns path to image file
function getImagePath(index) {
  return `/images/set2/${index}.png`;
}

// Preload image and call callback when loaded
function preloadImage(imgElement, index, callback) {
  const temp = new Image();
  temp.onload = () => {
    imgElement.src = temp.src;
    callback();
  };
  temp.src = getImagePath(index);
}

// Load and transition to next image
function switchToNextImage() {
  const nextIndex = (currentIndex % maxImages) + 1;

  preloadImage(hiddenImg, nextIndex, () => {
    hiddenImg.classList.add('visible');
    activeImg.classList.remove('visible');

    // Swap references
    const temp = activeImg;
    activeImg = hiddenImg;
    hiddenImg = temp;

    currentIndex = nextIndex;
  });
}

// Initial load
function init() {
  preloadImage(activeImg, currentIndex, () => {
    activeImg.classList.add('visible');
  });
}

button.addEventListener('click', switchToNextImage);
init();
