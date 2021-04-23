import Barba from 'barba.js';
import debounce from 'lodash/debounce';
import Bowser from 'bowser';
import $ from 'jquery';
import lineClamp from 'line-clamp';
import { detect } from 'detect-browser';
import {
    DEBOUNCE_INTERVAL_MS,
    GRID_COLUMNS,
    MOBILE_MIN_WIDTH,
    FHD_WIDTH,
    SCREEN_MD_MIN_PX,
    SCREEN_XL_MIN_PX,
} from './variables';
import { commonComponents } from './commonComponents';
import '../../vendor/split-text/js/SplitTextPlugin';

const browser = detect();

let progress = 0;

export const listen = (evtType, handler, env = document) => {
    env.addEventListener(evtType, handler);
};
export const unlisten = (
    evtType,
    handler,
    env = document,
) => env.removeEventListener(evtType, handler);

export const emit = (
    evtType,
    evtData,
    shouldBubble = false,
    env = document,
) => {
    let evt;
    if (typeof CustomEvent === 'function') {
        evt = new CustomEvent(evtType, {
            detail: evtData,
            bubbles: shouldBubble,
        });
    } else {
        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }
    env.dispatchEvent(evt);
};

export const isFunction = obj => !!(obj && obj.constructor && obj.call && obj.apply);

export const delay = ms => new Promise((resolve) => {
    setTimeout(resolve, ms);
});

export const normalizeWheel = (event) => {
    let sX = 0;
    let sY = 0;
    let pX = 0;
    let pY = 0;

    if ('detail' in event) {
        sY = event.detail;
    }
    if ('wheelDelta' in event) {
        sY = -event.wheelDelta / 120;
    }
    if ('wheelDeltaY' in event) {
        sY = -event.wheelDeltaY / 120;
    }
    if ('wheelDeltaX' in event) {
        sX = -event.wheelDeltaX / 120;
    }

    if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
    }

    pX = sX * 10;
    pY = sY * 10;

    if ('deltaY' in event) {
        pY = event.deltaY;
    }
    if ('deltaX' in event) {
        pX = event.deltaX;
    }

    if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode === 1) {
            pX *= 40;
            pY *= 40;
        } else {
            pX *= 800;
            pY *= 800;
        }
    }

    if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
    }

    return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY,
    };
};

export const windowScrollTop = () => (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);

export const normalizeKey = (event) => {
    let code;
    if (event.key !== undefined) {
        code = event.key;
    } else if (event.keyIdentifier !== undefined) {
        code = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
        code = event.keyCode;
    }
    return code;
};

export const setProgress = (fullProgress) => {
    progress += 1;
    const preloaderCounter = document.querySelector('.preloader__progress-bar');
    preloaderCounter.style.width = `${Math.floor((progress / fullProgress) * 100)}%`;
};

export const loadImages = (nImages = [...document.querySelectorAll('img[data-src]')]) => {
    const fullProgress = nImages.length;
    let countProgress = 0;
    return Promise.all(nImages.map(nImage => new Promise((resolve) => {
        const wrapperResolve = (...args) => {
            countProgress += 1;
            setProgress(fullProgress, countProgress);
            resolve(...args);
        };
        nImage.setAttribute('src', nImage.getAttribute('data-src'));
        if (nImage.complete) {
            wrapperResolve();
        } else {
            nImage.addEventListener('load', wrapperResolve);
            nImage.addEventListener('error', wrapperResolve);
        }
    })));
};

export const callbackExit = () => {
    setProgress([...document.querySelectorAll('.lazy')].length);
};

export const callbackLoaded = () => {
    setProgress([...document.querySelectorAll('.lazy')].length);
};

export const isDirectEnter = () => Barba.Pjax.History.history.length === 1;

export const nodeFromHTML = (html) => {
    const wrapper = document.createElement('div');
    const trimmedHtml = html.trim();
    wrapper.innerHTML = trimmedHtml;
    return wrapper.firstChild;
};

export const arrNodesFromHTML = (html) => {
    const wrapper = document.createElement('div');
    const trimmedHtml = html.trim();
    wrapper.innerHTML = trimmedHtml;
    return [...wrapper.children];
};

export const offset = (el) => {
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const box = {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
        bottom: rect.bottom + scrollTop,
        right: rect.right + scrollLeft,
    };
    box.width = box.right - box.left;
    box.height = box.bottom - box.top;
    return box;
};

export const getElementWidth = (nElement) => {
    const computedStyle = getComputedStyle(nElement);
    return parseFloat(computedStyle.width);
};

export const innerHeight = (node) => {
    const computedStyle = getComputedStyle(node);
    const elementHeight = node.clientHeight;
    return elementHeight
        - parseFloat(computedStyle.paddingTop)
        - parseFloat(computedStyle.paddingBottom);
};

export const nFind = ({ itemName, nContainer = document, attrs }) => {
    let query = '';
    if (itemName) {
        query = `.${itemName}`;
    } else {
        query = '*';
    }

    if (attrs) {
        const attrsSelector = Object.keys(attrs).map(key => `[${key}="${attrs[key]}"]`).join('');
        query = `${query}${attrsSelector}`;
    }

    return [...nContainer.querySelectorAll(query)];
};

export const nFindSingle = (...args) => nFind(...args)[0];

export const nFindComponents = (itemName, nContainer) => nFind({ itemName: itemName, nContainer: nContainer });

export const nFindComponent = (itemName, nContainer) => nFind({ itemName: itemName, nContainer: nContainer })[0];

export const prependChild = (parent, child) => {
    if (parent.children.length === 0) {
        parent.appendChild(child);
    } else {
        parent.insertBefore(child, parent.children[0]);
    }
};

export const nGetBody = () => document.querySelector('body');

export class HeightBalancer {
    constructor(nodes = []) {
        this.nodes = nodes;
        this.update();
        this.update = debounce(this.update.bind(this), DEBOUNCE_INTERVAL_MS);
        window.addEventListener('resize', this.update);
    }

    addNode(node) {
        this.nodes.push(node);
    }

    update() {
        const maxHeight = Math.max(...this.nodes.map((node) => {
            node.style.height = 'auto';
            return innerHeight(node);
        }));
        this.nodes.forEach((node) => {
            node.style.height = `${maxHeight}px`;
        });
    }

    destroy() {
        window.removeEventListener('resize', this.update);
    }
}

export const smoothValue = (firstValue, secondValue, firstPoint, secondPoint, dimension) => {
    const sideSize = dimension === 'h'
        ? document.documentElement.clientHeight
        : document.documentElement.clientWidth;
    return firstValue
        + (secondValue - firstValue)
        * (sideSize - firstPoint)
        / (secondPoint - firstPoint);
};

export const calculateGridSideOffset = () => smoothValue(30, 80, MOBILE_MIN_WIDTH, FHD_WIDTH, 'w');

export const calculateColWidth = () => (document.documentElement.clientWidth / GRID_COLUMNS);

export const range = length => Array.apply(0, Array(length)).map((value, i) => i);

export const calcDistance = (x1, y1, x2, y2) => (((x2 - x1) ** 2) + ((y2 - y1) ** 2)) ** 0.5;

export const calcAngleBetween = (x1, y1, x2, y2) => {
    let alpha = Math.acos(
        (x1 * x2 + y1 * y2)
        / (
            calcDistance(0, 0, x1, y1)
            * calcDistance(0, 0, x2, y2)
        ),
    );
    if (y1 < 0) {
        alpha *= -1;
    }
    return alpha;
};

export const polarToDecart = (r, alpha) => ({
    x: r * Math.cos(alpha),
    y: r * Math.sin(alpha),
});

export const waitForEvent = (node, eventName) => new Promise((resolve, reject) => {
    node.addEventListener(eventName, resolve);
});

export const clearAnimation = (node) => {
    node.offsetWidth;
};

export const waitForGSAPAnimationEnd = timeline => new Promise((resolve) => {
    timeline.eventCallback('onComplete', resolve);
    timeline.eventCallback('onReverseComplete', resolve);
});

export const getDeviceType = () => {
    if (window.matchMedia(`(min-width: ${SCREEN_XL_MIN_PX}px)`).matches) {
        return 'desktop';
    }
    if (window.matchMedia(`(min-width: ${SCREEN_MD_MIN_PX}px)`).matches) {
        return 'tablet';
    }
    return 'mobile';
};

export const getOS = () => {
    switch (browser.os) {
        case 'iOS':
            return 'iOS';
        case 'Android':
            return 'Android';
        case 'Windows Phone':
            return 'Windows Phone';
        default:
            return 'desktop';
    }
};

export const isIE = () => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    return browser.parsedResult.browser.name === 'Internet Explorer';
};

export const isEdge = () => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    return browser.parsedResult.browser.name === 'Microsoft Edge';
};

export const pickRandomElement = a => {
    return a[Math.floor(a.length * Math.random())];
};

export const offsetSimpleBar = (el) => {
    const rect = el.getBoundingClientRect();
    const scrollLeft = document.querySelector('.simplebar-content').scrollLeft;
    const scrollTop = document.querySelector('.simplebar-content').scrollTop;
    const headerHeight = innerHeight(commonComponents.header.nRoot);
    const box = {
        top: rect.top + scrollTop - headerHeight,
        left: rect.left + scrollLeft,
        bottom: rect.bottom + scrollTop - headerHeight,
        right: rect.right + scrollLeft,
    };
    box.width = box.right - box.left;
    box.height = box.bottom - box.top;
    return box;
};

const preventer = (e) => {
    if (e.currentTarget.href === window.location.href) {
        e.preventDefault();
        e.stopPropagation();
    }
};

export const addLoopLinksPreventer = () => {
    const nLinks = [...document.querySelectorAll('a[href]')];
    nLinks.forEach(nLink => nLink.addEventListener('click', preventer));
};

export const removeLoopLinksPreventer = () => {
    const nLinks = [...document.querySelectorAll('a[href]')];
    nLinks.forEach(nLink => nLink.removeEventListener('click', preventer));
};

const transitionPreventer = (e) => {
    e.preventDefault();
    e.stopPropagation();
};

export const addTransitionPeventer = () => {
    const nLinks = [...document.querySelectorAll('a[href]')];
    nLinks.forEach(nLink => nLink.addEventListener('click', transitionPreventer));
};

export const removeTransitionPeventer = () => {
    const nLinks = [...document.querySelectorAll('a[href]')];
    nLinks.forEach(nLink => nLink.removeEventListener('click', transitionPreventer));
};

export const splitToLines = (node, className = '') => {
    $(node).splitText({ type: 'lines' });
    const nLines = [...node.querySelectorAll('.split-lines')];
    nLines.forEach(nLine => nLine.classList.add(className));
    const nStyles = document.querySelector('[rel="splitStyle"]');
    // иногда плагин не добавляет style
    if (nStyles) {
        nStyles.parentNode.removeChild(nStyles);
    }
    return nLines;
};


export const splitToLinesDestroy = () => {
    [...document.querySelectorAll('.hiddenText')].forEach(nItem => nItem.parentNode.removeChild(nItem));
};

export class Clamper {
    constructor(node, clampLineCount) {
        this.originalText = node.textContent;
        this.clampLineCount = clampLineCount;
        this.node = node;
        this.clamp();
        this.clamp = debounce(this.clamp.bind(this), DEBOUNCE_INTERVAL_MS);
        window.addEventListener('resize', this.clamp);
    }

    clamp() {
        this.node.textContent = this.originalText;
        lineClamp(this.node, this.clampLineCount);
    }

    destroy() {
        window.removeEventListener('resize', this.clamp);
    }
}

export const getNodeHTML = (node) => {
    const nWrap = document.createElement('div');
    nWrap.appendChild(node.cloneNode(true));
    return nWrap.innerHTML;
};

export class Resize {
    constructor() {
        this.resize();
        this.resize = debounce(this.resize.bind(this), DEBOUNCE_INTERVAL_MS);
        window.addEventListener('resize', this.resize);
    }

    resize() {
        emit('deviceType:after-resize');
    }

    destroy() {
        window.removeEventListener('resize', this.resize);
    }
}

export const getTranslate3d = (el) => {
    const values = el.style.transform.split(/\w+\(|\);?/);
    if (!values[1] || !values[1].length) {
        return [];
    }
    return values[1].split(/,\s?/g);
};
