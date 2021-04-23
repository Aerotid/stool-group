import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';
import Component from '../../common/js/component';
import {nGetBody, nFindComponent, nFindComponents, emit} from '../../common/js/helpers';
import Sandwich from '../sandwich/sandwich';


class SandwichBtn extends Component {
    constructor(nRoot) {
        super(nRoot, 'sandwich-btn');

        this.open = this.open.bind(this);
        this.nRoot.addEventListener('click', this.open);

        this.nSandwich = new Sandwich(nFindComponent('sandwich'));

        this.addTransitionInSandwichBtnClose = this.addTransitionInSandwichBtnClose.bind(this);
        this.openEnterPress = this.openEnterPress.bind(this);
        this.nRoot.addEventListener('keypress', this.openEnterPress);
    }

    open() {
        if (!nGetBody().classList.contains('sandwich-open')) {
            nGetBody().classList.add('sandwich-open');
            this.nRoot.classList.add('sandwich-btn_opened');
            emit('sandwichMenu:open');
        } else {
            nGetBody().classList.remove('sandwich-open');
            this.nRoot.classList.remove('sandwich-btn_opened');
            emit('sandwichMenu:close');
        }
        // this.nRoot.classList.add('sandwich-btn_is-open');
        // disableBodyScroll(nFindComponent('sandwich-menu'));

        // emit('sandwichMenu:open');
        // nFindComponent('sandwich-menu__footer').addEventListener('transitionend', this.addTransitionInSandwichBtnClose);
        // nFindComponents('sandwich-menu__link', nFindComponent('sandwich-menu')).forEach((link, index) => {
        //     link.setAttribute('tabindex', `${index + 2}`);
        // });
    }

    openEnterPress(event) {
        // if (event.keyCode === 13 && document.activeElement === this.nRoot) {
        //     this.open();
        // }
    }

    addTransitionInSandwichBtnClose() {
        // nFindComponent('sandwich-menu__footer').removeEventListener('transitionend', this.addTransitionInSandwichBtnClose);
        // nFindComponent('sandwich-menu-close').classList.add('sandwich-menu-close_transition');
    }

    destroy() {
        // this.nRoot.removeEventListener('click', this.open);
        // enableBodyScroll(nFindComponent('sandwich-menu'));
        // clearAllBodyScrollLocks();
        // this.nRoot.removeEventListener('keypress', this.openEnterPress);
        // nFindComponents('sandwich-menu__link', nFindComponent('sandwich-menu')).forEach((link, index) => {
        //     link.removeAttribute('tabindex', `${index + 2}`);
        // });
    }
}

export default SandwichBtn;
