import Component from '../../common/js/component';

class RateValue extends Component {
    constructor(nRoot) {
        super(nRoot, 'rate-value');

        if (this.nRoot) {
            this.rateLabels = this.nFind('rating-label');
            this.rateLabelsLength = this.nFind('rating-label').length;

            this.changeColorPrev = this.changeColorPrev.bind(this);
            this.clearAll = this.clearAll.bind(this);
            this.rateLabels.forEach(item => item.addEventListener('mouseenter', this.changeColorPrev));
            this.rateLabels.forEach(item => item.addEventListener('mouseleave', this.clearAll));

            this.rateChecked = this.rateChecked.bind(this);
            this.rateLabels.forEach(item => item.addEventListener('click', this.rateChecked));

            for (let i = 0; i < this.rateLabelsLength; i++) {
                this.rateLabels[i].querySelector('.rate-value__icon').style.cssText = `transition-delay: ${i / 45}s;`;
            }
        }
    }

    changeColorPrev(e) {
        this.rateCount = e.target.getAttribute('value');
        for (let i = 0; i < this.rateCount; i++) {
            this.rateLabels[i].classList.add('colored');
        }
    }

    clearAll() {
        for (let i = 0; i < this.rateLabelsLength; i++) {
            if (this.rateLabels[i].classList.contains('colored')) {
                this.rateLabels[i].classList.remove('colored');
            }
        }
    }

    rateChecked(e) {
        this.value = e.currentTarget.getAttribute('value');

        for (let i = 0; i < this.rateLabelsLength; i++) {
            if (this.rateLabels[i].classList.contains('checked')) {
                this.rateLabels[i].classList.remove('checked');
            }
        }

        e.currentTarget.classList.add('checked');
        this.nFindSingle('value').innerHTML = this.value;
        this.nFindSingle('rating-value').innerHTML = this.value;

        for (let i = 0; i < this.rateCount; i++) {
            this.rateLabels[i].classList.add('checked');
        }
    }

    destroy() {

    }
}

export default RateValue;
