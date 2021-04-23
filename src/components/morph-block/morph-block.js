import Component from '../../common/js/component';
import { getDeviceType, listen, unlisten, nFindComponent, Resize, nFindComponents } from '../../common/js/helpers';
import MorphSvg from '../morph-svg/morph-svg';

class MorphBlock extends Component {
    constructor(nRoot) {
        super(nRoot, 'morph-block');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);

        this.nMorphsSvg = nFindComponents('morph-svg').forEach(morphSvg => new MorphSvg(morphSvg, this.nRoot));

        if (getDeviceType() === 'mobile') {
            this.initMobile();
        } else {
            this.initDesktop();
        }
        this.resize = new Resize();
        listen('deviceType:after-resize', this.afterResize);
    }

    initDesktop() {

    }

    initMobile() {

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

export default MorphBlock;
