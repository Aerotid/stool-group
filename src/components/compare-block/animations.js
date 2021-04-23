import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js';
import { commonComponents } from '../../common/js/commonComponents';

let scene = null;

export const initStickySlider = (nItem) => {
    scene = new ScrollMagic.Scene({
        triggerElement: nItem,
        triggerHook: 0,
    })
        .setPin(nItem, { pushFollowers: false })
        .setClassToggle(nItem, 'sticky')
        .addTo(commonComponents.ctrl);
};


export const destroyStickySlider = (section, contrastHeader = true) => {
    if (scene) {
        scene.destroy();
    }
};
