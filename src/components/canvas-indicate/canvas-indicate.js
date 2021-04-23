import paper from 'paper/dist/paper-core.min';
import SimplexNoise from 'simplex-noise';
import Component from '../../common/js/component';
import { emit, listen, unlisten } from '../../common/js/helpers';

class CanvasIndicate extends Component {
    constructor(nRoot, parent = document, strokeColor = '#202020') {
        super(nRoot, 'canvas-indicate');
        this.x = 150;
        this.y = 150;
        this.group = '';
        this.container = parent;
        this.color = strokeColor;
        this.isHover = false;
        this.initCanvas();

        if (this.nRoot.classList.contains(`${this.componentName}_scroll`)) {
            this.scrollTo = this.scrollTo.bind(this);
        }

        listen('canvas-enter', () => { this.isHover = true; });
        listen('canvas-leave', () => { this.isHover = false; });
    }

    initCanvas() {
        this.hover = this.hover.bind(this);
        this.nRoot.addEventListener('mouseover', this.hover);
        this.leave = this.leave.bind(this);
        this.nRoot.addEventListener('mouseout', this.leave);
        this.changeRange = this.changeRange.bind(this);

        this.canvas = this.container.querySelector('.canvas-indicate__canvas');
        paper.setup(this.canvas);
        const strokeColor = this.color;
        const strokeWidth = 1;
        const segments = 3;
        const radius = 100;
        const noiseScale = 170;
        this.noiseRange = 10;

        this.polygon = new paper.Path.RegularPolygon(
            new paper.Point(this.x, this.y),
            segments,
            radius,
        );
        this.polygon.strokeColor = strokeColor;
        this.polygon.strokeWidth = strokeWidth;
        this.polygon.fill = true;
        this.polygon.smooth();
        this.group = new paper.Group([this.polygon]);
        this.group.applyMatrix = false;

        const noiseObjects = this.polygon.segments.map(() => new SimplexNoise());
        const bigCoordinates = [];

        const map = (value, inMin, inMax, outMin, outMax) => (
            ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
        );

        paper.view.onFrame = (event) => {
            if (this.isHover) {
                this.changeRange(0.1, 'grow');
            } else {
                this.changeRange(0.1, 'low');
            }
            // this.group.position = new paper.Point(this.x, this.y);
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
            this.polygon.smooth();

            if (this.nRoot.classList.contains(`${this.componentName}_scroll`)) {
                this.canvas.addEventListener('click', this.scrollTo);
            }
        };
    }

    hover() {
        emit('canvas-enter');
    }

    leave() {
        emit('canvas-leave');
    }

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

    destroy() {
        if (this.nRoot.classList.contains(`${this.componentName}_scroll`)) {
            this.canvas.removeEventListener('click', this.scrollTo);
        }
        unlisten('canvas-enter', () => { this.hover = true; });
        unlisten('canvas-leave', () => { this.hover = false; });
    }
}

export default CanvasIndicate;
