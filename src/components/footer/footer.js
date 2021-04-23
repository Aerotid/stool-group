import Component from '../../common/js/component';
import Subscribe from '../../components/subscribe/subscribe';
import { nFindComponent } from "../../common/js/helpers";

class Footer extends Component {
    constructor(nRoot) {
        super(nRoot, 'footer');
        this.subscribe = new Subscribe(nFindComponent('subscribe'));
    }

    destroy() {
        this.subscribe.destroy();
    }
}

export default Footer;
