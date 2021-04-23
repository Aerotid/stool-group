import Barba from 'barba.js';
import {commonComponents} from '../../common/js/commonComponents';
import {nFindComponents, nFindComponent, nGetBody} from '../../common/js/helpers';
import Catalog from '../../components/catalog/catalog';
import Sorting from '../../components/sorting/sorting';
import ProductFilters from '../../components/product-filters/product-filters';
import ShiftingBlockControls from '../../components/shifting-block-controls/shifting-block-controls';
import {prepareForShiftBottomAnim, destroyShiftBottomAnim} from '../../components/header/animations';
import ProductList from '../../components/product-list/product-list';

Barba.BaseView.extend({
    namespace: 'catalog',
    onEnter() {

    },

    async onEnterCompleted() {
        if (!nGetBody().classList.contains('no-cs-cart')) {
            require('../../vendor/tygh/product_filters');
        }
        prepareForShiftBottomAnim(nGetBody(), window.innerHeight, true);

        this.nProductLists = nFindComponents('product-list').map((nProductList, index) => new ProductList(nProductList, index));

        if (nFindComponent('catalog')) {
            this.catalog = new Catalog(nFindComponent('catalog'));
        }
        if (nFindComponent('shifting-block-controls', this.nRoot)) {
            this.shiftingBlockControls = new ShiftingBlockControls(nFindComponent('shifting-block-controls', this.nRoot));
        }
        if (nFindComponent('sorting', this.nRoot)) {
            this.sorting = new Sorting(nFindComponent('sorting', this.nRoot));
        }
        if (nFindComponent('product-filters')) {
            this.productFilters = new ProductFilters(nFindComponent('product-filters'), this.nRoot);
        }

        await commonComponents.preloader.preloading;
        objectFitPolyfill();
    },

    onLeave() {
        if (!nGetBody().classList.contains('no-cs-cart')) {
            delete require.cache[require.resolve('../../vendor/tygh/product_filters')];
        }
        destroyShiftBottomAnim();
        if (this.catalog) this.catalog.destroy();
        if (this.shiftingBlockControls) this.shiftingBlockControls.destroy();
        if (this.sorting) this.sorting.destroy();
        if (this.productFilters) this.productFilters.destroy();
    },
    onLeaveCompleted: () => {

    },
}).init();
