import Component from '../../common/js/component';
import {getDeviceType, listen, unlisten, nFindComponent, Resize, nFindComponents} from '../../common/js/helpers';
import Input from '../input/input';
import Select from '../select/select';

class FlexibleForm extends Component {
    constructor(nRoot) {
        super(nRoot, 'flexible-form');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);

        if (getDeviceType() === 'mobile') {
            this.initMobile();
        } else {
            this.initDesktop();
        }
        this.resize = new Resize();
        listen('deviceType:after-resize', this.afterResize);

        if (nFindComponent('input')) {
            this.nInputs = nFindComponents('input').map(item => new Input(item));
        }

        if (nFindComponent('select', this.nRoot)) {
            this.nSelects = nFindComponents('select').map(item => new Select(item));
        }

        // this.validateForm = this.validateForm.bind(this);
        // this.nFindSingle('button').addEventListener('click', this.validateForm);
    }

    // validateForm() {
    //     if (nFindComponent('select', this.nRoot)) {
    //         this.nSelects.forEach(item => item.destroy());
    //     }
    //
    //     this.inputs = this.nFind('input');
    //     for (let i = 0; i < this.inputs.length; i++) {
    //         if (this.inputs[i].querySelector('.input__input').value === '' && this.inputs[i].querySelector('.input__input').hasAttribute('required')) {
    //             if (!this.inputs[i].classList.contains('input__error')) {
    //                 this.inputs[i].classList.add('input__error');
    //             }
    //         } else {
    //             if (this.inputs[i].classList.contains('input__error')) {
    //                 this.inputs[i].classList.remove('input__error');
    //             }
    //         }
    //     }
    // }

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

        if (nFindComponent('input')) {
            this.nInputs.map(item => item.destroy());
        }

        if (nFindComponent('select')) {
            this.nSelects.map(item => item.destroy());
        }
    }
}

export default FlexibleForm;
