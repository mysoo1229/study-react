import {qs, qsAll, on, delegate} from "../helpers.js";
import View from "./View.js";

const tag = '[TabView]';

export const TabType = {
  KEYWORD: 'KEYWORD',
  HISTORY: 'HISTORY'
}

const TabLabel = {
  [TabType.KEYWORD]: '추천 검색어',
  [TabType.HISTORY]: '최근 검색어',
}

export default class TabView extends View {
  constructor() {
    super(qs('#tab-view'));

    this.template = new Template();

    this.bindEvent();
  }

  bindEvent() {
    delegate(this.element, 'click', 'button', event => this.handleClick(event));
  }

  show(selectedTab) {
    this.element.innerHTML = this.template.getTabList();
    qsAll('button', this.element).forEach(button => {
      button.setAttribute('aria-selected', button.dataset.tab === selectedTab ? 'true' : 'false');
    })

    super.show();
  }

  handleClick(event) {
    const value = event.target.dataset.tab;
    this.emit('@tabChange', {value});
  }
}

class Template {
  getTabList() {
    return `
      <ul class="tabs">
        ${Object.values(TabType)
          .map((tabType) => ({tabType, tabLabel : TabLabel[tabType]}))
          .map(this._getTab)
          .join('')}
      </ul>
    `;
  }

  _getTab({tabType, tabLabel}) {
    return `
      <li>
        <button type="button" data-tab="${tabType}">
          ${tabLabel}
        </button>
      </li>
    `;
  }
}
