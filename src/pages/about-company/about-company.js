import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import ScrollUp from '../../components/scroll-up/scroll-up';
import {nFindComponent, nGetBody} from "../../common/js/helpers";
import { prepareForShiftBottomAnim, destroyShiftBottomAnim } from '../../components/header/animations';

Barba.BaseView.extend({
    namespace: 'about-company',
    onEnter() {

    },
    async onEnterCompleted() {
        this.nScrollUp = new ScrollUp(nFindComponent('scroll-up'));
        prepareForShiftBottomAnim(nGetBody(), window.innerHeight, true);

        await commonComponents.preloader.preloading;
        objectFitPolyfill();
    },
    onLeave() {
        destroyShiftBottomAnim();
        this.nScrollUp.destroy();
    },
    onLeaveCompleted() {

    },
}).init();
