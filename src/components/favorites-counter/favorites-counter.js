import Component from '../../common/js/component';
import { getDeviceType, listen, unlisten, nFindComponent, Resize } from '../../common/js/helpers';

class FavoritesCounter extends Component {
    constructor(nRoot, nCount) {
        super(nRoot, 'favorites-counter');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);

        if (getDeviceType() === 'mobile') {
            this.initMobile();
        } else {
            this.initDesktop();
        }
        this.resize = new Resize();
        listen('deviceType:after-resize', this.afterResize);

        this.nCount = nCount;
        this.nFindSingle('count').innerHTML = this.nCount;

        if (this.nCount > 0) {
            this.nFindSingle('clear').classList.remove('d-none');
        } else {
            this.nFindSingle('clear').classList.add('d-none');
        }

        if (this.nFindSingle('reset')) {
            this.clearFavorites = this.clearFavorites.bind(this);
            this.nFindSingle('reset').addEventListener('click', this.clearFavorites);
        }
    }

    clearFavorites() {
        // console.log('reset');
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

export default FavoritesCounter;
