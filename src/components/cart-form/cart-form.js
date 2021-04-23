import Component from '../../common/js/component';
import {getDeviceType, listen, unlisten, nFindComponent, Resize, nFindComponents} from '../../common/js/helpers';
import Input from '../../components/input/input';
import ProductConfirm from '../../components/product-confirm/product-confirm'
import Select from "../select/select";

class CartForm extends Component {
    constructor(nRoot) {
        super(nRoot, 'cart-form');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);

        this.inputCompontns = nFindComponents('input', this.nRoot).map(input => new Input(input));

        if (nFindComponent('select', this.nRoot)) {
            this.nSelects = nFindComponents('select').map(item => new Select(item));
        }

        if (this.nFindSingle('product-confirm')) {
            this.productConfirm = new ProductConfirm(this.nFindSingle('product-confirm'));
        }

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
        if (nFindComponent('select', this.nRoot)) {
            this.nSelects.forEach(item => item.destroy());
        }

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

        if (this.inputCompontns) {
            this.inputCompontns.forEach(inputComponent => inputComponent.destroy())
        }
    }
}

export default CartForm;
