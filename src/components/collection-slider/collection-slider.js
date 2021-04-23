import Swiper from 'swiper/dist/js/swiper.min';
import Component from '../../common/js/component';

class CollectionSlider extends Component {
    constructor(nRoot) {
        super(nRoot, 'collection-slider');
        this.initSlider();
    }

    initSlider() {
        this.swiper = new Swiper(this.nFindSingle('swiper-container'), {
            slidesPerView: 1,
            loop: false,
            speed: 600,
            autoplay: false,
            noSwiping: true,
            followFinger: false,
            onlyExternal: true,
            simulateTouch: false,
        });
    }

    destroy() {
        this.swiper.destroy();
    }
}

export default CollectionSlider;
