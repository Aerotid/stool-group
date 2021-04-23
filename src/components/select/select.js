import Component from '../../common/js/component';
import Choices from "choices.js";
import PerfectScrollbar from 'perfect-scrollbar';

class Select extends Component {
    constructor(nRoot) {
        super(nRoot, 'select');

        this.nSelect = this.nFindSingle('select');

        this.selectCl = new Choices(this.nSelect, {
            searchEnabled: false,
            itemSelectText: '',
            noResultsText: '',
            noChoicesText: '',
            shouldSort: false,
            callbackOnCreateTemplates(template) {
                return {
                    item: (classNames, data) => {
                        return template(`
                  <div title="${data.label}" class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}" data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''} ${data.disabled ? 'aria-disabled="true"' : ''}>
                    ${data.label}
                  </div>
                `);
                    },
                    choice: (classNames, data) => {
                        return template(`
                  <div title="${data.label}" class="${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${this.config.itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
                    ${data.label}
                  </div>
                `);
                    },
                };
            }
        });

        this.container = nRoot.querySelector('.choices__list .choices__list');
        this.ps = new PerfectScrollbar(this.container, {
            wheelPropagation: false,
            suppressScrollX: true,
        });

        this.selectCl.passedElement.element.addEventListener('showDropdown', () => {
            this.nRoot.classList.add('is-open');
            this.ps.update();
        });

        this.selectCl.passedElement.element.addEventListener('hideDropdown', () => {
            if (this.nRoot.classList.contains('is-open')) {
                this.nRoot.classList.remove('is-open');
            }
        });
    }

    getNeme() {
        return this.nSelect.getAttribute('name');
    }

    getVal() {
        return this.selectCl.getValue(true);
    }

    showError() {
        this.nRoot.classList.add('_is-error');
    }

    hideError() {
        this.nRoot.classList.remove('_is-error');
    }

    destroy() {
        this.selectCl.destroy();
        this.ps.destroy();
    }


}

export default Select;
