import Component from '../../common/js/component';

class HeaderSubmenu extends Component {
    constructor(nRoot) {
        super(nRoot, 'header-submenu');
        this.nLists = [...this.nFind('list')];
        this.nItems = [...this.nFind('item')];
        this.hasDropdown = this.nItems.filter(nItem => nItem.querySelector('.header-submenu__dropdown'));
        this.hasDropdown.map(nItem => nItem.classList.add('has-dropdown'));
        this.nSvgBump = this.nFindSingle('bump');
        this.currentItem = null;
        this.onSectionOver = this.onSectionOver.bind(this);
        this.onSectionOut = this.onSectionOut.bind(this);
        this.svgInit = this.svgInit.bind(this);
        this.svgMove = this.svgMove.bind(this);
        this.svgLeave = this.svgLeave.bind(this);
        this.svgActive = this.svgActive.bind(this);
        this.svgInit();
        this.nRoot.addEventListener('mouseover', this.onSectionOver);
        this.nRoot.addEventListener('mouseout', this.onSectionOut);
        this.nLists.map((nList) => {
            nList.addEventListener('mousemove', this.svgMove);
            nList.addEventListener('mouseleave', this.svgLeave);
        });

        this.nSvgBumpOriginX = '200 0';
        this.nSvgBumpTransformOrigin = '50% top';
    }

    svgInit() {
        let tl = new TimelineMax();
        tl.set(this.nSvgBump.querySelector('path'), {
            scaleY: 0,
            scaleX: 2,
            svgOrigin: this.nSvgBumpOriginX,
            transformOrigin: '50% top',
        });
    }

    svgMove(e) {
        let nTargetItem = e.target.closest(`.${this.componentName}__item.has-dropdown`);
        if (!nTargetItem || !this.nRoot.contains(nTargetItem)) {
            this.svgLeave();
        } else {
            let nTargetDropdown = e.target.closest(`.${this.componentName}__dropdown`);
            if (!nTargetDropdown) {
                let pageX = e.pageX;
                let tl = new TimelineMax();
                tl.to(this.nSvgBump.querySelector('path'), 1.8, {
                    scaleY: 1,
                    svgOrigin: this.nSvgBumpOriginX,
                    transformOrigin: '50% top',
                    ease: Elastic.easeOut.config(0.9, 0.2),
                })
                    .to(this.nSvgBump.querySelector('path'), 0.8, {
                        scaleX: 1,
                        svgOrigin: this.nSvgBumpOriginX,
                        transformOrigin: '50% top',
                    }, 0)
                    .to(this.nSvgBump, 0.8, {
                        left: pageX,
                        ease: Back.easeOut,
                    }, 0);
            } else {
                this.svgActive();
            }
        }
    }

    svgLeave(e) {
        let tl = new TimelineMax();
        tl.to(this.nSvgBump.querySelector('path'), 2.8, {
            scaleY: 0,
            scaleX: 2,
            svgOrigin: '200 0',
            transformOrigin: '50% top',
            ease: Back.easeOut,
        });
    }

    svgActive(itemActive) {
        let activeItem = this.currentItem.getBoundingClientRect();
        let tl = new TimelineMax();
        tl.to(this.nSvgBump, 0.8, {
            left: activeItem.left + (activeItem.width / 2),
            ease: Back.easeOut,
        }, 0);
    }

    onSectionOver(e) {
        if (this.currentItem) {
            return;
        }
        let nTarget = e.target.closest(`.${this.componentName}__item`);
        if (!nTarget || !this.nRoot.contains(nTarget)) return;

        this.currentItem = nTarget;
        nTarget.classList.add('active');
    }

    onSectionOut(e) {
        if (!this.currentItem) return;
        let nRelatedTarget = e.relatedTarget;

        if (nRelatedTarget) {
            while (nRelatedTarget) {
                if (nRelatedTarget === this.currentItem) return;
                nRelatedTarget = nRelatedTarget.parentNode;
            }
        }

        this.currentItem.classList.remove('active');
        this.currentItem = null;
    }

    destroy() {
        this.nRoot.removeEventListener('mouseover', this.onSectionOver);
        this.nRoot.removeEventListener('mouseout', this.onSectionOut);
        this.nLists.map((nList) => {
            nList.removeEventListener('mousemove', this.svgMove);
            nList.removeEventListener('mouseleave', this.svgLeave);
        });
    }
}

export default HeaderSubmenu;
