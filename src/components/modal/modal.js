import $ from 'jquery';
import Component from '../../common/js/component';
import {emit, nGetBody} from '../../common/js/helpers';
import Cursor from '../cursor/cursor';
import CartPreview from '../cart-preview/cart-preview';
import Search from '../search/search';

class Modal extends Component {
    constructor(nRoot) {
        super(nRoot, 'modal');

        if (this.nFindSingle('login')) {
            this.login = this.nFindSingle('login');
            $(this.nRoot).on('shown.bs.modal', this.requestModalOpened);
        }

        if (this.nFindSingle('cursor')) {
            this.cursor = new Cursor(this.nFindSingle('cursor'), 'modal-cursor__area');
            this.cursor.handleMouseLeave();
        }

        if (this.nFindSingle('cart-preview')) {
            this.cartPreviw = new CartPreview(this.nFindSingle('cart-preview'));
            $(this.nRoot).on('shown.bs.modal', () => { nGetBody().classList.add('cart-opened'); });
            $(this.nRoot).on('hidden.bs.modal', () => { nGetBody().classList.remove('cart-opened'); });
        }

        if (this.nFindSingle('search')) {
            this.search = new Search(this.nFindSingle('search'));
        }

        if (this.search) {
            $(this.nRoot).on('hide.bs.modal', this.search.clearFill);
        }

        if (this.nRoot.classList.contains('modal-scroll')) {
            this.requestModalOpened = this.requestModalOpened.bind(this);
            $(this.nRoot).on('shown.bs.modal', this.requestModalOpened);
        }

        if (this.nRoot.classList.contains('modal_contacts')) {
            this.requestModalOpened = this.requestModalOpened.bind(this);
            $(this.nRoot).on('shown.bs.modal', this.requestModalOpened);
        }

        if (this.cursor) {
            $(this.nRoot).on('hide.bs.modal', this.cursor.handleMouseLeave);
        }
    }

    requestModalOpened() {
        emit('modal:request-modal-opened');
    }

    destroy() {
        if (this.nRoot.classList.contains('modal-scroll')) {
            $(this.nRoot).off('shown.bs.modal', this.requestModalOpened);
        }
        if(this.search) {
            $(this.nRoot).off('hide.bs.modal', this.search.clearFill);
        }

        if (this.cursor) this.cursor.destroy();
        if (this.cartPreviw) this.cartPreviw.destroy();
        if(this.search) this.search.destroy();
    }
}

export default Modal;
