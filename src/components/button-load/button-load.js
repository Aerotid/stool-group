import Component from '../../common/js/component';
import {emit} from "../../common/js/helpers";

class ButtonLoad extends Component {
    constructor(nRoot, parent) {
        super(nRoot, 'button-load');
        this.parent = parent;
        this.click = this.click.bind(this);
        this.nRoot.addEventListener('click', this.click);
    }

    click() {
        emit('buttonLoad:load', null, false, this.parent);
    }

    refresh() {
        if (this.nRoot.getAttribute('data-total-product') > 0) {
            this.nRoot.setAttribute('data-total-product', this.nRoot.getAttribute('data-total-product') - 1);
        }
    }

    destroy() {

    }
}

export default ButtonLoad;
