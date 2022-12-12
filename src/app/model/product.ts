// import { Store } from "./store";

export class Product {
    public id!: string;
    public name: string;
    public price: number;
    public buyDate?: Date;
    public store: string;

    constructor(name: string, price: number, store: string) {
      // this.id = String(Math.round(Math.random() * 1000));
      this.name = name;
      this.price = price;
      this.store = store;
    }

    public static clone(product: Product) {
      let p: Product = new Product(product.name, product.price, product.store);
      p.name = product.name;
      p.price = product.price;
      p.buyDate = product.buyDate;
      p.store = product.store;
      return p;
    }

  }
