import Barba from 'barba.js';
import { nFindComponent, nFindComponents, nGetBody } from '../../common/js/helpers';
import { commonComponents } from '../../common/js/commonComponents';
import VideoBlock from '../../components/video-block/video-block';
import { destroyShiftBottomAnim, prepareForShiftBottomAnim } from '../../components/header/animations';

Barba.BaseView.extend({
    namespace: 'project',
    onEnter() {

    },
    async onEnterCompleted() {
        if (nFindComponent('video-block', this.nRoot)) {
            this.videoBlocks = nFindComponents('video-block').map(videoBlocks => new VideoBlock(videoBlocks));
        }
        await commonComponents.preloader.preloading;
        prepareForShiftBottomAnim(nGetBody(), window.innerHeight, true);
        objectFitPolyfill();
    },
    onLeave() {
        destroyShiftBottomAnim();
        this.videoBlocks.map(videoBlocks => videoBlocks.destroy());
    },
    onLeaveCompleted() {

    },
}).init();
