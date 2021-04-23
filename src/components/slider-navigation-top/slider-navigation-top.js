import Swiper from 'swiper/dist/js/swiper.min';
import Component from '../../common/js/component';

class SliderNavigationTop extends Component {
    constructor(nRoot) {
        super(nRoot, 'slider-navigation-top');
        this.swiper = new Swiper(this.nRoot, {
            slideToClickedSlide: true,
            touchRatio: 0.2,
            freeMode: true,
            freeModeSticky: true,
            slidesPerView: 'auto',
            // nested: true,
            longSwipes: false,
            observer: true,
            observeParents: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            init: false,
            speed: 400,
        });
        this.swiper.init();

        // убираем половинки слов в навигации
        const updateGrid = () => {
            if (this.swiper.snapGrid > this.swiper.slidesGrid) {
                const length = this.swiper.snapGrid.length - this.swiper.slidesGrid.length;
                this.swiper.snapGrid.splice(this.swiper.snapGrid.length - length, length);
            }

            const lastGrid = this.swiper.slidesGrid[this.swiper.snapGrid.length - 1];

            this.swiper.snapGrid.pop();
            this.swiper.snapGrid.push(lastGrid);
        };

        this.swiper.on('slideNextTransitionEnd', () => {
            updateGrid();
        });
    }

    setActiveIndex(activeIndex) {
        this.swiper.slideTo(activeIndex);
        [...this.swiper.slides].forEach((nSlide, index) => {
            if (index === activeIndex) {
                nSlide.classList.add('slider-navigation-top__item_active');
            } else {
                nSlide.classList.remove('slider-navigation-top__item_active');
            }
        });
    }

    destroy() {
        this.swiper.destroy();
    }
}

export default SliderNavigationTop;
