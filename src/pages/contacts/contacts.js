import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import LocationList from '../../components/location-list/location-list';
import {nFindComponent, nGetBody} from "../../common/js/helpers";
import {prepareForShiftBottomAnim} from "../../components/header/animations";

Barba.BaseView.extend({
    namespace: 'contacts',
    onEnter() {

    },
    async onEnterCompleted() {
        await commonComponents.preloader.preloading;
        prepareForShiftBottomAnim(nGetBody(), window.innerHeight, true);
        this.nLocationList = new LocationList(nFindComponent('location-list'));
        objectFitPolyfill();
    },
    onLeave() {

    },
    onLeaveCompleted() {
        this.nLocationList.destroy();
    },
}).init();
