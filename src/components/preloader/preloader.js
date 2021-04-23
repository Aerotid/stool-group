import Component from '../../common/js/component';
import {loadImages, nGetBody, delay, callbackExit, callbackLoaded} from '../../common/js/helpers';
import {commonComponents} from "../../common/js/commonComponents";
import LazyLoad from "vanilla-lazyload";


class Preloader extends Component {
    constructor(nRoot) {
        super(nRoot, 'preloader');
        this.lazyLoad = new LazyLoad({
            elements_selector: ".lazy",
            callback_exit: callbackExit,
            callback_loaded: callbackLoaded,
        });
        const playbackOverPromise = async () => {
            if (this.lazyLoad._elements.length === 0) {
                this.preloaderCounter = this.nFindSingle('progress-bar');
                this.preloaderCounter.style.width = '100%';
            }
            return this.lazyLoad;
            // return loadImages();
        };

        this.preloading = Promise.all([
            playbackOverPromise(),
        ])
            .then(() => {
                return delay(2000);
            })
            .then(() => {
                nGetBody()
                    .classList
                    .remove('preloading');
                nGetBody()
                    .style
                    .removeProperty('height');
                this.hide();
            });
    }

    hide() {
        this.nRoot.classList.add('smooth-hide');
    }

    destroy() {

    }
}

export default Preloader;
