import Component from '../../common/js/component';
import ProductCard from '../../components/product-card/product-card'
import {nFindComponents, nFindComponent, listen} from '../../common/js/helpers';
import FavoritesCounter from '../../components/favorites-counter/favorites-counter';
import ButtonLoad from "../button-load/button-load";
import {commonComponents} from "../../common/js/commonComponents";

class Catalog extends Component {
    constructor(nRoot) {
        super(nRoot, 'catalog');

        this.nCards = nFindComponents('product-card', this.nRoot);
        this.nProductCards = nFindComponents('product-card_no-init', this.nRoot).map(nProductCard => new ProductCard(nProductCard));

        this.productsCount = this.nFind('item').length;

        if (document.querySelector('.favorites-counter')) {
            this.favoritesCounter = new FavoritesCounter(nFindComponent('favorites-counter'), this.productsCount);
        }

        if (nFindComponent('button-load', this.nRoot)) {
            this.buttonLoad = new ButtonLoad(nFindComponent('button-load', this.nRoot));
            this.reInit = this.reInit.bind(this);
            listen('buttonLoad:load', this.reInit);
        }
    }

    reInit() {
        setTimeout(() => {
            commonComponents.preloader.lazyLoad.update(
                nFindComponents('product-card_no-init', this.nRoot).forEach(nProductCard => new ProductCard(nProductCard))
            );
        }, 2000);
    }

    destroy() {
        this.nProductCards.forEach(item => item.destroy());
        if (document.querySelector('.favorites-counter')) {
            this.favoritesCounter.destroy();
        }
    }
}

export default Catalog;
