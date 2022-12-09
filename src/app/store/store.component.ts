import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { Store } from '../model/store';
import { StoreService } from '../services/store.service';
import { Shared } from '../util/shared';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  store!: Store;
  storeOld!: Store;
  stores?: Store[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message: string = '';

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.store = new Store('');
    this.stores = this.storeService.getStores();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.storeService.isExist(this.store.name)) {
      this.storeService.save(this.store);
    } else {
      this.storeService.update(this.storeOld.name, this.store);
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Cadastro realizado com sucesso!';
    this.form.reset();
    this.store = new Store('');
    this.stores = this.storeService.getStores();
  }

  onEdit(store: Store) {
    this.storeOld = Store.clone(store);
    this.store = this.storeOld;
  }

  onDelete(name: string) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover ' + name + '?'
    );
    if (!confirmation) {
      return;
    }
    let response: boolean = this.storeService.delete(name);
    this.isShowMessage = true;
    this.isSuccess = response;
    if (response) {
      this.message = 'O fornecedor foi removido com sucesso!';
    } else {
      this.message = 'Opps! O fornecedor não pôde ser removido!';
    }
    this.stores = this.storeService.getStores();
  }

}
