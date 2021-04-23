import Component from '../../common/js/component';
import SandwichBtn from '../sandwich-btn/sandwich-btn';
import {nFindComponent, nFindComponents} from '../../common/js/helpers';
import HeaderSubmenu from '../header-submenu/header-submenu';
import FlexibleForm from '../flexible-form/flexible-form';
import Notification from '../notification/notification';

class Header extends Component {
    constructor(nRoot) {
        super(nRoot, 'header');
        this.nRoot.classList.add('header_top');
        this.nFirstPart = this.nFindSingle('wrapper');
        this.nSecondPart = this.nFindSingle('submenu');
        // this.sandwichBtn = new SandwichBtn(nFindComponent('sandwich-btn', this.nRoot));
        this.addContrastClass = this.addContrastClass.bind(this);
        // this.addContrastClass();
        this.nHeaderSubmenu = new HeaderSubmenu(nFindComponent('header-submenu'));
        this.nSandwichBtn = new SandwichBtn(nFindComponent('sandwich-btn'));
        if (nFindComponent('flexible-form')) {
            this.nFlexibleForms = nFindComponents('flexible-form').map(item => new FlexibleForm(item));
        }
        this.notification = new Notification(nFindComponent('notification'));
    }

    addContrastClass() {
        this.nRoot.classList.add('contrast');
    }

    destroy() {
        this.nSecondPart.destroy();
        this.nHeaderSubmenu.destroy();
        this.nSandwich.destroy();
        this.nSandwichBtn.destroy();
        if (nFindComponent('flexible-form')) {
            this.nFlexibleForms.map(item => item.destroy());
        }
        this.notification.destroy();
    }
}

export default Header;
