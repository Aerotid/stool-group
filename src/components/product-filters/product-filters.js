import Component from '../../common/js/component';
import Range from '../../components/range/range'
import {nFindComponent, nFindComponents, nFind} from "../../common/js/helpers";

class ProductFilters extends Component {
    constructor(nRoot) {
        super(nRoot, 'product-filters');

        if (this.nFindSingle('range')) {
            this.range = new Range(this.nFindSingle('range'));
        }
        this.nCheckboxes = nFindComponents('filters-checkbox__checkbox', this.nRoot);

        this.selectedView = nFindComponent('shifting-block__selected');

        this.showCheckboxSelected = this.showCheckboxSelected.bind(this);
        this.nCheckboxes.forEach(nCheckbox => {
            nCheckbox.addEventListener('change', this.showCheckboxSelected)
        });


    }

    showCheckboxSelected(e) {
        this.selectedShablon = nFindComponent('product-filters__select', nFindComponent('product-filters'));

        const checkbox = e.target;
        const val = checkbox.value;
        let nSelected = false;

        if(!checkbox.checked && !!this.selectedView.querySelector(`[data-value="${val}"`)) {
            this.selectedView.removeChild(this.selectedView.querySelector(`[data-value="${val}"`));
        }

        if(checkbox.checked && !this.selectedView.querySelector(`[data-value="${val}"`)) {

            const title = checkbox.parentNode.querySelector('.filters-checkbox__info-title').innerHTML;

            nSelected = this.selectedView.appendChild(this.selectedShablon.cloneNode(true));
            nSelected.classList.remove('product-filters__select_shablon');
            nSelected.classList.add(`product-filters__select_checkbox-${val}`);
            nSelected.setAttribute('data-value', val);
            const nSelectedContent = nFindComponent('product-filters__select-content', nSelected);
            const bntReset = nFindComponent('product-filters__select-reset', nSelected);
            nSelectedContent.innerHTML = title;

            if (bntReset) {
                bntReset.addEventListener('click', e => {
                    const CheckboxClearing = this.nRoot.querySelector(`[value="${val}"`);
                    if (CheckboxClearing && !!CheckboxClearing.checked) {
                        this.selectedView.removeChild(nSelected);
                        CheckboxClearing.click();
                    }
                });
            }
        }


    }

    // clearCheckboxSelected(e) {
    //     const checkbox = e.target;
    //     const val = checkbox.value;
    //
    //     if(!checkbox.checked && !!this.selectedView.querySelector(`[data-value="${val}"`)) {
    //         this.selectedView.removeChild(this.selectedView.querySelector(`[data-value="${val}"`));
    //     }
    // }


    destroy() {
        if (this.range) this.range.destroy();
    }
}

export default ProductFilters;
