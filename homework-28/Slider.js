const SLIDER_WIDTH = 500;
const PLAY_TIMEOUT_SEC = 3;
const SWIPE_THRESHOLD = 80;

export class Slider {
    imageList = [];

    constructor(sliderId, imageList) {
        if (!sliderId) {
            throw new Error(`First slider parameter must be sliderId`);
        }
        if (!Array.isArray(imageList) || imageList.length === 0) {
            throw new Error(`There are no images in slider`);
        }
        this.imageList = imageList;
        this.slider = document.getElementById(sliderId);
        if (!this.slider) {
            throw new Error(`Slider can't find element with Id: ${sliderId}`);
        }

        this.currentSlide = 0;
        this.intervalTimer;
        this.dots = [];
        this.isSwiping = false;
        this.startX = 0;
        this.currentTranslate = 0;

        this.createHTML();
        this.getElementsFromPage();

        this.init();
    }

    init() {
        this.createImages();
        this.createDots();
        this.setActiveDot(0);

        this.leftArrow.addEventListener('click', this.leftClickHandler.bind(this));
        this.rightArrow.addEventListener('click', this.rightClickHandler.bind(this));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.leftClickHandler();
            else if (e.key === 'ArrowRight') this.rightClickHandler();
        });

        this.intervalTimer = setInterval(this.rightClickHandler.bind(this), PLAY_TIMEOUT_SEC * 1000);
        this.playBtn.addEventListener('click', this.playHandler.bind(this));
        this.pauseBtn.addEventListener('click', this.pauseHandler.bind(this));

        this.sliderLine.addEventListener('touchstart', this.touchStartHandler.bind(this), { passive: true });
        this.sliderLine.addEventListener('touchmove', this.touchMoveHandler.bind(this), { passive: true });
        this.sliderLine.addEventListener('touchend', this.touchEndHandler.bind(this));
    }

    getElementsFromPage() {
        this.leftArrow = this.slider.querySelector('.slider-nav.slider-left');
        this.rightArrow = this.slider.querySelector('.slider-nav.slider-right');
        this.sliderLine = this.slider.querySelector('.slider-line');
        this.dotsContainer = this.slider.querySelector('.slider-dots')
        this.playBtn = this.slider.querySelector('.playButton')
        this.pauseBtn = this.slider.querySelector('.pauseButton')
    }

    createHTML() {
        this.slider.classList.add('slider-container');
        this.slider.innerHTML = `<div class="slider">
            <div class="slider-viewport">
                <div class="slider-line slow-switch"></div>
            </div>

            <div class="slider-nav slider-left"></div>
            <div class="slider-nav slider-right"></div>
            <div class="slider-dots"></div>
        </div> 
        <div class="btn-container">
            <button class="playButton">Play</button>
            <button class="pauseButton">Pause</button>
        </div>`
    }

    createImages() {
        let generatedHtml = '';
        this.imageList.forEach(imgStr => {
            generatedHtml = generatedHtml + `<img src="${imgStr}" alt="${imgStr}">`
        });
        generatedHtml = generatedHtml + `<img src="${this.imageList[0]}" alt="${this.imageList[0]}">`
        this.sliderLine.innerHTML = generatedHtml;
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.imageList.length - 1; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dot';
            dot.addEventListener('click', () => {
                this.currentSlide = i;
                this.moveToSlide(this.currentSlide);
                this.setActiveDot(i);
            });
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        }
    }

    setActiveDot(index) {
        this.dots.forEach(dot => dot.classList.remove('active'));
        this.dots[index].classList.add('active');
    }

    leftClickHandler() {
        if (this.currentSlide === 0) {
            this.currentSlide = this.imageList.length - 1;
            this.silentlyMoveToSlide(this.currentSlide);
            this.currentSlide = this.imageList.length - 2;
            this.moveToSlide(this.currentSlide);
        }
        else {
            this.currentSlide--;
            this.moveToSlide(this.currentSlide)
        }
    }

    rightClickHandler() {
        this.currentSlide = this.currentSlide + 1;
        if (this.currentSlide === this.imageList.length - 1) {
            this.moveToSlide(this.currentSlide)
            setTimeout(() => {
                this.currentSlide = 0;
                this.silentlyMoveToSlide(this.currentSlide);
            }, 500)
        } else
            this.moveToSlide(this.currentSlide);

    }

    pauseHandler() {
        if (this.intervalTimer) {
            clearInterval(this.intervalTimer);
            this.intervalTimer = null;
        }
    }

    playHandler() {
        if (!this.intervalTimer) {
            this.intervalTimer = setInterval(this.rightClickHandler.bind(this), PLAY_TIMEOUT_SEC * 1000);
        }
    }

    touchStartHandler(e) {
        this.startX = e.touches[0].clientX;
        this.isSwiping = true;
        this.pauseHandler();
        this.sliderLine.classList.transition = 'none';
        this.currentTranslate = -this.currentSlide * SLIDER_WIDTH;
    }

    touchMoveHandler(e) {
        if (!this.isSwiping) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - this.startX;
        this.sliderLine.style.transform = `translateX(${this.currentTranslate + diff}px)`;
    }

    touchEndHandler(e) {
        if (!this.isSwiping) return;
        this.isSwiping = false;
        this.sliderLine.classList.add('slow-switch');

        const endX = e.changedTouches[0].clientX;
        const diff = endX - this.startX;

        if (Math.abs(diff) > SWIPE_THRESHOLD) {
            if (diff < 0) {
                this.rightClickHandler();
            } else {
                this.leftClickHandler();
            }
        } else {
            this.moveToSlide(this.currentSlide);
        }
    }

    moveToSlide(slide) {
        this.sliderLine.style.transform = `translate(${slide * -SLIDER_WIDTH}px)`;
        this.setActiveDot(this.currentSlide % (this.imageList.length - 1));
    }

    silentlyMoveToSlide(slide) {
        this.sliderLine.classList.remove('slow-switch');
        this.sliderLine.style.transform = `translate(${slide * -SLIDER_WIDTH}px)`;
        this.sliderLine.offsetHeight;
        this.sliderLine.classList.add('slow-switch');
    }
}