import Component from '../../common/js/component';
import {nFindComponent, nFindComponents} from '../../common/js/helpers';

class Sorting extends Component {
    constructor(nRoot) {
        super(nRoot, 'sorting');

        this.nHeadTitle = nFindComponent('spoiler__title', this.nRoot);
        this.soritngList = nFindComponent('sorting__list', this.nRoot);
        this.soritngItem = nFindComponents('sorting__list-item-link', this.nRoot);

        this.change = this.change.bind(this);

        this.soritngList.addEventListener('click', this.change, true);


    }

    change(e) {
      const target = e.target;
      if(target.classList.contains('sorting__list-item-link')) {
          this.soritngItem.forEach(item => item.classList.remove('_active'));
          // this.activeElementContent = target.innerHTML;
          this.nHeadTitle.innerHTML = target.innerHTML;
          target.classList.add('_active');
      }

    }

    default() {
        this.soritngItem.forEach(item => item.classList.remove('_active'));
        this.soritngItem[0].classList.add('_active');
        this.nHeadTitle.innerHTML = this.soritngItem[0].innerHTML;
    }


  destroy() {
      this.soritngList.removeEventListener('click', this.change, true);
  }
}

export default Sorting;
