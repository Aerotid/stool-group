import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import { nFindComponent, nFindComponents, nGetBody } from '../../common/js/helpers';
import ScrollUp from '../../components/scroll-up/scroll-up';
import ProductList from '../../components/product-list/product-list';
import ProductSlider from '../../components/product-slider/product-slider';
import CollectionQuote from '../../components/collection-quote/collection-quote';
import CollectionList from '../../components/collection-list/collection-list';
import { prepareForShiftBottomAnim } from '../../components/header/animations';

Barba.BaseView.extend({
    namespace: 'collection',
    onEnter() {

    },
    async onEnterCompleted() {
        prepareForShiftBottomAnim(nGetBody(), window.innerHeight, true);
        this.scrollUp = new ScrollUp(nFindComponent('scroll-up'));
        this.nProductLists = nFindComponents('product-list').map((nProductList, index) => new ProductList(nProductList, index));
        this.collectionQuote = new CollectionQuote(nFindComponent('collection-quote'));
        this.collectionList = new CollectionList(nFindComponent('collection-list'));
        this.productSlider = new ProductSlider(nFindComponent('product-slider'));
        await commonComponents.preloader.preloading;
        objectFitPolyfill();
    },
    onLeave() {
        this.scrollUp.destroy();
        this.nProductLists.forEach(item => item.destroy());
        this.collectionQuote.destroy();
        this.collectionList.destroy();
        this.productSlider.destroy();
    },
    onLeaveCompleted() {

    },
}).init();
