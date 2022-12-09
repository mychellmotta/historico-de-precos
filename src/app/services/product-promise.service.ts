import { Product } from './../model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductPromiseService {
  URL = 'http://localhost:3000/products';
  URL_PT = 'http://localhost:3000/produtos';
  products!: Product[];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {  }

  getAll(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.URL}`);
  }

  getById(id: string) {
    return this.httpClient.get<Product>(`${this.URL}/${id}`);
  }

  delete(id: string): Observable<{}>{
    return this.httpClient.delete(`${this.URL}/${id}`);
  }

  save(product: Product) {
    let promise = new Promise<Product>((resolve, reject) => {
      if (product.price <= 0) {
        reject('Por favor, informe o valor!');
          return;
      }
      product.id = String(Math.round(Math.random() * 1000));
      this.httpClient.post<Product>(this.URL, product, this.httpOptions)
        .toPromise()
        .then(
          prod => {
            if(prod != null) {
              resolve(prod);
            } else {
              reject('Falha ao gravar registro');
            }
          })
          .catch((e) => {
            reject('Erro ao gravar registro!');
          });
    });
    return promise;
  }

  update(product: Product): Promise<Product> {
    return firstValueFrom(this.httpClient
      .put<Product>(
        `${this.URL}/${product.id}`,
        JSON.stringify(product),
        this.httpOptions
      ));
  }
}
