import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import { destroyShiftBottomAnim, prepareForShiftBottomAnim } from '../../components/header/animations';
import { nGetBody } from '../../common/js/helpers';

Barba.BaseView.extend({
    namespace: 'article',
    onEnter() {

    },
    async onEnterCompleted() {
        await commonComponents.preloader.preloading;
        prepareForShiftBottomAnim(nGetBody(), window.innerHeight, true);
        objectFitPolyfill();
    },
    onLeave() {
        destroyShiftBottomAnim();
    },
    onLeaveCompleted() {

    },
}).init();
