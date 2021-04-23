import Component from '../../common/js/component';
import {getDeviceType, listen, unlisten, nFindComponent, Resize, nGetBody, loadImages} from '../../common/js/helpers';
import debounce from 'lodash/debounce';
import {commonComponents} from '../../common/js/commonComponents';

class CatalogMenu extends Component {
    constructor(nRoot) {
        super(nRoot, 'catalog-menu');
        this.colors = {
            'color1': '#F3E9E2',
            'color2': '#EDEBE9',
            'color3': '#E8EBF5',
            'color4': '#E5EEEA',
        };
        this.nBody = nGetBody();
        this.nHeader = commonComponents.header.nFirstPart;
        this.nItem = this.nFind('item');
        this.nImgs = this.nFind('item-img');

        this.hovering = this.hovering.bind(this);
        this.debounceHovering = debounce(this.hovering, 15);
        this.imgParallax = this.imgParallax.bind(this);
        // this.nRoot.addEventListener('mousemove', this.debounceHovering);

        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);

        if (getDeviceType() === 'mobile') {
            // this.initMobile();
            this.destroyDesktop();
        } else {
            this.initDesktop();
        }
        this.resize = new Resize();
        listen('deviceType:after-resize', this.afterResize);


        // loadImages(this.nImgs).then(() => {
        //     this.nImgs.forEach(img => {
        //         const startWidth = img.width;
        //         const adaptiaveWidht = startWidth / 1920 * 100;
        //         img.style.cssText = `width: ${adaptiaveWidht}vw; max-width: ${startWidth}px; min-width: 300px`;
        //     });
        // });

    }

    hovering(e) {
        const current = e.target;
        if (current.classList.contains('catalog-menu__item')) {
            this.nItem.forEach(el => {
                el.classList.remove('_active');
                el.classList.add('_opacity');
            });
            current.classList.add('_active');
            current.classList.remove('_opacity');
            this.setColor(current);
        } else {
            this.nItem.forEach(el => {
                el.classList.remove('_active');
                el.classList.remove('_opacity');
                this.nBody.style.backgroundColor = '';
                this.nHeader.style.backgroundColor = '';
            });
        }

    }

    setColor(current) {
        const color = current.getAttribute('data-color');
        this.nBody.style.backgroundColor = this.colors[color];
        this.nHeader.style.backgroundColor = this.colors[color];
    }

    imgParallax(e) {
        this.thisImg = e.target.querySelector('.catalog-menu__item-img');
        this.halfHeight = e.target.offsetHeight / 2;
        this.halfWidth = e.target.offsetWidth / 2;
        this.translateX = (e.offsetX - this.halfWidth) / 15;
        this.translateY = (e.offsetY - this.halfHeight) / 5 * -1;
        this.thisImg.style.cssText = `transform: translate(${this.translateX}px, ${this.translateY}px) scale(1.05);`;
    }

    imgParallaxDefault(e) {
        this.thisImg = e.target.querySelector('.catalog-menu__item-img');
        this.thisImg.style.cssText = `transform: translate(0px, 0px) scale(1);`;
    }


    initDesktop() {
        this.nRoot.addEventListener('mousemove', this.debounceHovering);
        this.nFind('item').forEach(item => item.addEventListener('mousemove', this.imgParallax));
        this.nFind('item').forEach(item => item.addEventListener('mouseleave', this.imgParallaxDefault));
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
        this.nRoot.removeEventListener('mousemove', this.debounceHovering);
    }

    destroyMobile() {

    }

    destroy() {
        this.nRoot.removeEventListener('mousemove', this.debounceHovering);
        this.nBody.style.backgroundColor = '';
        this.nHeader.style.backgroundColor = '';

        unlisten('deviceType:after-resize', this.afterResize);
        if (getDeviceType() === 'mobile') {
            this.destroyMobile();
        } else {
            this.destroyDesktop();
        }
    }
}

export default CatalogMenu;
