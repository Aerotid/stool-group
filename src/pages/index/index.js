import Barba from 'barba.js';
import { nFindComponent, nFindComponents, nGetBody } from '../../common/js/helpers';
import { commonComponents } from '../../common/js/commonComponents';
import { prepareForShiftBottomAnim, destroyShiftBottomAnim } from '../../components/header/animations';
import MainSlider from '../../components/main-slider/main-slider';
import ScrollUp from '../../components/scroll-up/scroll-up';
import ProductList from '../../components/product-list/product-list';
import ProjectList from '../../components/project-list/project-list';
import InstagramList from '../../components/instagram-list/instagram-list';

Barba.BaseView.extend({
    namespace: 'index',
    onEnter() {

    },
    async onEnterCompleted() {
        // this.logo = nFindComponent('header__logo', commonComponents.header.nRoot);
        // this.logo.classList.add('no-pointer-event');
        this.nMainSlider = nFindComponents('main-slider')
            .map(nMainSlider => new MainSlider(nMainSlider));
        this.nScrollUp = new ScrollUp(nFindComponent('scroll-up'));
        this.nProductLists = nFindComponents('product-list').map((nProductList, index) => new ProductList(nProductList, index));
        this.nProjectList = new ProjectList(nFindComponent('project-list'));
        this.nInstagramList = new InstagramList(nFindComponent('instagram-list'));
        await commonComponents.preloader.preloading;
        prepareForShiftBottomAnim(nGetBody(), window.innerHeight, true);
        objectFitPolyfill();
    },
    onLeave() {
        destroyShiftBottomAnim();
        this.nMainSlider.forEach(item => item.destroy());
        this.nScrollUp.destroy();
        this.nProductLists.forEach(item => item.destroy());
        this.nProjectList.destroy();
        this.nInstagramList.destroy();
    },
    onLeaveCompleted() {

    },
}).init();
