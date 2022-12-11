import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.product = new Product('', 0);
    this.productService.getAll().subscribe((p) => {
      this.products = p;
    });
  }

  onSubmit() {
    //this.checkIfExists();

    this.isSubmitted = true;

    this.productService
      .save(this.product)
      .then((savedProduct) => {
        this.isShowMessage = true;
        this.isSuccess = true;
        this.message = 'Cadastro realizado com sucesso!';
        this.form.reset();
        this.product = new Product('', 0);
        this.productService.getAll().subscribe((p) => {
          this.products = p;
        });
      })
      .catch((e) => {
        // alert('Houve um erro ao gravar os dados! Descrição: ' + e);
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

    this.productService.delete(product.id).subscribe(
      () => {
        this.products = this.products.filter((p) => p.id !== product.id);
      },
      (error) => {
        this.message = 'Erro ao excluir!';
        this.isSuccess = false;
        this.message = error.message;
        this.isShowMessage = true;
      }
    );
  }
}
