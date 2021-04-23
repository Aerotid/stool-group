import Swiper from 'swiper/dist/js/swiper.min';
import Component from '../../common/js/component';
import MorphSvg from '../morph-svg/morph-svg';
import { getDeviceType, listen, unlisten, nFindComponent, Resize } from '../../common/js/helpers';
import MobileNavigation from '../mobile-navigation/mobile-navigation';

class InstagramList extends Component {
    constructor(nRoot) {
        super(nRoot, 'instagram-list');
        this.nMorphBlock = this.nRoot.querySelector(`.${this.componentName}__item_last`);
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);
        this.mobileNavigation = new MobileNavigation(nFindComponent(`mobile-navigation_${this.componentName}`));

        if (getDeviceType() === 'desktop') {
            this.initDesktop();
        } else if (getDeviceType() === 'tablet') {
            this.initTablet();
        } else {
            this.initMobile();
        }
        this.resize = new Resize();
        listen('deviceType:after-resize', this.afterResize);
    }

    initSlider() {
        this.swiper = new Swiper(this.nRoot, {
            slidesPerView: 'auto',
            centeredSlides: true,
            a11y: true,
            keyboardControl: true,
            grabCursor: true,
            navigation: {
                prevEl: this.mobileNavigation.nFindSingle('arrow_prev'),
                nextEl: this.mobileNavigation.nFindSingle('arrow_next'),
                disabledClass: 'disabled',
            },
        });
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

    initDesktop() {
        this.nMorphSvg = new MorphSvg(nFindComponent('morph-svg', this.nRoot));
        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
        this.nMorphBlock.addEventListener('mouseenter', this.hoverOn);
        this.nMorphBlock.addEventListener('mouseleave', this.hoverOff);
    }

    initTablet() {
        this.nMorphSvg = new MorphSvg(nFindComponent('morph-svg', this.nRoot));
        this.nMorphSvg.schedule();
    }

    initMobile() {
        this.initSlider();
    }

    afterResize() {
        if (getDeviceType() !== this.currentDevice) {
            if (getDeviceType() === 'desktop' && this.currentDevice === 'tablet') {
                this.destroyTablet();
                this.initDesktop();
            } else if (getDeviceType() === 'desktop' && this.currentDevice === 'mobile') {
                this.destroyMobile();
                this.initDesktop();
            } else if (getDeviceType() === 'tablet' && this.currentDevice === 'desktop') {
                this.destroyDesktop();
                this.initTablet();
            } else if (getDeviceType() === 'tablet' && this.currentDevice === 'mobile') {
                this.destroyMobile();
                this.initTablet();
            } else if (getDeviceType() === 'mobile' && this.currentDevice === 'desktop') {
                this.destroyDesktop();
                this.initMobile();
            } else if (getDeviceType() === 'mobile' && this.currentDevice === 'tablet') {
                this.destroyTablet();
                this.initMobile();
            }
            this.currentDevice = getDeviceType();
        }
    }

    destroyDesktop() {
        this.nMorphBlock.removeEventListener('mouseenter', this.hoverOn);
        this.nMorphBlock.removeEventListener('mouseleave', this.hoverOff);
        this.nMorphSvg.destroy();
    }

    destroyTablet() {
        this.nMorphSvg.destroyLeave();
        this.nMorphSvg.destroy();
    }

    destroyMobile() {
        this.swiper.destroy();
    }

    destroy() {
        unlisten('deviceType:after-resize', this.afterResize);
        if (getDeviceType() === 'mobile') {
            this.destroyMobile();
        } else {
            this.destroyDesktop();
        }
    }
}

export default InstagramList;
