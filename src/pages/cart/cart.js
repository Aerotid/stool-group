import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import CartForm from "../../components/cart-form/cart-form";
import {nFindComponent, nGetBody} from "../../common/js/helpers";


Barba.BaseView.extend({
    namespace: 'cart',
    onEnter() {

    },
    async onEnterCompleted() {
        if(nFindComponent('cart-form', this.nRoot) !== 0) {
            this.cartForm = new CartForm(nFindComponent('cart-form', this.nRoot));
        }
        nGetBody().classList.add('no-footer');


        await commonComponents.preloader.preloading;
        objectFitPolyfill();
    },
    onLeave() {
        if(this.cartForm) this.cartForm.destroy();
        nGetBody().classList.remove('no-footer');
    },
    onLeaveCompleted() {

    },
}).init();
