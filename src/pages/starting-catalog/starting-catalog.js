import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import InfoIndicate from '../../components/info-indicate/info-indicate';
import {nFindComponent, nGetBody} from "../../common/js/helpers";
import CatalogMenu from '../../components/catalog-menu/catalog-menu';

Barba.BaseView.extend({
    namespace: 'starting-catalog',
    onEnter() {

    },
    async onEnterCompleted() {
        nGetBody().classList.add('no-footer');
        nGetBody().classList.add('_catalog');
        this.infoIndicate = new InfoIndicate(nFindComponent('info-indicate'));
        this.catalogMenu = new CatalogMenu(nFindComponent('catalog-menu'));

        await commonComponents.preloader.preloading;
        objectFitPolyfill();
    },
    onLeave() {
        this.infoIndicate.destroy();
        this.catalogMenu.destroy();
        nGetBody().classList.remove('no-footer');
    },
    onLeaveCompleted() {
        nGetBody().classList.remove('_catalog');
    },
}).init();
