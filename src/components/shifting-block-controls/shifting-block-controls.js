import Component from '../../common/js/component';
import { getDeviceType, listen, unlisten, nFindComponent, Resize , nGetBody, isIE} from '../../common/js/helpers';
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';
import PerfectScrollbar from 'perfect-scrollbar';
import {commonComponents} from '../../common/js/commonComponents';
import debounce from 'lodash/debounce';
import Cursor from '../../components/cursor/cursor';
import disableScroll from 'disable-scroll';


class ShiftingBlockControls extends Component {

    get widthShift() {
        return this.shiftBlockContainer.offsetWidth;
    }

    get getSreenHeight() {
        return window.innerHeight;
    }

    get pageOffset() {
        return window.pageYOffset;
    }

    constructor(nRoot) {
        super(nRoot, 'shifting-block-controls');
        this.btnShow = this.nFindSingle('btn');
        this.shiftBlock = nFindComponent('shifting-block');
        this.shiftBlockContainer = nFindComponent('shifting-block__container', this.shiftBlock);
        this.btnHide = nFindComponent('shifting-block__hide', this.shiftBlock);
        this.shiftBlockWrapper = nFindComponent('shifting-block__wrapper', this.shiftBlock)
        this.nHeader = commonComponents.header.nRoot;
        this.barbaWrapper = document.querySelector('#barba-wrapper');
        this.nBody = nGetBody();
        this.cursor = new Cursor(nFindComponent('shifting-block__cursor'), 'cursor-area');

        this.nBody.classList.add('shift-transition');

        this.ps = new PerfectScrollbar(this.shiftBlockContainer, {
            wheelPropagation: false,
            suppressScrollX: true,
            minScrollbarLength: 20,
        });

        this.update = debounce(this.ps.update, 35);
        window.addEventListener('resize', this.update);


        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.hideKeybordPress = this.hideKeybordPress.bind(this);

        this.hide();

        this.btnShow.addEventListener('click', this.show);
        this.btnHide.addEventListener('click', this.hide);


    }

    show() {
        nGetBody().classList.add('shifting-block-show');
        this.shiftBlock.classList.add('_show');

        this.nHeader.setAttribute('style', `left: ${this.widthShift}px; right: -${this.widthShift}px;`);
        this.barbaWrapper.setAttribute('style', `left: ${this.widthShift}px; right: -${this.widthShift}px;`);
        this.shiftBlockContainer.removeAttribute('style');

        if (isIE()) {
            disableBodyScroll(this.shiftBlockWrapper);
        } else {
            disableScroll.on();
        };


        document.addEventListener('keydown', this.hideKeybordPress);


    }

    hide() {
        nGetBody().classList.remove('shifting-block-show');
        this.shiftBlock.classList.remove('_show');

        this.shiftBlockContainer.setAttribute('style', `transform: translateX(-100%)`);
        this.nHeader.removeAttribute('style');
        this.barbaWrapper.removeAttribute('style');

        if (isIE()) {
            enableBodyScroll(this.shiftBlockWrapper);
        } else {
            disableScroll.off();
        };


        this.cursor.touchStart();
    }

    hideKeybordPress(event) {
        if (event.keyCode === 27 && this.nRoot.classList.contains('_show') || event.keyCode === 13 && document.activeElement === this.nRoot) {
            this.hide();
            document.removeEventListener('keydown', this.hideKeybordPress);
        }
    }

    destroy() {

        this.nBody.classList.remove('shift-transition');
        window.removeEventListener('resize', this.update);

        if (isIE()) {
            clearAllBodyScrollLocks();
        } else {
            disableScroll.off();
        };

        this.cursor.destroy();

    }
}

export default ShiftingBlockControls;
