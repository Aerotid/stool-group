import Component from '../../common/js/component';
import {listen, unlisten} from '../../common/js/helpers';

class ScrollGallery extends Component {
    constructor(nRoot) {
        super(nRoot, 'scroll-gallery');
        this.nImages = this.nFind('item');

        this.scrollingIt = this.scrollingIt.bind(this);
        this.shownModal = this.shownModal.bind(this);
        listen('modal:request-modal-opened', this.shownModal);
    }

    scrollToIndex(e) {
        this.nScrollIndex = e.target.getAttribute('data-image');
        this.toScrollImage = this.nImages[this.nScrollIndex];
    }

    scrollingIt() {
        this.scrollY = this.toScrollImage.offsetTop + ((this.toScrollImage.offsetHeight - window.innerHeight) / 2);
        //document.querySelector('.modal-scroll').scrollTo(0, this.scrollY);
        TweenLite.to(document.querySelector('.modal-scroll'), 0, {
            scrollTo: { y: this.scrollY, x: 0 },
        });
    }

    shownModal() {
        this.scrollingIt();
    }

    destroy() {
        unlisten('modal:request-modal-opened', this.shownModal);
    }
}

export default ScrollGallery;
