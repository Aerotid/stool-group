import Swiper from 'swiper/dist/js/swiper.min';
import Component from '../../common/js/component';
import { getDeviceType, listen, unlisten, innerHeight, Resize, nFindComponent, emit } from '../../common/js/helpers';
import MobileNavigation from '../mobile-navigation/mobile-navigation';

class CompareSlider extends Component {
    constructor(nRoot) {
        super(nRoot, 'compare-slider');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);
        this.sliderType = '';
        if (this.nRoot.classList.contains('compare-slider_main')) {
            this.sliderType = 'main';
            this.grabCursor = true;
            this.noSwiping = false;
            this.followFinger = true;
            this.onlyExternal = false;
            this.simulateTouch = true;
            this.allowTouchMove = true;
        } else {
            this.sliderType = 'table';
            this.grabCursor = false;
            this.noSwiping = true;
            this.followFinger = false;
            this.onlyExternal = true;
            this.simulateTouch = false;
            this.allowTouchMove = false;
        }

        if (getDeviceType() === 'desktop') {
            this.initDesktop();
        } else {
            this.initMobile();
        }
        this.resize = new Resize();
        listen('deviceType:after-resize', this.afterResize);
    }

    initSlider() {
        this.swiper = new Swiper(this.nFindSingle('swiper-container'), {
            slidesPerView: 3,
            spaceBetween: 40,
            keyboardControl: true,
            grabCursor: this.grabCursor,
            allowTouchMove: this.allowTouchMove,
            navigation: this.navigation,
            breakpoints: {
                1440: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 3,
                },
                767: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
            },
        });
    }

    initDesktop() {
        if (this.sliderType === 'main') {
            this.navigation = {
                prevEl: this.nFindSingle('navigation_prev'),
                nextEl: this.nFindSingle('navigation_next'),
                disabledClass: 'disabled',
            };
        } else if (this.sliderType === 'table') {
            this.navigation = false;
        }
        this.initSlider();
    }

    initMobile() {
        if (this.sliderType === 'main') {
            this.mobileNavigation = new MobileNavigation(nFindComponent(`mobile-navigation_${this.componentName}`));
            this.navigation = {
                prevEl: this.mobileNavigation.nFindSingle('arrow_prev'),
                nextEl: this.mobileNavigation.nFindSingle('arrow_next'),
                disabledClass: 'disabled',
            };
        } else if (this.sliderType === 'table') {
            this.navigation = false;
        }
        this.initSlider();
    }

    afterResize() {
        if (getDeviceType() !== this.currentDevice) {
            if (getDeviceType() === 'desktop') {
                this.destroyMobile();
                this.initDesktop();
            } else {
                this.destroyDesktop();
                this.initMobile();
            }
            emit('compare-slider:after-resize');
            this.currentDevice = getDeviceType();
        }
    }

    destroyDesktop() {
        this.swiper.destroy();
    }

    destroyMobile() {
        this.swiper.destroy();
    }

    destroy() {
        unlisten('deviceType:after-resize', this.afterResize);
        if (getDeviceType() === 'desktop') {
            this.destroyDesktop();
        } else {
            this.destroyMobile();
        }
    }
}

export default CompareSlider;
