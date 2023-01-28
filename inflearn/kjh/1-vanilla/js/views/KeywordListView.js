import { delegate, qs } from "../helpers.js";
import View from "./View.js";


export default class KeywordListView extends View {
  constructor(element = qs('#keyword-list-view'), template = new Template()) {
    super(element);

    this.template = template;
    this.bindEvents();
  }

  show(data = []) {
    this.element.innerHTML = 
      data.length > 0
        ? this.template.getList(data)
        : this.template.getEmptyMessage();
    super.show();
  }

  bindEvents() {
    delegate(this.element, 'click', 'button', event => this.handleClick(event));
  }

  handleClick(event) {
    const value = event.target.innerHTML;
    this.emit('@keywordClick', {value});
  }
}

class Template {
  getEmptyMessage() {
    return `<div class="empty-box">추천 검색어가 없습니다.</div>`;
  }

  getList(data = []) {
    return `
      <ul class="list">
        ${data.map(this._getItem).join('')}
      </ul>
    `;
  }

  _getItem({id, keyword}) {
    return `
      <li>
        <span class="number">${id}</span>
        <button type="button">${keyword}</button>
      </li>
    `;
  }
}
