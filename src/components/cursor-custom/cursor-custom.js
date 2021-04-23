import TweenMax from 'gsap/src/minified/TweenMax.min.js';
import paper from 'paper/dist/paper-core.min';
import SimplexNoise from 'simplex-noise';
import throttle from 'lodash/debounce';
import { listen, offset, calculateColWidth, emit, unlisten } from '../../common/js/helpers';
import Component from '../../common/js/component';

class CursorCustom extends Component {
    constructor(nRoot, parent, isLoop) {
        super(nRoot, 'cursor-custom');
        this.colWidth = calculateColWidth();
        this.cursorSize = (this.colWidth * 3) / 2;
        this.isStuck = null;
        this.onSlider = false;
        this.timeout = null;
        this.moveCanvas = false;
        this.isLoop = isLoop;
        this.pageX = -100;
        this.pageY = -100;
        this.test = 1;
        this.x = (this.colWidth * 3.75) / 2;
        this.y = (this.colWidth * 3.75) / 2;
        this.mainSlider = parent;
        this.innerCursor = this.mainSlider.querySelector('.cursor-custom');
        this.getCursorPosition = this.getCursorPosition.bind(this);
        this.updategetCursorPosition = throttle(this.getCursorPosition, 5);
        this.render = this.render.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.hideArrowLeft = this.hideArrowLeft.bind(this);
        this.hideArrowRight = this.hideArrowRight.bind(this);
        this.showArrows = this.showArrows.bind(this);
        this.mouseStopDelay = this.mouseStopDelay.bind(this);
        this.lowRect = this.lowRect.bind(this);
        // this.growRect = this.growRect.bind(this);
        this.changeRange = this.changeRange.bind(this);
        /* Круг */
        this.lastX = 0;
        this.lastY = 0;
        this.group = '';

        this.initCursor();
        this.initCanvas();
        this.initHovers();

        if (!this.isLoop) { /* ПРОВЕРИТЬ! */
            listen('collection-slider:first-slide', this.hideArrowLeft);
            listen('collection-slider:last-slide', this.hideArrowRight);
            listen('collection-slider:from-edge', this.showArrows);
        }
        listen('mousestop', () => { this.moveCanvas = false; });
    }

    mouseStopDelay(time) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => { emit('mousestop'); }, time);
    }

    getCursorPosition(e) {
        this.moveCanvas = true;
        this.pageX = e.pageX - offset(this.mainSlider).left;
        this.pageY = e.pageY - offset(this.mainSlider).top;
        this.mouseStopDelay(1000);
    }

    render() {
        TweenMax.set(this.innerCursor, {
            x: this.pageX,
            y: this.pageY,
        });
        requestAnimationFrame(this.render);
    }

    handleMouseEnter() {
        this.showCursorText.play();
        this.showCanvas.play();
        this.onSlider = true;
    }

    handleMouseLeave() {
        this.showCursorText.reverse();
        this.showCanvas.reverse();
        this.onSlider = false;
    }

    linkHoverOn(e) {
        const navItem = e.currentTarget;
        const navItemBox = navItem.getBoundingClientRect();
        this.stuckX = Math.round((offset(navItem).left - offset(this.mainSlider).left) + (navItemBox.width / 2));
        this.stuckY = Math.round((offset(navItem).top - offset(this.mainSlider).top) + (navItemBox.height / 2));
        this.isStuck = true;
        this.showCursorText.reverse();
    }

    linkHoverOff() {
        this.isStuck = false;
        this.showCursorText.play();
    }

    initHovers() {
        this.linkHoverOn = this.linkHoverOn.bind(this);
        this.linkHoverOff = this.linkHoverOff.bind(this);
        this.linkItems = [...this.mainSlider.querySelectorAll('.main-slider__link')];
        this.linkItems.forEach((item) => {
            item.addEventListener('mouseenter', this.linkHoverOn);
            item.addEventListener('mouseleave', this.linkHoverOff);
        });
    }

    initCursor() {
        this.mainSlider.addEventListener('mouseenter', this.handleMouseEnter);
        this.mainSlider.addEventListener('mouseleave', this.handleMouseLeave);
        this.mainSlider.addEventListener('mousemove', this.updategetCursorPosition);

        requestAnimationFrame(this.render);

        this.showCursorText = TweenMax.to(this.innerCursor, 0.2, {
            autoAlpha: 1,
            ease: this.easing,
            paused: true,
        });
    }

    lowRect(elem) {
        const lowRectSize = (elem.bounds.width - 10) / elem.bounds.width;
        elem.scale(lowRectSize);
    }

    // growRect(elem) {
    //     this.test += 0.1;
    //     this.polygon.scale(this.test);
    // }

    changeRange(value, direction) {
        if (direction === 'low') {
            if (this.noiseRange >= 10) {
                this.noiseRange -= value;
            }
        } else if (direction === 'grow') {
            if (this.noiseRange <= 24) {
                this.noiseRange += value;
            }
        }
    }

    initCanvas() {
        this.canvas = this.mainSlider.querySelector('.cursor-custom_canvas');
        this.shapeBounds = {
            width: calculateColWidth() / 2,
            height: this.cursorSize * 1.5,
        };
        paper.setup(this.canvas);
        const strokeColor = 'rgba(255, 255, 255, 1)';
        const strokeWidth = 1;
        const segments = 4;
        const radius = this.cursorSize;
        const noiseScale = 170;
        this.noiseRange = 24;
        this.isNoisy = true;
        this.polygon = new paper.Path.RegularPolygon(
            new paper.Point(0, 0),
            segments,
            radius,
        );
        this.polygon.strokeColor = strokeColor;
        this.polygon.strokeWidth = strokeWidth;
        // this.polygon.selected = true;
        this.polygon.smooth();
        this.group = new paper.Group([this.polygon]);
        this.group.applyMatrix = false;

        const noiseObjects = this.polygon.segments.map(() => new SimplexNoise());
        let bigCoordinates = [];
        const lerp = (a, b, n) => (1 - n) * a + n * b;

        const map = (value, inMin, inMax, outMin, outMax) => (
            ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
        );

        paper.view.onFrame = (event) => {
            if (this.onSlider) {
                if (this.moveCanvas) {
                    this.changeRange(0.5, 'grow');
                } else {
                    this.changeRange(0.5, 'low');
                }
                this.polygon.set({
                    radius: (calculateColWidth() * 3),
                });
                if (!this.isStuck) {
                    this.lastX = lerp(this.lastX, this.pageX, 0.2);
                    this.lastY = lerp(this.lastY, this.pageY, 0.2);
                    this.group.position = new paper.Point(this.lastX, this.lastY);
                } else if (this.isStuck) {
                    this.lastX = lerp(this.lastX, this.stuckX, 0.1);
                    this.lastY = lerp(this.lastY, this.stuckY, 0.1);
                    this.group.position = new paper.Point(this.lastX, this.lastY);
                }
            }
            if (this.isStuck && this.polygon.bounds.width >= this.shapeBounds.width) {
                this.lowRect(this.polygon);
                if (this.isNoisy) {
                    this.polygon.segments.forEach((segment, i) => {
                        segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
                    });
                    this.isNoisy = false;
                    bigCoordinates = [];
                }
            } else if (!this.isStuck && this.polygon.bounds.width < calculateColWidth()) {
                const scaleDown = 6;
                this.polygon.scale(scaleDown);
            }
            if (this.onSlider && !this.isStuck) { // Если не на ссылке и аним капля больше заявленной
                this.isNoisy = true;
                if (bigCoordinates.length === 0) {
                    this.polygon.segments.forEach((segment, i) => {
                        bigCoordinates[i] = [segment.point.x, segment.point.y];
                    });
                }
                this.polygon.segments.forEach((segment, i) => {
                    const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
                    const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1);
                    const distortionX = map(noiseX, -1, 1, -this.noiseRange, this.noiseRange);
                    const distortionY = map(noiseY, -1, 1, -this.noiseRange, this.noiseRange);
                    const newX = bigCoordinates[i][0] + distortionX;
                    const newY = bigCoordinates[i][1] + distortionY;
                    segment.point.set(newX, newY);
                });
            }
            this.polygon.smooth();
        };

        this.showCanvas = TweenMax.to(this.canvas, 0.1, {
            autoAlpha: 1,
            ease: this.easing,
            paused: true,
        });
    }

    hideArrowLeft() {
        this.nFindSingle('arrow_left').classList.add('invisible');
    }

    hideArrowRight() {
        this.nFindSingle('arrow_right').classList.add('invisible');
    }

    showArrows() {
        this.nFind('arrow').forEach((arrow) => {
            arrow.classList.remove('invisible');
        });
    }

    destroy() {
        this.mainSlider.removeEventListener('mousemove', this.getCursorPosition);
        this.mainSlider.removeEventListener('mouseenter', this.handleMouseEnter);
        this.mainSlider.removeEventListener('mouseleave', this.handleMouseLeave);
        this.linkItems.forEach((item) => {
            item.removeEventListener('mouseenter', this.linkHoverOn);
            item.removeEventListener('mouseleave', this.linkHoverOff);
        });
        if (!this.isLoop) { /* ПРОВЕРИТЬ! */
            unlisten('collection-slider:first-slide', this.hideArrowLeft);
            unlisten('collection-slider:last-slide', this.hideArrowRight);
            unlisten('collection-slider:from-edge', this.showArrows);
        }
        unlisten('mousestop', () => { this.moveCanvas = false; });
    }
}

export default CursorCustom;
