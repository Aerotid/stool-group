import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import {commonComponents} from '../../common/js/commonComponents';
import {innerHeight} from '../../common/js/helpers';
// import 'debug.addIndicators';

const controller = new ScrollMagic.Controller();
let durationValueCache = 200;

let fullContainer;
let shortContainer;
let defaultHeight;
let offsetContainer;
let headerHeight = 0;

let scrollInterface = new ScrollMagic.Scene();
let stateInterface = false;

export const positionSticky = (nContainer, innerContainer) => {
    fullContainer = nContainer;
    shortContainer = innerContainer;
    stateInterface = true;

    if (window.innerHeight > 810) {
        offsetContainer = 80;
    } else {
        offsetContainer = 0;
    }

    defaultHeight = (shortContainer.offsetHeight * 0.95 / window.innerHeight).toFixed(2);
    if (defaultHeight > 1) {
        defaultHeight = 1 - (defaultHeight - 1);
    }

    scrollInterface.duration(durationValueCache);
    scrollInterface.triggerHook(+defaultHeight);
    scrollInterface.triggerElement(fullContainer);
    scrollInterface.setPin(shortContainer, {pushFollowers: false});
    scrollInterface.offset(shortContainer.offsetHeight - offsetContainer);
    // scrollInterface.addIndicators({ name: '[ trigger ]' });
    scrollInterface.on('start', () => {
        updateDuration();
    });
    scrollInterface.addTo(controller);
};

export const updateDuration = (stickyHeader = false) => {

    if (stateInterface) {
        defaultHeight = (shortContainer.offsetHeight * 0.95 / window.innerHeight).toFixed(2);
        if (defaultHeight > 1) {
            defaultHeight = 1 - (defaultHeight - 1);
        }

        if (window.innerHeight > 810) {
            offsetContainer = 80;
        } else {
            offsetContainer = 0;
        }
        if (stickyHeader) {
            headerHeight = innerHeight(commonComponents.header.nFirstPart);
        }

        durationValueCache = fullContainer.offsetHeight - shortContainer.offsetHeight - headerHeight - 100;
        if (durationValueCache < 0) {
            durationValueCache = 100;
        }

        scrollInterface.duration(durationValueCache);
        scrollInterface.triggerHook(+defaultHeight);
        scrollInterface.offset(shortContainer.offsetHeight - offsetContainer);
    }
};

export const disabledScrollInterface = () => {
    if (stateInterface) {
        scrollInterface.progress(0);
        scrollInterface.enabled(false);
    }
};

export const initScrollInterface = () => {
    if (stateInterface) {
        scrollInterface.enabled(true);
    }
};
