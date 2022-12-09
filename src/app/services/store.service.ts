import { Constants } from 'src/app/util/constants';
import { Injectable } from '@angular/core';
import { Store } from './../model/store';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  stores!: Store[];
  private storeSource!: BehaviorSubject<number>;
  constructor() {
    this.stores = WebStorageUtil.get(Constants.STORES_KEY);
    this.storeSource = new BehaviorSubject<number>(this.stores.length);
  }

  save(store: Store) {
    this.stores = WebStorageUtil.get(Constants.STORES_KEY);
    this.stores.push(store);
    WebStorageUtil.set(Constants.STORES_KEY, this.stores);
  }

  update(storeOld: string, store: Store) {
    this.stores = WebStorageUtil.get(Constants.STORES_KEY);
    this.delete(storeOld);
    this.save(store);
  }

  delete(name: string): boolean {
    this.stores = WebStorageUtil.get(Constants.STORES_KEY);
    this.stores = this.stores.filter((s) => {
      return s.name?.valueOf() != name?.valueOf();
    });

    WebStorageUtil.set(Constants.STORES_KEY, this.stores);
    return true;
  }

  isExist(value: string): boolean {
    this.stores = WebStorageUtil.get(Constants.STORES_KEY);
    for (let s of this.stores) {
      if (s.name?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getStores(): Store[] {
    this.stores = WebStorageUtil.get(Constants.STORES_KEY);
    return this.stores;
  }

  notifyTotalUsers() {
    this.storeSource.next(this.getStores()?.length);
  }

  asObservable(): Observable<number> {
    return this.storeSource;
  }
}
