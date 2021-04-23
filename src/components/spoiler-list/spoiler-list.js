import $ from 'jquery';
import Component from '../../common/js/component';
import { emit } from '../../common/js/helpers';

class SpoilerList extends Component {
    constructor(nRoot) {
        super(nRoot, 'spoiler-list');
        this.requestIscrollRefresh = this.requestIscrollRefresh.bind(this);

        this.spoilers = this.nFind('item');
        this.spoilers.forEach((spoiler) => {
            $(spoiler).on('shown.bs.collapse', this.requestIscrollRefresh);
            $(spoiler).on('hidden.bs.collapse', this.requestIscrollRefresh);
        });

        this.scrollTo = this.scrollTo.bind(this);
        this.nSpoilerDescription = this.nFindSingle('description');
        this.nSpoilerCollapse = this.nFindSingle('collapse');
    }

    scrollTo(e) {
        e.preventDefault();
        $(this.nSpoilerCollapse).collapse('show');

        TweenLite.to(window, 1, {
            scrollTo: {
                y: this.nSpoilerDescription,
                offsetY: 100,
            },
        });
    }

    requestIscrollRefresh() {
        emit('collapse:request-collapse-refresh');
    }

    destroy() {
        this.spoilers.forEach((spoiler) => {
            $(spoiler).off('shown.bs.collapse', this.requestIscrollRefresh);
            $(spoiler).off('hidden.bs.collapse', this.requestIscrollRefresh);
        });
    }
}

export default SpoilerList;
