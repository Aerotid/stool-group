import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import {nFindComponents, nFindComponent, nGetBody} from "../../common/js/helpers";
import Catalog from "../../components/catalog/catalog";
import Sorting from '../../components/sorting/sorting';
import ProductFilters from '../../components/product-filters/product-filters';
import ShiftingBlockControls from '../../components/shifting-block-controls/shifting-block-controls';
import { prepareForShiftBottomAnim } from '../../components/header/animations';



Barba.BaseView.extend({
    namespace: 'search',
    onEnter() {

    },
    async onEnterCompleted() {
        prepareForShiftBottomAnim(nGetBody(), window.innerHeight, true);

        if(nFindComponent('catalog')) {
            this.catalog = new Catalog(nFindComponent('catalog'));
        }
        if(nFindComponent('shifting-block-controls', this.nRoot)) {
            this.shiftingBlockControls = new ShiftingBlockControls(nFindComponent('shifting-block-controls', this.nRoot));
        }
        if(nFindComponent('sorting', this.nRoot)) {
            this.sorting = new Sorting(nFindComponent('sorting', this.nRoot));
        }
        if(nFindComponent('product-filters')) {
            this.productFilters = new ProductFilters(nFindComponent('product-filters'), this.nRoot);
        }

        await commonComponents.preloader.preloading;
        objectFitPolyfill();
    },
    onLeave() {
        if(this.catalog) this.catalog.destroy();
        if(this.shiftingBlockControls) this.shiftingBlockControls.destroy();
        if(this.sorting) this.sorting.destroy();
        if(this.productFilters) this.productFilters.destroy();
    },
    onLeaveCompleted() {

    },
}).init();
