import {on, qs} from '../helpers.js';
import View from './View.js';

const tag = '[SearchFormView]';

export default class SearchFormView extends View {
  constructor() {
    super(qs('#search-form-view'));

    this.inputElement = qs('[type=text]', this.element);
    this.resetElement = qs('[type=reset]', this.element);
    this.placeholderElement = qs('.placeholder', this.element);

    this.showResetButton(false);
    this.showPlaceholder(true);
    this.bindEvent();
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }

  showPlaceholder(visible = true) {
    this.placeholderElement.style.display = visible ? "block" : "none";
  }

  bindEvent() {
    on(this.inputElement, "keydown", () => this.handleKeydown());
    on(this.inputElement, "keyup", () => this.handleKeyup());
    on(this.element, "submit", event => this.handleSubmit(event));
    on(this.resetElement, 'click', () => this.handleReset());
  }

  handleKeydown() {
    const {value} = this.inputElement;
    this.showPlaceholder(false);
  }

  handleKeyup() {
    const {value} = this.inputElement;
    this.showResetButton(value.length > 0);
    this.showPlaceholder(value.length === 0);

    if (value.length === 0) {
      this.handleReset();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {value} = this.inputElement;
    this.emit('@submit', {value});
  }

  handleReset() {
    const {value} = this.inputElement;
    this.emit('@reset', {value});
    this.showResetButton(false);
    this.showPlaceholder(true);
  }

  show(keyword = ''){
    this.inputElement.value = keyword;
    this.showResetButton(this.inputElement.value.length > 0);
    this.showPlaceholder(this.inputElement.value.length === 0);

    super.show();
  }
}
