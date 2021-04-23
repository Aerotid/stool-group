import Component from '../../common/js/component';
import RatingStar from '../../components/rating-star/rating-star';
import { nFindComponents } from "../../common/js/helpers";
import { updateDuration } from '../../components/product-interface/animations';
import $ from "jquery";

class SpoilerReviews extends Component {
    constructor(nRoot) {
        super(nRoot, 'spoiler-reviews');

        this.ratingStars = [];
        nFindComponents('rating-star').forEach((nItem, index) => {
            this.ratingStars[index] = new RatingStar(nItem);
        });

        this.updateSticky = this.updateSticky.bind(this);

        this.spoilers = this.nRoot;

        $(this.spoilers).on('shown.bs.collapse', this.updateSticky);
        $(this.spoilers).on('hidden.bs.collapse', this.updateSticky);
    }

    updateSticky() {
        updateDuration();
    }

    destroy() {
        this.ratingStars.forEach((item) => {
            item.destroy();
        });
    }
}

export default SpoilerReviews;
