import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';

Barba.BaseView.extend({
    namespace: 'modal-list',
    onEnter() {

    },
    async onEnterCompleted() {
        await commonComponents.preloader.preloading;
        objectFitPolyfill();
    },
    onLeave() {

    },
    onLeaveCompleted() {

    },
}).init();
