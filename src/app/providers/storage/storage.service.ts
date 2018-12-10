import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

/**
 * Provider service
 */
@Injectable()
export class StorageService {

  /**
   * @ignore
   */
  constructor(
    public localStorage: LocalStorage,
  ) { }

  /**
   * Retrieve data from storage with a key identifier.
   * @param key Key identifier.
   * @returns Any return.
   */
  retrieve(key: string): Promise<any> {
    return new Promise<any>(resolve => this.localStorage.getItem(key).subscribe(value => resolve(value)));
  }

  /**
   * Clear storage.
   * @returns Void return.
   */
  clear(): Promise<any> {
    return new Promise<any>(resolve => this.localStorage.clear().subscribe(_ => resolve()));
  }

  /**
   * Store data.
   * @param key Key to identiy in storage.
   * @param value Object to store.
   */
  store(key: string, value: any): Promise<any> {
    return new Promise<any>(resolve => this.localStorage.setItem(key, value).subscribe(_ => resolve()));
  }

  /**
   * Remove item from storage.
   * @param key Key of item.
   */
  removeItem(key: string): Promise<any> {
    return new Promise<any>(resolve => this.localStorage.removeItem(key).subscribe(_ => resolve()));
  }

}
