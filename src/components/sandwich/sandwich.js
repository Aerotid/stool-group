import Component from '../../common/js/component';
import {getDeviceType, listen, unlisten, Resize, nGetBody} from '../../common/js/helpers';
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';
import $ from 'jquery';

class Sandwich extends Component {
    constructor(nRoot) {
        super(nRoot, 'sandwich');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);

        this.resize = new Resize();
        listen('deviceType:after-resize', this.afterResize);

        this.openCurrentMenu = this.openCurrentMenu.bind(this);
        this.nFindSingle('items').addEventListener('click', this.openCurrentMenu);

        this.closeCurrentMenu = this.closeCurrentMenu.bind(this);
        this.closeAllMenus = this.closeAllMenus.bind(this);
        listen('sandwichMenu:close', this.closeAllMenus);

        // listen('sandwichMenu:open', () => {
        //     disableBodyScroll(this.nRoot);
        // });
        //
        // listen('sandwichMenu:close', () => {
        //     enableBodyScroll(this.nRoot);
        // });
    }

    openCurrentMenu(e) {
        this.currentMenu = e.target.querySelector('.sandwich__sub-items');

        if (this.currentMenu) {
            this.currentMenu.classList.add('selected');

            this.nFindSingle('items').removeEventListener('click', this.openCurrentMenu);
            this.currentMenu.querySelector('.sandwich__back').addEventListener('click', this.closeCurrentMenu);
            this.currentStateMenu = true;
        }
    }

    closeCurrentMenu() {
        if (this.currentMenu.classList.contains('selected')) {
            this.currentMenu.classList.remove('selected');
            this.nFindSingle('items').addEventListener('click', this.openCurrentMenu);
            this.currentStateMenu = false;
        }
    }

    closeAllMenus() {
        if (this.currentStateMenu) {
            this.currentMenu.classList.remove('selected');
            this.nFindSingle('items').addEventListener('click', this.openCurrentMenu);
        }
    }

    afterResize() {
        if (getDeviceType() !== this.currentDevice) {
            if (getDeviceType() === 'desktop') {
                $(document.querySelector('.modal_sandwich')).modal('hide');
                nGetBody().classList.remove('sandwich-open');
            }
            this.currentDevice = getDeviceType();
        }
    }

    destroy() {
        unlisten('deviceType:after-resize', this.afterResize);
    }
}

export default Sandwich;
