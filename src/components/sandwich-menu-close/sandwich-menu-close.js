import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { nFindComponent, nGetBody } from '../../common/js/helpers';
import Component from '../../common/js/component';

class SandwichMenuClose extends Component {
  constructor(nRoot) {
    super(nRoot, 'sandwich-menu-close');

    this.close = this.close.bind(this);
    this.nRoot.addEventListener('click', this.close);

    this.addTransitionSandwichBtn = this.addTransitionSandwichBtn.bind(this);
  }

  close() {
    nGetBody().classList.remove('sandwich-open');

    enableBodyScroll(nFindComponent('sandwich-menu'));

    nFindComponent('sandwich-menu-close').classList.remove('sandwich-menu-close_transition');

    nFindComponent('sandwich-menu').addEventListener('transitionend', this.addTransitionSandwichBtn);
  }

  addTransitionSandwichBtn() {
    nFindComponent('sandwich-menu').removeEventListener('transitionend', this.addTransitionSandwichBtn);
    nFindComponent('sandwich-btn').classList.remove('sandwich-btn_is-open');
  }


  destroy() {
    this.nRoot.removeEventListener('click', this.close);
    enableBodyScroll(nFindComponent('sandwich-menu'));
    clearAllBodyScrollLocks();
  }
}

export default SandwichMenuClose;
