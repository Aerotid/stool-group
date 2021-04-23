import Swiper from 'swiper/dist/js/swiper.min';
import Component from '../../common/js/component';
import { getDeviceType, listen, unlisten, nFindComponent, Resize } from '../../common/js/helpers';
import MobileNavigation from '../mobile-navigation/mobile-navigation';

class ProjectList extends Component {
    constructor(nRoot) {
        super(nRoot, 'project-list');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);
        this.mobileNavigation = new MobileNavigation(nFindComponent(`mobile-navigation_${this.componentName}`));

        if (getDeviceType() === 'mobile') {
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

    initMobile() {
        this.initSlider();
    }

    afterResize() {
        if (getDeviceType() !== this.currentDevice) {
            if (getDeviceType() === 'mobile') {
                this.initMobile();
            } else if (this.currentDevice === 'mobile') {
                this.destroyMobile();
            }
            this.currentDevice = getDeviceType();
        }
    }

    destroyMobile() {
        this.swiper.destroy();
    }

    destroy() {
        unlisten('deviceType:after-resize', this.afterResize);
        if (getDeviceType() === 'mobile') {
            this.destroyMobile();
        }
    }
}

export default ProjectList;
