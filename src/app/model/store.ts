export class Store {
  public name: string;

  constructor(public storeName: string) {
    this.name = storeName;
  }

  public static clone(store: Store) {
    let s: Store = new Store(store.name);
    s.name = store.name;
    return s;
  }

}
