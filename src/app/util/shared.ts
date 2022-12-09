import { Constants } from './constants';
import { Store } from '../model/store';

export class Shared {
  constructor() {}

  public static initializeWebStorage(): void {
    if (localStorage.getItem(Constants.STORES_KEY) != null) {
      return;
    }

    //fornecedor definido na forma literal
    let store = new Store('G3 Informática');

    localStorage.setItem(Constants.STORES_KEY, JSON.stringify(store));

  }
}
