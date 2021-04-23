import Component from '../../common/js/component';
import { getDeviceType, listen, unlisten, nFindComponent, Resize, nFindComponents, innerHeight, HeightBalancer, nGetBody } from '../../common/js/helpers';
import CompareSlider from '../compare-slider/compare-slider';
import { initStickySlider, destroyStickySlider } from './animations';

class CompareBlock extends Component {
    constructor(nRoot) {
        super(nRoot, 'compare-block');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);
        this.slidersControl = this.slidersControl.bind(this);
        this.translateY = this.translateY.bind(this);
        this.nCompareSliders = nFindComponents('compare-slider').map(nCompareSlider => new CompareSlider(nCompareSlider));
        this.nCompareTables = this.nFind('tables');
        this.slidersControl();
        this.checkTable(this.nCompareTables);
        this.nBlockTop = this.nFindSingle('compare-slider');
        initStickySlider(this.nBlockTop);
        if (getDeviceType() === 'desktop') {
            this.initDesktop();
        } else {
            this.initMobile();
        }
        this.resize = new Resize();
        listen('deviceType:after-resize', this.afterResize);
        listen('compare-slider:after-resize', this.slidersControl);
        listen('header:header-show', this.translateY);
        listen('header:header-hide', this.translateY);
    }

    translateY() {
        if (this.nBlockTop.classList.contains('header-show')) {
            this.nBlockTop.classList.remove('header-show');
        } else {
            this.nBlockTop.classList.add('header-show');
        }
    }

    checkTable(tables) {
        tables.forEach((nTable, index) => {
            this.nTableHead = nFindComponent(`${this.componentName}__table-head`, nTable);
            const nTableRowsCount = this.nTableHead.querySelectorAll('tr').length;
            for (let i = 0; i < nTableRowsCount; i++) {
                this.heightBalancer = new HeightBalancer([...nTable.querySelectorAll(`[data-order="${i}"]`)]);
            }
        });
    }

    slidersControl() {
        for (let i = 0; i < this.nCompareSliders.length - 1; i++) {
            this.nCompareSliders[i].swiper.controller.control = this.nCompareSliders[i + 1].swiper;
        }
    }

    initDesktop() {}

    initMobile() {}

    afterResize() {
        if (getDeviceType() !== this.currentDevice) {
            if (getDeviceType() === 'desktop') {
                this.destroyMobile();
                this.initDesktop();
            } else {
                this.destroyDesktop();
                this.initMobile();
            }
            this.currentDevice = getDeviceType();
        }
    }

    destroyDesktop() {}

    destroyMobile() {}

    destroy() {
        unlisten('deviceType:after-resize', this.afterResize);
        unlisten('compare-slider:after-resize', this.slidersControl);
        unlisten('header:header-show', this.translateY);
        unlisten('header:header-hide', this.translateY);
        destroyStickySlider();
        if (getDeviceType() === 'desktop') {
            this.destroyDesktop();
        } else {
            this.destroyMobile();
        }
    }
}

export default CompareBlock;
