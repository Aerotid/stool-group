import Component from '../../common/js/component';

class RatingStar extends Component {
    constructor(nRoot) {
        super(nRoot, 'rating-star');
        this.colorStar = this.colorStar.bind(this);
        this.nStarIcon = this.nFind('icon');
        this.colorStar(document.querySelector('.spoiler-reviews__data-rate').getAttribute('data-rate'));
    }

    colorStar(rate) {
        this.rateRound = Math.floor(rate);
        this.percent = ((rate - this.rateRound) * 100).toFixed(1);

        let i;
        for (i = 0; i < this.rateRound; i++) {
            this.nStarIcon[i].classList.add('rating-star__icon-color');
        }

        if (i < 5) {
            const iContainer = document.createElement('i');
            iContainer.style.width = this.percent + '%';
            iContainer.innerHTML = '<svg width="15" height="15" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M6.5 9.80421L10.5083 12.7292L8.99167 7.96254L13 5.14587H8.125L6.5 0.270874L4.875 5.14587H0L4.00833 7.96254L2.49167 12.7292L6.5 9.80421Z"></path></svg>';

            const spanContainer = document.createElement('span');
            spanContainer.classList.add('rating-star__short');

            this.nStarIcon[i].appendChild(spanContainer);
            this.nFindSingle('short').appendChild(iContainer);
        }
    }

    destroy() {

    }
}

export default RatingStar;
