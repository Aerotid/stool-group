import Swiper from 'swiper/dist/js/swiper.min';
import Component from '../../common/js/component';
import {
    getDeviceType,
    listen,
    nFindComponent,
    nFindComponents,
    Resize,
    unlisten,
} from '../../common/js/helpers';
import ProductCard from '../product-card/product-card';
import MobileNavigation from '../mobile-navigation/mobile-navigation';
import ButtonLoad from "../button-load/button-load";

class ProductList extends Component {
    constructor(nRoot, index) {
        super(nRoot, 'product-list');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);
        this.nProductCards = nFindComponents('product-card_no-init', this.nRoot).map(nProductCard => new ProductCard(nProductCard, this.nRoot));
        this.mobileNavigation = new MobileNavigation(nFindComponent(`mobile-navigation_${this.componentName}-${index}`));

        this.sliderType = '';
        if (this.nRoot.classList.contains('product-list_product')) {
            this.sliderType = 'product';
            this.sliderPerView = 2;
            this.centeredSlides = false;
        } else {
            this.sliderType = 'main';
            this.sliderPerView = 'auto';
            this.centeredSlides = true;
        }

        if (getDeviceType() === 'mobile') {
            this.initMobile();
        } else {
            this.initDesktop();
        }
        this.resize = new Resize();
        listen('deviceType:after-resize', this.afterResize);
    }

    initSlider() {
        this.swiper = new Swiper(this.nRoot, {
            slidesPerView: this.sliderPerView,
            centeredSlides: this.centeredSlides,
            a11y: true,
            keyboardControl: true,
            grabCursor: true,
            navigation: {
                prevEl: this.mobileNavigation.nFindSingle('arrow_prev'),
                nextEl: this.mobileNavigation.nFindSingle('arrow_next'),
                disabledClass: 'disabled',
            },
        });
        this.setSlideTransform();
        this.swiper.on('resize', () => {
            this.swiper.slideTo(0, 0);
            this.setSlideTransform();
        });
    }

    setSlideTransform() {
        [...this.swiper.slides].forEach((nSlide) => {
            nSlide.style.transform = `translateX(-${this.swiper.getTranslate()}px)`;
        });
    }

    initDesktop() {
        this.visibleCount = this.nRoot.getAttribute('data-visible-count');
        if (nFindComponent('button-load', this.nRoot) && this.visibleCount) {
            this.buttonLoad = new ButtonLoad(nFindComponent('button-load', this.nRoot), this.nRoot);
            this.fakeLoad = this.fakeLoad.bind(this);
            listen('buttonLoad:load', this.fakeLoad, this.nRoot);
        }
        this.nProductCards.forEach((nProductCard, index) => {
            if (index < this.visibleCount) {
                nProductCard.nRoot.classList.remove(`${this.componentName}__product-card_hidden`);
                if (this.buttonLoad) {
                    this.buttonLoad.refresh();
                }
            }
        });
    }

    fakeLoad() {
        // Я был вынужден
        const nHiddenCards = this.nProductCards.filter(nProductCard => nProductCard.nRoot.classList.contains(`${this.componentName}__product-card_hidden`));
        nHiddenCards.forEach((nHiddenCard, index) => {
            if (index < this.visibleCount) {
                nHiddenCard.nRoot.classList.remove(`${this.componentName}__product-card_hidden`);
                if (this.buttonLoad) {
                    this.buttonLoad.refresh();
                }
            }
        });
    }

    initMobile() {
        this.initSlider();
    }

    afterResize() {
        if (getDeviceType() !== this.currentDevice) {
            if (getDeviceType() === 'mobile') {
                this.destroyDesktop();
                this.initMobile();
            } else if (this.currentDevice === 'mobile') {
                this.destroyMobile();
                this.initDesktop();
            }
            this.currentDevice = getDeviceType();
        }
    }

    destroyDesktop() {

    }

    destroyMobile() {
        this.swiper.destroy();
    }

    destroy() {
        unlisten('deviceType:after-resize', this.afterResize);
        if (getDeviceType() === 'mobile') {
            this.destroyMobile();
        } else {
            // this.destroyDesktop();
        }
    }
}

export default ProductList;
