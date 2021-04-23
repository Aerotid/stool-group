import Component from '../../common/js/component';
import {nFindComponent} from "../../common/js/helpers";

class Range extends Component {
    get valLow() {
        return this.nInputLow.value;
    }

    get valUp() {
        return this.nInputUp.value;
    }

    get attrValLow() {
        return this.nInputLow.getAttribute('value')
    }
    get attrValUp() {
        return this.nInputUp.getAttribute('value')
    }


    constructor(nRoot) {
        super(nRoot, 'range');

        this.nInputLow = this.nFindSingle('input-low');
        this.nInputUp = this.nFindSingle('input-up');
        this.nInputValLow = this.nFind('input-val_low');
        this.nInputValUp = this.nFind('input-val_up');

        this.nBtns = this.nFind('identify-btn');
        this.nBtns.forEach(el => this.btnColoring(el));

        this.nInputValLowWrp = this.nFindSingle('identify-val_selected-low');
        this.nInputValUpWrap = this.nFindSingle('identify-val_selected-up');

        this.selectedView = nFindComponent('shifting-block__selected');
        this.selectedShablon = nFindComponent('product-filters__select', nFindComponent('product-filters'));


        this.showValLow = this.showValLow.bind(this);
        this.showValUp = this.showValUp.bind(this);
        this.showValLow();
        this.showValUp();

        this.nInputLow.addEventListener('change', this.showValLow);
        this.nInputUp.addEventListener('change', this.showValUp);


    }

    btnColoring(btn) {
        const str = btn.style.left;
        const position = +(str.substring(0, str.length - 1));
        if(btn.classList.contains('range__identify-btn_low') && position > 0 ) {
            btn.style.backgroundColor = 'black';
        }
        else if(btn.classList.contains('range__identify-btn_up') && position < 100 ) {
            btn.style.backgroundColor = 'black';
        } else {
            btn.style.backgroundColor = 'white';
        }
    }


    showValLow() {
        this.nInputValLow.forEach(itemVal => itemVal.innerHTML = this.valLow );
        if(this.valLow === this.attrValLow) {
            this.nInputValLowWrp.style.display = 'none';
        } else {
            this.nInputValLowWrp.style.display = 'inline-block';
        }
        this.nBtns.forEach(el => this.btnColoring(el));

        if(this.valLow !== this.attrValLow || this.valUp !== this.attrValUp) {
            this.showSelect();
        }

    }

    showValUp() {
        this.nInputValUp.forEach(itemVal => itemVal.innerHTML = this.valUp );
        if(this.valUp === this.attrValUp) {
            this.nInputValUpWrap.style.display = 'none';
        } else {
            this.nInputValUpWrap.style.display = 'inline-block';
        }
        this.nBtns.forEach(el => this.btnColoring(el));

        if(this.valLow !== this.attrValLow || this.valUp !== this.attrValUp) {
            this.showSelect();
        }
    }

    showSelect() {
        let nSelected = false;
        if(!nFindComponent('product-filters__select_range', this.selectedView)) {
            nSelected = this.selectedView.appendChild(this.selectedShablon.cloneNode(true))
            nSelected.classList.remove('product-filters__select_shablon');
            nSelected.classList.add('product-filters__select_range');
        } else {
            nSelected = nFindComponent('product-filters__select_range', this.selectedView);
        }
        const nSelectedContent = nFindComponent('product-filters__select-content', nSelected);
        const bntReset = nFindComponent('product-filters__select-reset', nSelected);
        nSelectedContent.innerHTML = `От ${this.valLow} до ${this.valUp}`;

        if(bntReset) {
            bntReset.addEventListener('click', e => {
                const bntClear = nFindComponent('range__clear', nFindComponent('product-filters__range'));
                if(bntClear) {
                    bntClear.click();
                    this.selectedView.removeChild(nSelected);
                }
            });
        }

    }





    destroy() {
        this.nInputLow.removeEventListener('change', this.showValLow);
        this.nInputUp.removeEventListener('change', this.showValUp);
    }
}

export default Range;
