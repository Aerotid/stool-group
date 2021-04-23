import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import {nGetBody} from "../../common/js/helpers";

Barba.BaseView.extend({
    namespace: 'order-processing',
    onEnter() {

    },
    async onEnterCompleted() {
        nGetBody().classList.add('no-footer');
        await commonComponents.preloader.preloading;
        objectFitPolyfill();
    },
    onLeave() {
        nGetBody().classList.remove('no-footer');
    },
    onLeaveCompleted() {

    },
}).init();
