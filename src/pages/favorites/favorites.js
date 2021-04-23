import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import Catalog from '../../components/catalog/catalog';
import {nFindComponent} from "../../common/js/helpers";

Barba.BaseView.extend({
    namespace: 'favorites',
    onEnter() {

    },
    async onEnterCompleted() {
        this.catalog = new Catalog(nFindComponent('catalog'));
        await commonComponents.preloader.preloading;
        objectFitPolyfill();
    },
    onLeave() {
        this.catalog.destroy();
    },
    onLeaveCompleted() {

    },
}).init();
