import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js';
import Preloader from '../../components/preloader/preloader';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Callbacks from '../../components/callbacks/callbacks';
import Modal from '../../components/modal/modal';

const commonComponents = {};
const initCommonComponents = () => {
    commonComponents.preloader = new Preloader(document.querySelector('.preloader'));
    commonComponents.header = new Header(document.querySelector('.header'));
    commonComponents.footer = new Footer(document.querySelector('.footer'));
    commonComponents.callbacks = new Callbacks();
    commonComponents.ctrl = new ScrollMagic.Controller();

    if (document.querySelector('.modal_cart')) {
        commonComponents.cartModal = new Modal(document.querySelector('.modal_cart'));
    };

    if(document.querySelector('.modal_search')) {
        commonComponents.searchModal = new Modal(document.querySelector('.modal_search'));
    };


};
export {
    initCommonComponents,
    commonComponents,
};
