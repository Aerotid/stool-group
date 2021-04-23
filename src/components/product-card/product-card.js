import Swiper from 'swiper/dist/js/swiper.min';
import Component from '../../common/js/component';
import {
    getDeviceType, listen,
    nFindComponent,
    Resize,
} from '../../common/js/helpers';
import MorphSvg from '../morph-svg/morph-svg';
// import ButtonFavorite from '../button-favorite/button-favorite';

class ProductCard extends Component {
    constructor(nRoot) {
        super(nRoot, 'product-card');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);
        this.nCarousel = this.nRoot.querySelector(`.${this.componentName}__carousel`);
        if (this.nCarousel) {
            this.nCarouselItems = this.nCarousel.querySelector(`.${this.componentName}__carousel-wrapper`);
            this.nItemsColor = this.nFind('carousel-slide');
        }
        this.nImgMain = this.nRoot.querySelector(`.${this.componentName}__img_main`);
        this.nImgHover = this.nRoot.querySelector(`.${this.componentName}__img_hover`);
        this.nSaleSvg = this.nRoot.querySelector(`.${this.componentName}__sale-svg`);
        this.nFavoriteBtn = this.nRoot.querySelector(`.${this.componentName}__favorite`);

        if (this.nItemsColor) {
            this.nFirstColor = this.nItemsColor[0].querySelector(`.${this.componentName}__carousel-bgwrapper`);
            this.nFirstColor.classList.add('active');
        }
        // if (this.nFavoriteBtn) {
        //     this.nButtonFavorite = new ButtonFavorite(nFindComponent('button-favorite', this.nRoot));
        // }
        if (this.nSaleSvg) {
            this.nMorphSvg = new MorphSvg(nFindComponent('morph-svg', this.nRoot));
        }
        if (getDeviceType() === 'desktop') {
            this.initDesktop();
        } else {
            this.initMobile();
        }
        this.resize = new Resize();
        listen('deviceType:after-resize', this.afterResize);
    }

    initDesktop() {
        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
        this.nRoot.addEventListener('mouseenter', this.hoverOn);
        this.nRoot.addEventListener('mouseleave', this.hoverOff);
        if (this.nCarousel) {
            this.nNavigationLeft = this.nFindSingle('arrow_left');
            this.nNavigationRight = this.nFindSingle('arrow_right');
            this.nRoot.classList.add('colors');
            this.initSlider = this.initSlider.bind(this);
            this.setActiveColor = this.setActiveColor.bind(this);
            this.nRoot.addEventListener('mouseenter', this.initSlider);

            if (this.nCarouselItems) {
                this.nCarouselItems.addEventListener('click', this.setActiveColor);
            }
        }
        this.nRoot.classList.remove(`${this.componentName}_no-init`);
    }

    initMobile() {
        if (this.nMorphSvg) {
            this.nMorphSvg.schedule();
        }
    }

    initSlider() {
        if (!this.swiper) {
            this.swiper = new Swiper(this.nCarousel, {
                slidesPerView: 4,
                centeredSlides: false,
                grabCursor: true,
                slideToClickedSlide: true,
                navigation: {
                    prevEl: this.nNavigationLeft,
                    nextEl: this.nNavigationRight,
                    disabledClass: 'disabled',
                },
            });
        }
    }

    hoverOn() {
        if (this.nMorphSvg) {
            this.nMorphSvg.schedule();
        }
    }

    hoverOff() {
        if (this.nMorphSvg) {
            this.nMorphSvg.destroyLeave();
        }
    }

    setActiveColor(e) {
        if (!e.target.classList.contains('active')) {
            this.nItemsColor.map((nColor) => {
                nColor.querySelector(`.${this.componentName}__carousel-bgwrapper`).classList.remove('active');
            });
            e.target.classList.add('active');
            if (this.nImgMain) {
                this.nImgMain.src = e.target.dataset.mainSrc;
            }
            if (this.nImgHover) {
                this.nImgHover.src = e.target.dataset.hoverSrc;
            }
        }
    }

    afterResize() {
        if (getDeviceType() !== this.currentDevice) {
            if (getDeviceType() === 'desktop') {
                this.destroyMobile();
                this.initDesktop();
            } else if (this.currentDevice === 'desktop') {
                this.destroyDesktop();
                this.initMobile();
            }
            this.currentDevice = getDeviceType();
        }
    }

    destroyDesktop() {
        this.nRoot.removeEventListener('mouseenter', this.hoverOn);
        this.nRoot.removeEventListener('mouseleave', this.hoverOff);
        if (this.nCarousel) {
            this.nRoot.removeEventListener('mouseenter', this.initSlider);

            if (this.nCarouselItems) {
                this.nCarouselItems.removeEventListener('click', this.setActiveColor);
            }
        }
    }

    destroyMobile() {
        if (this.nMorphSvg) {
            this.nMorphSvg.destroyLeave();
        }
    }

    destroy() {
        if (this.swiper) {
            this.swiper.destroy();
        }
        if (this.nMorphSvg) {
            this.nMorphSvg.destroy();
        }
    }
}

export default ProductCard;
