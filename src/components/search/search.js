import Component from '../../common/js/component';
import { getDeviceType, listen, unlisten, nFindComponent, Resize } from '../../common/js/helpers';

class Search extends Component {

    get val() {
        return this.nInput.value
    }

    constructor(nRoot) {
        super(nRoot, 'search');
        this.currentDevice = getDeviceType();

        // this.afterResize = this.afterResize.bind(this);
        //
        // if (getDeviceType() === 'mobile') {
        //     this.initMobile();
        // } else {
        //     this.initDesktop();
        // }
        // this.resize = new Resize();
        // listen('deviceType:after-resize', this.afterResize);

        this.nInput = this.nFindSingle('form-input');
        this.checkFilled = this.checkFilled.bind(this);
        this.nInput.addEventListener('input', this.checkFilled);
        this.clearFill = this.clearFill.bind(this);


    }

    checkFilled() {
        const val = !!this.val;
        this.nRoot.classList[val ? 'add' : 'remove']('_is-fill');
        return val;
    }
    clearFill() {
        this.nInput.value = '';
        this.nRoot.classList.remove('_is-fill');
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
        // unlisten('deviceType:after-resize', this.afterResize);
        // if (getDeviceType() === 'mobile') {
        //     this.destroyMobile();
        // } else {
        //     this.destroyDesktop();
        // }

        this.nInput.removeEventListener('input', this.checkFilled);
    }
}

export default Search;
