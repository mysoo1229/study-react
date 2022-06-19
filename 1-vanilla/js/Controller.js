const tag = "[Controller]";

export default class Controller {
  constructor(store, {searchFormView, searchResultView, tabView}) {
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.searchFormView
      .on('@submit', event => this.search(event.detail.value))
      .on('@reset', () => this.reset());

    this.tabView
      .on('@tabChange', event => this.changeTab(event.detail.value));
  }

  search(keyword) {
    this.store.search(keyword);
    this.render();
  }

  reset() {
    this.store.searchKeyword = '';
    this.store.searchResult = [];
    this.render();
  }

  changeTab(currentTab) {
    this.store.selectedTab = currentTab;
    this.render();
  }

  render() {
    if (this.store.searchKeyword.length > 0) {
      return this.renderSearchResult();
    }

    this.tabView.show(this.store.selectedTab);
    this.searchResultView.hide();
  }

  renderSearchResult() {
    this.tabView.hide();
    this.searchResultView.show(this.store.searchResult);
  }
}
