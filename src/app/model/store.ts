export class Store {
  id!: string;
  public name: string;

  constructor(name: string) {
    this.id = String(Math.round(Math.random() * 1000));
    this.name = name;
  }

  public static clone(store: Store) {
    let s: Store = new Store(store.name);
    s.name = store.name;
    return s;
  }

}
