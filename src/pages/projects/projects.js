import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import ProjectList from '../../components/project-list/project-list';
import { nFindComponent, nGetBody } from '../../common/js/helpers';
import { destroyShiftBottomAnim, prepareForShiftBottomAnim } from '../../components/header/animations';

Barba.BaseView.extend({
    namespace: 'projects',
    onEnter() {

    },
    async onEnterCompleted() {
        this.nProjectList = new ProjectList(nFindComponent('project-list'));
        await commonComponents.preloader.preloading;
        prepareForShiftBottomAnim(nGetBody(), window.innerHeight, true);
        objectFitPolyfill();
    },
    onLeave() {
        destroyShiftBottomAnim();
        this.nProjectList.destroy();
    },
    onLeaveCompleted() {

    },
}).init();
