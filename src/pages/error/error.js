import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import { nFindComponent, nGetBody } from '../../common/js/helpers';
import MorphBlock from '../../components/morph-block/morph-block';

Barba.BaseView.extend({
    namespace: 'error',
    onEnter() {

    },
    async onEnterCompleted() {
        nGetBody().classList.add('no-footer', 'error-page');
        this.morphBlock = new MorphBlock(nFindComponent('morph-block'));
        await commonComponents.preloader.preloading;
        objectFitPolyfill();
    },
    onLeave() {

    },
    onLeaveCompleted() {
        nGetBody().classList.remove('no-footer', 'error-page');
    },
}).init();
