import Component from '../../common/js/component';
import { getDeviceType, listen, unlisten, nFindComponent, Resize } from '../../common/js/helpers';
import PerfectScrollbar from 'perfect-scrollbar';
import debounce from 'lodash/debounce';

class ProductConfirm extends Component {
    constructor(nRoot) {
        super(nRoot, 'product-confirm');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);

        // this.ps = new PerfectScrollbar(this.nRoot, {
        //     // wheelSpeed: 2,
        //     wheelPropagation: true,
        //     minScrollbarLength: 20,
        //     suppressScrollY: true,
        //
        // });


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

        // this.ps.destroy();
        // this.ps = null;
    }
}

export default ProductConfirm;
