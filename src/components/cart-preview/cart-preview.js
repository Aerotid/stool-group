import Component from '../../common/js/component';
import Promocode from '../../components/promocode/promocode';


class CartPreview extends Component {
    constructor(nRoot) {
        super(nRoot, 'cart-preview');

        if (this.nFindSingle('promocode')) {
            this.promocode = new Promocode(this.nFindSingle('promocode'));
        }


    }

    destroy() {
        if (this.promocode) this.promocode.destroy();
    }
}

export default CartPreview;
