import Component from '../../common/js/component';
import MorphSvg from '../morph-svg/morph-svg';
import {nFindComponent} from '../../common/js/helpers';

class CollectionQuote extends Component {
    constructor(nRoot) {
        super(nRoot, 'collection-quote');
        this.nMorphSvg = new MorphSvg(nFindComponent('morph-svg', this.nRoot));
    }

    destroy() {
        this.nMorphSvg.destroy();
    }
}

export default CollectionQuote;
