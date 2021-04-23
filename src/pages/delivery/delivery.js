import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import {nFindComponent, nFindComponents} from "../../common/js/helpers";
import FlexibleForm from "../../components/flexible-form/flexible-form";

Barba.BaseView.extend({
    namespace: 'text',
    onEnter() {

    },
    async onEnterCompleted() {
        if (nFindComponent('flexible-form')) {
            this.nFlexibleForms = nFindComponents('flexible-form').map(item => new FlexibleForm(item));
        }
        await commonComponents.preloader.preloading;
        objectFitPolyfill();
    },
    onLeave() {

    },
    onLeaveCompleted() {

    },
}).init();
