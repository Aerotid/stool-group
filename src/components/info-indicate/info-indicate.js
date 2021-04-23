import Component from '../../common/js/component';
import { getDeviceType, listen, unlisten, nFindComponent, Resize } from '../../common/js/helpers';
import paper from 'paper/dist/paper-core.min';
import SimplexNoise from 'simplex-noise';


class InfoIndicate extends Component {
    constructor(nRoot) {
        super(nRoot, 'info-indicate');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);

        if (getDeviceType() === 'mobile') {
            this.initMobile();
        } else {
            this.initDesktop();
        }
        this.resize = new Resize();
        listen('deviceType:after-resize', this.afterResize);

        this.x = 100;
        this.y = 100;
        this.group = '';
        this.initCanvas();
    }

    initCanvas() {
        this.canvas = document.querySelector('.info-indicate__canvas');
        paper.setup(this.canvas);
        const strokeColor = '#202020';
        const strokeWidth = 1;
        const segments = 3;
        const radius = 45;
        const noiseScale = 170;
        const noiseRange = 10;

        this.polygon = new paper.Path.RegularPolygon(
            new paper.Point(this.x, this.y),
            segments,
            radius,
        );
        this.polygon.strokeColor = strokeColor;
        this.polygon.strokeWidth = strokeWidth;
        this.polygon.smooth();
        this.group = new paper.Group([this.polygon]);
        this.group.applyMatrix = false;

        const noiseObjects = this.polygon.segments.map(() => new SimplexNoise());
        const bigCoordinates = [];

        const map = (value, inMin, inMax, outMin, outMax) => (
            ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
        );

        paper.view.onFrame = (event) => {
            // this.group.position = new paper.Point(this.x, this.y);
            if (bigCoordinates.length === 0) {
                this.polygon.segments.forEach((segment, i) => {
                    bigCoordinates[i] = [segment.point.x, segment.point.y];
                });
            }
            this.polygon.segments.forEach((segment, i) => {
                const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
                const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1);
                const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
                const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange);
                const newX = bigCoordinates[i][0] + distortionX;
                const newY = bigCoordinates[i][1] + distortionY;
                segment.point.set(newX, newY);
            });
            this.polygon.smooth();
        };
    }


    initDesktop() {

    }

    initMobile() {

    }

    afterResize() {
        if (getDeviceType() !== this.currentDevice) {
            if (getDeviceType() === 'mobile') {
                this.destroyDesktop();
                this.initMobile();
            } else if (this.currentDevice === 'mobile') {
                this.destroyMobile();
                this.initDesktop();
            }
            this.currentDevice = getDeviceType();
        }
    }

    destroyDesktop() {

    }

    destroyMobile() {

    }

    destroy() {
        unlisten('deviceType:after-resize', this.afterResize);
        if (getDeviceType() === 'mobile') {
            this.destroyMobile();
        } else {
            this.destroyDesktop();
        }
    }
}

export default InfoIndicate;
