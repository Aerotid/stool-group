import axios from 'axios';
import Component from '../../common/js/component';

class Subscribe extends Component {
    constructor(nRoot) {
        super(nRoot, 'subscribe');
        this.emailInput = this.nFindSingle('input');
        this.onButtonClick = this.onButtonClick.bind(this);
        this.nFindSingle('button').addEventListener('click', this.onButtonClick);
    }

    async onButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.nRoot.reportValidity && !this.nRoot.reportValidity()) {
            return;
        }
        this.nRoot.classList.remove('success');
        this.nRoot.classList.remove('fail');

        const dataForm = new FormData();
        dataForm.append('email', this.emailInput.value);
        const response = await axios.get(this.nRoot.getAttribute('action'), {
            // headers: {
            //     'X-Requested-With': 'XMLHttpRequest',
            //     'Content-Type': 'multipart/form-data',
            // },
            responseType: 'text',
        });
        response.data.status ? this.onSuccess() : this.onFail();
        this.nFindSingle('button').removeAttribute('disabled');
    }

    onSuccess() {
        this.nFindSingle('button').innerHTML = 'Успешно';
        //this.emailInput.nRoot.classList.remove('is-focused', 'is-dirty');
        this.nRoot.reset();
        this.nRoot.classList.add('success');
    }

    onFail() {
        this.nFindSingle('button').innerHTML = 'Ошибка';
        this.nRoot.classList.add('fail');
    }

    destroy() {
        this.nFindSingle('button').removeEventListener('click', this.onButtonClick);
    }
}

export default Subscribe;
