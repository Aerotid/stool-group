import Component from '../../common/js/component';
import {nFindComponent, nFindComponents} from "../../common/js/helpers";
import LocationItem from "../location-item/location-item";
import ContactsModal from "../contacts-modal/contacts-modal";

class LocationList extends Component {
    constructor(nRoot) {
        super(nRoot, 'location-list');
        this.locationItems = nFindComponents('location-item', this.nRoot).map(item => new LocationItem(item, this));
        this.contactsModal = new ContactsModal(nFindComponent('contacts-modal'));
    }

    destroy() {
        this.contactsModal.destroy();
    }
}

export default LocationList;
