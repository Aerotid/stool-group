import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import { nFindComponent, nFindComponents, nGetBody } from '../../common/js/helpers';
import CompareBlock from '../../components/compare-block/compare-block';

Barba.BaseView.extend({
    namespace: 'compare',
    onEnter() {

    },
    async onEnterCompleted() {
        await commonComponents.preloader.preloading;
        this.nCompareBlock = new CompareBlock(nFindComponent('compare-block'));
        objectFitPolyfill();
    },
    onLeave() {
        this.nCompareBlock.destroy();
    },
    onLeaveCompleted() {

    },
}).init();
