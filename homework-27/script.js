const SLIDER_WIDTH = 500;
const imageList = [
    'img/SkebobOrigin.jpg',
    'img/nash_kozak.png',
    'img/FeikaWatWasZet.avif',
    'img/SkebobGold.webp',
    'img/SkebobOrigin.jpg'
]
const SLIDES_COUNT = imageList.length;
const PLAY_TIMEOUT_SEC = 3;
const SWIPE_THRESHOLD = 80;

const slider = document.querySelector('.slider');
const leftArrow = document.querySelector('.slider-nav.slider-left');
const rightArrow = document.querySelector('.slider-nav.slider-right');
const sliderLine = document.querySelector('.slider-line');
const dotsContainer = document.querySelector('.slider-dots')
const playBtn = document.getElementById('playButton')
const pauseBtn = document.getElementById('pauseButton')

let currentSlide = 0;
let intervalTimer;
let dots = [];
let isSwiping = false;
let startX = 0;
let currentTranslate = 0;

init();

function init() {
   createImages();
   createDots();
   setActiveDot(0);

    leftArrow.addEventListener('click', leftClickHandler);
    rightArrow.addEventListener('click', rightClickHandler);

    document.body.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') leftClickHandler();
    else if (e.key === 'ArrowRight') rightClickHandler();
    });

    intervalTimer = setInterval(rightClickHandler, PLAY_TIMEOUT_SEC * 1000);
    playBtn.addEventListener('click', playHandler);
    pauseBtn.addEventListener('click', pauseHandler);

    sliderLine.addEventListener('touchstart', touchStartHandler, { passive: true });
    sliderLine.addEventListener('touchmove', touchMoveHandler, { passive: true });
    sliderLine.addEventListener('touchend', touchEndHandler);
}

function createImages() {
  let generatedHtml = '';
  imageList.forEach(imgStr => {
    generatedHtml = generatedHtml + `<img src="${imgStr}" alt="${imgStr}">`
  });
  generatedHtml = generatedHtml + `<img src="${imageList[0]}" alt="${imageList[0]}">`
  sliderLine.innerHTML = generatedHtml;
}

function createDots(){
    dotsContainer.innerHTML = '';
    dots = [];
    for (let i =0; i < SLIDES_COUNT - 1; i++){
        const dot = document.createElement('div');
        dot.className = 'slider-dot';
        dot.addEventListener('click', () => {
            currentSlide = i;
            moveToSlide(currentSlide);
            setActiveDot(i);
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
    }
}

function setActiveDot(index){
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function leftClickHandler() {

    if (currentSlide === 0) {
        currentSlide = SLIDES_COUNT - 1;
        silentlyMoveToSlide(currentSlide);
        currentSlide = SLIDES_COUNT - 2;
        moveToSlide(currentSlide);
    }
    else {
        currentSlide--;
        moveToSlide(currentSlide)
    }

}

function rightClickHandler() {
    currentSlide = currentSlide + 1;
    if (currentSlide === SLIDES_COUNT - 1) {
        moveToSlide(currentSlide)
        setTimeout(()=> {
            currentSlide = 0;
            silentlyMoveToSlide(currentSlide);
        }, 500)
    } else
        moveToSlide(currentSlide)

}

function moveToSlide(slide) {
    sliderLine.style.transform = `translate(${slide * -SLIDER_WIDTH}px)`;
    setActiveDot(slide % (SLIDES_COUNT - 1));
}

function silentlyMoveToSlide(slide) {
    sliderLine.classList.remove('slow-switch');
    sliderLine.style.transform = `translate(${slide * -SLIDER_WIDTH}px)`;
    sliderLine.offsetHeight; 
    sliderLine.classList.add('slow-switch');
}

function pauseHandler(){
    if(intervalTimer){
        clearInterval(intervalTimer);
        intervalTimer = null;
    }
}

function playHandler(){
    if (!intervalTimer){
        intervalTimer = setInterval(rightClickHandler, PLAY_TIMEOUT_SEC * 1000);
    }
}

function touchStartHandler(e) {
  startX = e.touches[0].clientX;
  isSwiping = true;
  pauseHandler();
  sliderLine.classList.remove('slow-switch');
  currentTranslate = -currentSlide * SLIDER_WIDTH;
}

function touchMoveHandler(e) {
  if (!isSwiping) return;
  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;
  sliderLine.style.transform = `translateX(${currentTranslate + diff}px)`;
}

function touchEndHandler(e) {
  if (!isSwiping) return;
  isSwiping = false;
  sliderLine.classList.add('slow-switch');

  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (Math.abs(diff) > SWIPE_THRESHOLD) {
    if (diff < 0) {
      rightClickHandler();
    } else {
      leftClickHandler();
    }
  } else {
    moveToSlide(currentSlide);
  }
}
