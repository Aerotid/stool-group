import Swiper from 'swiper/dist/js/swiper.min';
import {listen, unlisten, getDeviceType, nFindComponent, nFindComponents} from '../../common/js/helpers';
import Component from '../../common/js/component';
import ScrollGallery from '../scroll-gallery/scroll-gallery';
import VideoBlock from "../video-block/video-block";

class ProductSlider extends Component {
    constructor(nRoot) {
        super(nRoot, 'product-slider');
        this.currentDevice = getDeviceType();

        this.loop = true;
        this.autoplay = {
            delay: 5000,
            disableOnInteraction: false,
        };

        if (nFindComponent('video-block', this.nRoot)) {
            this.videoBlocks = nFindComponents('video-block').map(videoBlocks => new VideoBlock(videoBlocks));
        }

        this.pagination = {
            el: '.product-slider__pagination',
            clickable: true,
        };

        if (getDeviceType() === 'mobile') {
            this.initMobile();
        }

        this.afterResize = this.afterResize.bind(this);
        listen('deviceType:after-resize', this.afterResize);

        if (this.nRoot.classList.contains('product-slider__scroll')) {
            this.scrollTo = this.scrollTo.bind(this);
            this.nRoot.addEventListener('click', this.scrollTo);
        }
    }

    initMobile() {
        if (this.nRoot.classList.contains('product-slider__scroll')) {
            this.scrollGallery = new ScrollGallery(nFindComponent('scroll-gallery'));
        }

        this.swiper = new Swiper(this.nFindSingle('swiper-container'), {
            sliderPerView: 1,
            loop: this.loop,
            speed: 400,
            autoplay: this.autoplay,
            effect: 'fade',
            fadeEffect: {
                crossFade: false,
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            pagination: this.pagination,
            iOSEdgeSwipeDetection: true,
            iOSEdgeSwipeThreshold: 0,
            resistanceRatio: 0,
            observer: true,
            observeParents: true,
            longSwipesRatio: 0,
            touchRatio: 0.4,
        });
    }

    afterResize() {
        if (this.currentDevice !== getDeviceType()) {
            if (getDeviceType() === 'mobile') {
                this.initMobile();
            } else {
                //this.destroyMobile();
            }
            this.currentDevice = getDeviceType();
        }
    }

    scrollTo(e) {
        this.scrollGallery.scrollToIndex(e);
    }

    destroyMobile() {
        if (this.nRoot.classList.contains('product-slider__scroll')) {
            this.scrollGallery.destroy();
        }
        this.swiper.destroy(true, true);
    }

    destroy() {
        if (this.scrollGallery) {
            this.scrollGallery.destroy();
        }
        this.videoBlocks.map(videoBlocks => videoBlocks.destroy());

        unlisten('deviceType:after-resize', this.afterResize);
    }
}

export default ProductSlider;
