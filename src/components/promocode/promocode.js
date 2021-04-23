import $ from 'jquery';
import Component from '../../common/js/component';

class Promocode extends Component {

    get val() {
        return this.input.value;
    }

    constructor(nRoot) {
        super(nRoot, 'promocode');

        this.input = this.nFindSingle('input')

        this.choice = this.choice.bind(this);
        // this.return = this.return.bind(this);

        this.returning = () => {
            if(this.val === '') {
                this.return();
            }
        };

        this.input.addEventListener('focus', this.choice, true);
        this.input.addEventListener('blur', this.returning, true);


    }

    choice() {
        this.nRoot.classList.add('_is-active');
    }
    return() {
        this.nRoot.classList.remove('_is-active');
    }


    destroy() {
        this.input.removeEventListener('focus', this.choice, true);
        this.input.removeEventListener('blur', this.returning, true);
    }
}

export default Promocode;
