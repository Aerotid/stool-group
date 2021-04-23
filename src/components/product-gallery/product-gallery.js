import Component from '../../common/js/component';
import ScrollGallery from '../scroll-gallery/scroll-gallery';
import {getDeviceType, listen, nFindComponent} from '../../common/js/helpers';

class ProductGallery extends Component {
    constructor(nRoot) {
        super(nRoot, 'product-gallery');
        this.currentDevice = getDeviceType();

        this.scrollTo = this.scrollTo.bind(this);

        if (getDeviceType() !== 'mobile') {
            this.initDesktop();
        }

        this.nRoot.addEventListener('click', this.scrollTo);

        this.afterResize = this.afterResize.bind(this);
        listen('deviceType:after-resize', this.afterResize);

        if (this.nRoot.querySelector('.autoplay-video')) {
            this.pauseVideo = this.pauseVideo.bind(this);
            this.nRoot.querySelector('.autoplay-video').addEventListener('click', this.pauseVideo);
            this.play = true;
        }
    }

    pauseVideo(e) {
        if (this.play) {
            e.target.pause();
            this.play = false;
        } else {
            e.target.play();
            this.play = true;
        }
    }

    initDesktop() {
        this.scrollGallery = new ScrollGallery(nFindComponent('scroll-gallery'));
    }

    afterResize() {
        if (this.currentDevice !== getDeviceType()) {
            if (getDeviceType() === 'desktop') {
                this.initDesktop();
            } else {

            }
        }
    }

    destroyDesktop() {
        this.scrollGallery.destroy();
    }

    scrollTo(e) {
        this.scrollGallery.scrollToIndex(e);
    }

    destroy() {
        this.nRoot.removeEventListener('click', this.scrollTo);
        if (this.scrollGallery) {
            this.scrollGallery.destroy();
        }
    }
}

export default ProductGallery;
