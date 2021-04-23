import Component from '../../common/js/component';

class LocationItem extends Component {
    constructor(nRoot, locationList) {
        super(nRoot, 'location-item');
        this.locationList = locationList;

        this.showMapClick = this.showMapClick.bind(this);
        this.getModalContent = this.getModalContent.bind(this);
        if (this.nFindSingle('show-map')) {
            this.nFindSingle('show-map').addEventListener('click', this.showMapClick);
        }
    }

    showMapClick(e) {
        e.preventDefault();
        this.locationList.contactsModal.createAndMoveMarker([
            parseFloat(e.currentTarget.getAttribute('data-lat')),
            parseFloat(e.currentTarget.getAttribute('data-lng')),
        ], e.currentTarget.getAttribute('data-address'));
        if (e.target.closest('.location-item').querySelector(`.${this.componentName}__hidden`)) {
            let hiddenContainer = e.target.closest('.location-item').querySelector(`.${this.componentName}__hidden`);
            this.getModalContent(hiddenContainer);
        }
    }

    getModalContent(hiddenContainer) {
        let modalContent = {};
        modalContent.distance = [];
        modalContent.title = hiddenContainer.querySelector(`.${this.componentName}__modal-title`).innerText;
        hiddenContainer.querySelectorAll(`.${this.componentName}__distance`).forEach((distance, index) => {
            modalContent.distance[index] = {
                title: distance.querySelector(`.${this.componentName}__distance-title`).innerText,
                text: distance.querySelector(`.${this.componentName}__distance-text`).innerText,
            };
        });
        this.locationList.contactsModal.uploadModalContent(modalContent);
    }

    destroy() {
        this.contactsModal.destroy();
    }
}

export default LocationItem;
