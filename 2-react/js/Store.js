import storage from './storage.js';
import { createNextId } from './helpers.js';

class Store {
  constructor(storage) {
    if (!storage) throw 'no storage';

    this.storage = storage;
  }

  search(keyword) {
    return this.storage.productData.filter(product => 
      product.name.includes(keyword)
    );
  }

  getKeywordList() {
    return this.storage.keywordData;
  }
}

const store = new Store(storage);
export default store;
