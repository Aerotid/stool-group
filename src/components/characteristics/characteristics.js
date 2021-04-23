import Component from '../../common/js/component';
import { nFindComponents } from '../../common/js/helpers';

class Characteristics extends Component {
    constructor(nRoot) {
        super(nRoot, 'characteristics');
        this.nCarouselItems = this.nFindSingle('items');
        this.nItemsColor = nFindComponents('characteristics__item', this.nCarouselItems);

        this.setActiveColor = this.setActiveColor.bind(this);
        if (this.nCarouselItems) {
            this.nCarouselItems.addEventListener('click', this.setActiveColor);
        }
    }

    setActiveColor(e) {
        if (!e.target.classList.contains('active')) {
            this.nItemsColor.map((nColor) => {
                nColor.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    }

    destroy() {

    }
}

export default Characteristics;
