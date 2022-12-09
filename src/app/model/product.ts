// import { Store } from "./store";

export class Product {
    public id!: string;
    public name: string;
    public price: number;
    //store: Store;

    constructor(name: string, price: number) {
      // this.id = String(Math.round(Math.random() * 1000));
      this.name = name;
      this.price = price;
      //this.store = store;
    }

    public static clone(product: Product) {
      let p: Product = new Product(product.name, product.price);
      p.name = product.name;
      p.price = product.price;
      //p.store = product.store;
      return p;
    }

  }
