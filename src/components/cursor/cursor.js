import Component from '../../common/js/component';
import {nFindComponent} from "../../common/js/helpers";
import throttle from 'lodash/throttle';

class Cursor extends Component {
    constructor(nRoot, cursorArea) {
        super(nRoot, 'cursor');
        this.cursorArea = cursorArea ? nFindComponent(cursorArea) : this.nFindSingle('area');

        this.initCursor();

    }

    initCursor() {
        const { Back } = window;
        this.easing = Back.easeInOut.config(1.7);

        // this.cursorArea = nFindComponent('cursor-area');

        this.innerCursor = this.nFindSingle('item_inner');
        this.outerCursor = this.nFindSingle('item_outer');

        this.getCursorPosition = this.getCursorPosition.bind(this);
        this.render = this.render.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        this.throttleGetCursorPosition = throttle(this.getCursorPosition, 5);
        document.addEventListener('mousemove', this.throttleGetCursorPosition);
        // document.addEventListener('mousemove', this.getCursorPosition);
        requestAnimationFrame(this.render);

        this.fullCursorSize = 80;
        this.enlargeCursorTween = TweenMax.to(this.outerCursor, 0.3, {
            borderColor: 'white',
            width: this.fullCursorSize,
            height: this.fullCursorSize,
            ease: this.easing,
            paused: true,
        });
        this.reduceCursorTween = TweenMax.to(this.outerCursor, 0.3, {
            width: this.fullCursorSize / 1.5,
            height: this.fullCursorSize / 1.5,
            ease: this.easing,
            paused: true,
        });
        this.hideCursorInner = TweenMax.to(this.innerCursor, 0.3, {
            autoAlpha: 0,
            ease: this.easing,
            paused: true,
        });

        this.cursorArea.addEventListener('mouseenter', this.handleMouseEnter);
        this.cursorArea.addEventListener('mouseleave', this.handleMouseLeave);
    }

    getCursorPosition(e) {
        this.clientX = e.clientX;
        this.clientY = e.clientY;
    }

    render() {
        TweenMax.set(this.nRoot, {
            x: this.clientX,
            y: this.clientY,
        });
        requestAnimationFrame(this.render);
    }

    handleMouseEnter() {
        this.enlargeCursorTween.play();
        this.hideCursorInner.reverse();
    }

    handleMouseLeave() {
        this.enlargeCursorTween.reverse();
        this.hideCursorInner.play();
    }

    touchStart() {
        this.reduceCursorTween.play();
        this.hideCursorInner.play();
    }

    touchEnd() {
        this.reduceCursorTween.reverse();
        this.hideCursorInner.reverse();
    }

    destroy() {
        this.cursorArea.removeEventListener('mouseenter', this.handleMouseEnter);
        this.cursorArea.removeEventListener('mouseleave', this.handleMouseLeave);

        document.removeEventListener('mousemove', this.throttleGetCursorPosition);
        // document.removeEventListener('mousemove', this.getCursorPosition);
    }
}

export default Cursor;