import Component from '../../common/js/component';
import ymaps from 'ymaps';
import hint from './images/hint.png';

class ContactsModal extends Component {
    constructor(nRoot) {
        super(nRoot, 'contacts-modal');
        ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=f27f1f40-313b-4810-91a6-d97ec32670d9').then(this.mapLoaded.bind(this));
    }

    mapLoaded(ymaps) {
        this.ymaps = ymaps;
        let center = [this.nRoot.getAttribute('data-lat'), this.nRoot.getAttribute('data-lng')];
        center = (parseFloat(center[0]) && parseFloat(center[1])) ? center : [-15.363, 131.044];

        this.map = new ymaps.Map(this.nFindSingle('map-container'), {
            center: center,
            zoom: 16,
            controls: [],
        });

        this.placemark = new ymaps.Placemark(this.map.getCenter(), {
            iconContent: '<div class="contacts-modal__icon">Stool Group</div>',
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: hint,
            iconImageSize: [51, 57],
            iconImageOffset: [-25, -56],
        });

        this.map.geoObjects.add(this.placemark);

        this.createAndMoveMarker(center);
    }

    createAndMoveMarker(position, placemarkContent) {
        if (this.placemark) {
            this.map.geoObjects.remove(this.placemark);
        }

        this.placemark = new this.ymaps.Placemark(position, {
            iconContent: '<div class="contacts-modal__icon">' + placemarkContent + '</div>',
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: hint,
            iconImageSize: [51, 57],
            iconImageOffset: [-25, -56],
        });

        this.map.geoObjects.add(this.placemark);
        this.map.setCenter(position);
    }

    uploadModalContent(content) {
        this.nFindSingle('title').innerHTML = content.title;
        this.nFind('item').forEach((item, index) => {
            if (content.distance[index]) {
                item.querySelector(`.${this.componentName}__item-title`).innerHTML = content.distance[index].title;
                item.querySelector(`.${this.componentName}__item-text`).innerHTML = content.distance[index].text;
            }
            else {
                item.querySelector(`.${this.componentName}__item-title`).innerHTML = '';
                item.querySelector(`.${this.componentName}__item-text`).innerHTML = '';
            }
        });
    }

    destroy() {
    }
}

export default ContactsModal;
