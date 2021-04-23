import Component from '../../common/js/component';

class ButtonFavorite extends Component {
    constructor(nRoot) {
        super(nRoot, 'button-favorite');
        // this.addProduct = this.addProduct.bind(this);
        // this.nRoot.addEventListener('click', this.addProduct);
    }

    addProduct(e) {
        if (e.target.closest(`.${this.componentName}`).classList.contains('active')) {
            e.target.closest(`.${this.componentName}`).classList.remove('active');
        } else {
            e.target.closest(`.${this.componentName}`).classList.add('active');
        }
    }

    destroy() {

    }
}

export default ButtonFavorite;
