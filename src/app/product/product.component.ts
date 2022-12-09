import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../model/product';
import { ProductPromiseService } from '../services/product-promise.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  product!: Product;
  //productClone!: Product;
  products: Product[] = [];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message: string = '';

  constructor(private productPromiseService: ProductPromiseService) { }

  ngOnInit(): void {
    this.product = new Product('', 0);
    this.productPromiseService.getAll()
    .subscribe((p) => {
      this.products = p;
    });
  }

  onSubmit() {
    //this.checkIfExists();

    this.isSubmitted = true;

    this.productPromiseService.save(this.product)
    .then( savedProduct => {
      this.isShowMessage = true;
      this.isSuccess = true;
      this.message = 'Cadastro realizado com sucesso!';
      this.form.reset();
      this.product = new Product('', 0);
      this.productPromiseService.getAll()
        .subscribe((p) => {
          this.products = p;
        });
    })
    .catch((e) => {
      alert('Houve um erro ao gravar os dados! Descrição: ' + e);
      this.isShowMessage = true;
      this.isSuccess = false;
      this.message = 'Erro ao realizar cadastro!';
    });
  }

//  onEdit(product: Product) {
//    this.productClone = Product.clone(product);
//    this.product = this.productClone;
//  }

  onDelete(product: Product) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover ' + product.name + '?'
    );
    if (!confirmation) {
      return;
    }

    this.productPromiseService.delete(product.id)
    .subscribe(() => {
      this.products = this.products
      .filter(p => p.id !== product.id);
    });
  }
}
