import {qs} from '../helpers.js';
import View from './View.js';

export default class SearchFormView extends View {
    constructor() {
        super(qs('#search-form-view'));

        this.resetElement = qs('[type=reset]', this.element);
        this.placeholderElement = qs('.placeholder', this.element);
        this.showResetButton(false);
        this.showPlaceholder(true);
    }

    showResetButton(visible = true) {
        this.resetElement.style.display = visible ? "block" : "none";
    }

    showPlaceholder(visible = true) {
        this.placeholderElement.style.display = visible ? "block" : "none";
    }
}
