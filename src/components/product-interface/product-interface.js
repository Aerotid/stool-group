import Component from '../../common/js/component';
import {nFindComponent, getDeviceType, listen, unlisten} from '../../common/js/helpers';
import MorphSvg from '../morph-svg/morph-svg';
import { positionSticky, updateDuration, disabledScrollInterface, initScrollInterface } from './animations';
import SpoilerList from '../spoiler-list/spoiler-list';

class ProductInterface extends Component {
    constructor(nRoot, nContainer) {
        super(nRoot, 'product-interface');
        this.currentDevice = getDeviceType();

        if (getDeviceType() === 'mobile') {
            positionSticky(nContainer, nRoot);
            disabledScrollInterface();
            this.deviceState = false;
        } else if (getDeviceType() === 'desktop') {
            positionSticky(nContainer, nRoot);
            this.deviceState = true;
        }

        this.recalcInterface = this.recalcInterface.bind(this);
        this.updateWithStickyHeader = this.updateWithStickyHeader.bind(this);
        listen('collapse:request-collapse-refresh', this.recalcInterface);
        listen('header:header-show', this.updateWithStickyHeader);
        listen('header:header-hide', this.updateWithStickyHeader);

        this.afterResize = this.afterResize.bind(this);
        listen('deviceType:after-resize', this.afterResize);

        this.nSaleSvg = this.nFindSingle('sale-svg');
        if (this.nSaleSvg) {
            this.nMorphSvg = new MorphSvg(nFindComponent('morph-svg', this.nRoot));
        }

        this.charLink = this.nFindSingle('characteristics-link');
        if (this.charLink) {
            this.spoilerList = new SpoilerList(nFindComponent('spoiler-list'));

            this.scrollToDescription = this.scrollToDescription.bind(this);
            this.nFindSingle('characteristics-link').addEventListener('click', this.scrollToDescription);
        }
    }

    updateWithStickyHeader() {
        updateDuration(true);

        if (this.deviceState) {
            if (this.nRoot.classList.contains('header-show')) {
                this.nRoot.classList.remove('header-show');
            } else {
                this.nRoot.classList.add('header-show');
            }
        }
    }

    recalcInterface() {
        if (this.currentDevice === 'desktop') {
            updateDuration();
        }
    }

    scrollToDescription(e) {
        e.preventDefault();
        this.spoilerList.scrollTo();
    }

    afterResize() {
        updateDuration();

        if (this.currentDevice !== getDeviceType()) {
            if (getDeviceType() !== 'desktop') {
                this.deviceState = false;
                disabledScrollInterface();
            } else {
                this.deviceState = true;
                initScrollInterface();
            }
            this.currentDevice = getDeviceType();
        }
    }

    destroy() {
        if (this.nSaleSvg) {
            this.nMorphSvg.destroy();
        }

        if (this.charLink) {
            this.spoilerList.destroy();
            this.nFindSingle('characteristics-link').removeEventListener('click', this.scrollToDescription);
        }

        unlisten('collapse:request-collapse-refresh', this.recalcInterface);
        unlisten('deviceType:after-resize', this.afterResize);
        unlisten('header:header-show', this.updateWithStickyHeader);
        unlisten('header:header-hide', this.updateWithStickyHeader);
    }
}

export default ProductInterface;
