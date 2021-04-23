import Swiper from 'swiper/dist/js/swiper.min';
import Component from '../../common/js/component';
import { getDeviceType, nFindComponent, listen, emit, Resize } from '../../common/js/helpers';
import SliderNavigationTop from '../slider-navigation-top/slider-navigation-top';
import CollectionSlider from '../collection-slider/collection-slider';
import CursorCustom from '../cursor-custom/cursor-custom';
import MobileNavigation from '../mobile-navigation/mobile-navigation';

class MainSlider extends Component {
    constructor(nRoot) {
        super(nRoot, 'main-slider');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);
        this.sliderType = '';
        if (this.nRoot.classList.contains('main-slider_banner')) {
            this.sliderType = 'main';
            this.loop = true;
            this.autoplay = {
                delay: 7000,
                disableOnInteraction: false,
            };
            this.pagination = {
                el: `.${this.componentName}_banner .${this.componentName}__swiper-pagination`,
                type: 'fraction',
                renderFraction(currentClass, totalClass) {
                    return `<div class="${currentClass}"></div><div class="${totalClass}"></div>`;
                },
                currentClass: `${this.componentName}__swiper-pagination_current`,
                totalClass: `${this.componentName}__swiper-pagination_total`,
            };
            this.navigation = false;
        } else {
            this.sliderType = 'collection';
            this.mobileNavigation = new MobileNavigation(nFindComponent(`mobile-navigation_${this.componentName}-${this.sliderType}`));
            this.loop = false;
            this.autoplay = false;
            this.pagination = false;
            this.navigation = {
                prevEl: this.mobileNavigation.nFindSingle('arrow_prev'),
                nextEl: this.mobileNavigation.nFindSingle('arrow_next'),
                disabledClass: 'disabled',
            };
        }
        this.initSlider();
        if (getDeviceType() === 'desktop') {
            setTimeout(() => {
                this.initDesktop();
            }, 10);
        }
        this.resize = new Resize();
        listen('deviceType:after-resize', this.afterResize);
    }

    initSlider() {
        this.swiper = new Swiper(this.nFindSingle('swiper-container'), {
            slidesPerView: 'auto',
            loop: this.loop,
            speed: 600,
            autoplay: this.autoplay,
            // effect: 'fade',
            // fadeEffect: {
            //     crossFade: true,
            // },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            pagination: this.pagination,
            navigation: this.navigation,
            iOSEdgeSwipeDetection: true,
            iOSEdgeSwipeThreshold: 0,
            resistanceRatio: 0,
            observer: true,
            observeParents: true,
            longSwipesRatio: 0,
            touchRatio: 0.4,
        });

        if (this.sliderType === 'collection') {
            if (nFindComponent('collection-slider')) {
                this.sliderNavigationTop = new SliderNavigationTop(nFindComponent('slider-navigation-top'));
                this.collectionSlider = new CollectionSlider(nFindComponent('collection-slider'));
            }
            this.swiper.controller.control = this.collectionSlider.swiper;
            this.collectionSlider.swiper.controller.control = this.swiper;
            this.onChange = this.onChange.bind(this);
            this.onClick = this.onClick.bind(this);
            this.swiper.on('slideChange', this.onChange);
            this.sliderNavigationTop.swiper.on('click', this.onClick);
            // this.swiper.on('reachEnd', () => {
            //     emit('collection-slider:last-slide');
            // });
            // this.swiper.on('fromEdge', () => {
            //     emit('collection-slider:from-edge');
            // });
            // this.swiper.on('reachBeginning', () => {
            //     emit('collection-slider:first-slide');
            // });
        }
    }

    initDesktop() {
        if (!this.cursor) {
            this.cursor = new CursorCustom(nFindComponent('cursor-custom'), this.nRoot, this.loop);
            this.swiper.on('touchMove', (e) => {
                this.cursor.getCursorPosition(e);
            });
        }
    // this.swiper.on('touchStart', () => {
    //   this.cursor.touchStart();
    // });
    // this.swiper.on('touchEnd', () => {
    //   this.cursor.touchEnd();
    // });
    }

    initMobile() {
        // this.initSlider();
    }

    onChange() {
        this.sliderNavigationTop.setActiveIndex(this.swiper.realIndex);
    }

    onClick(e) {
        this.sliderNavigationTop.setActiveIndex(this.sliderNavigationTop.swiper.clickedIndex);
        this.swiper.slideTo(this.sliderNavigationTop.swiper.clickedIndex);
    }

    afterResize() {
        if (getDeviceType() !== this.currentDevice) {
            if (getDeviceType() === 'desktop') {
                // this.destroyMobile();
                this.initDesktop();
            } else if (this.currentDevice === 'desktop') {
                // this.destroyDesktop();
                // this.initMobile();
            }
            this.currentDevice = getDeviceType();
        }
    }

    destroyMobile() {
        // this.swiper.destroy(true, true);
        // if (this.collectionSlider) {
        //     this.collectionSlider.destroy();
        // }
        // if (this.sliderNavigationTop) {
        //     this.sliderNavigationTop.destroy();
        // }
    }

    destroyDesktop() {
        // this.swiper.destroy(true, true);
        // if (this.collectionSlider) {
        //     this.collectionSlider.destroy();
        // }
        // if (this.sliderNavigationTop) {
        //     this.sliderNavigationTop.destroy();
        // }
    }

    destroy() {
        if (getDeviceType() === 'desktop') {
            this.destroyDesktop();
            this.cursor.destroy();
        } else {
            this.destroyMobile();
        }
    }
}

export default MainSlider;
