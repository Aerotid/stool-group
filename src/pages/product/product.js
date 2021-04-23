import Barba from 'barba.js';
import { nFindComponent, nFindComponents, nGetBody } from '../../common/js/helpers';
import { commonComponents } from '../../common/js/commonComponents';
import ScrollUp from '../../components/scroll-up/scroll-up';
import ProductInterface from '../../components/product-interface/product-interface';
import ProductSlider from '../../components/product-slider/product-slider';
import ProductList from '../../components/product-list/product-list';
import Characteristics from '../../components/characteristics/characteristics';
import SpoilerReviews from '../../components/spoiler-reviews/spoiler-reviews';
import ProductGallery from '../../components/product-gallery/product-gallery';
import RateValue from '../../components/rate-value/rate-value';
import Modal from '../../components/modal/modal';
import { prepareForShiftBottomAnim } from '../../components/header/animations';

Barba.BaseView.extend({
    namespace: 'product',
    onEnter() {

    },
    async onEnterCompleted() {
        prepareForShiftBottomAnim(nGetBody(), window.innerHeight, true);
        this.nScrollUp = new ScrollUp(nFindComponent('scroll-up'));
        this.productSlider = new ProductSlider(nFindComponent('product-slider'));
        this.characteristics = new Characteristics(nFindComponent('characteristics'));
        this.spoilerReviews = new SpoilerReviews(nFindComponent('spoiler-reviews'));
        this.productGallery = new ProductGallery(nFindComponent('product-gallery'));
        this.nProductLists = nFindComponents('product-list').map((nProductList, index) => new ProductList(nProductList, index));
        this.rateValue = new RateValue(nFindComponent('rate-value'));
        this.modal = new Modal(nFindComponent('modal-scroll'));
        await commonComponents.preloader.preloading;
        this.productInterface = new ProductInterface(nFindComponent('product-interface'), document.querySelector('.product__offset'));
        objectFitPolyfill();
    },
    onLeave() {
        this.nScrollUp.destroy();
        this.productSlider.destroy();
        this.characteristics.destroy();
        this.spoilerReviews.destroy();
        this.productGallery.destroy();
        this.modal.destroy();
        this.rateValue.destroy();
        this.nProductLists.forEach(item => item.destroy());
        this.productInterface.destroy();
    },
    onLeaveCompleted() {

    },
}).init();
