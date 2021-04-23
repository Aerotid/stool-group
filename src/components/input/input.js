import Component from '../../common/js/component';
import {getDeviceType, listen, unlisten, nFindComponent, Resize} from '../../common/js/helpers';

class Input extends Component {
    get val() {
        return this.nInput.value
    }

    constructor(nRoot) {
        super(nRoot, 'input');
        this.nInput = this.nFindSingle('input');

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

        this.checkFilled = this.checkFilled.bind(this);
        this.nInput.addEventListener('change', this.checkFilled);

        if (this.nFindSingle('show-icon')) {
            this.inputType = this.nFindSingle('input').type;
            this.showBtn = this.nFindSingle('show-icon');
            this.hideBtn = this.nFindSingle('hidden-icon');

            this.showPassword = this.showPassword.bind(this);
            this.showBtn.addEventListener('click', this.showPassword);

            this.hidePassword = this.hidePassword.bind(this);
            this.hideBtn.addEventListener('click', this.hidePassword);
        }
    }

    showPassword() {
        this.nFindSingle('input').type = 'text';
        this.showBtn.classList.add('d-none');
        this.hideBtn.classList.remove('d-none');
        this.hideBtn.classList.add('active');
    }

    hidePassword() {
        this.nFindSingle('input').type = this.inputType;
        this.showBtn.classList.remove('d-none');
        this.hideBtn.classList.add('d-none');
    }

    checkFilled() {
        const val = !!this.val;
        this.nRoot.classList[val ? 'add' : 'remove']('_is-fill');
        return val;
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

        this.nInput.removeEventListener('change', this.checkFilled);
    }
}

export default Input;
