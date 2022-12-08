import { Constants } from './constants';
import { Store } from '../model/store';

export class Shared {
  constructor() {}

  /**
	Cadastra um usuário default para funcionamento do login.
	Só realiza o cadastro caso o usuário ainda não esteja salvo no WebStorage.
*/
  public static initializeWebStorage(): void {
    if (localStorage.getItem(Constants.STORES_KEY) != null) {
      return;
    }

    //usuário definido na forma literal
    let store = new Store('G3 Informática');

    localStorage.setItem(Constants.STORES_KEY, JSON.stringify(store));
    localStorage.setItem(Constants.STORES_KEY, JSON.stringify([]));

  }
}
