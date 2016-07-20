import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CacheService {

  private cache: Array<any> = [];

  /**
   * Check the cache for this result otherwise fetch it
   * @param {Array}    key
   * @param {Function} callback
   * @return {Observable}
   */
  public checkCache(key: string, callback: () => Observable<any>): Observable<any> {
    return Observable.create(observer => {
      if (this._check(key)) {
        observer.next(this._get(key));
      } else {
        callback().subscribe((results: Array<any>) => {
          this._put(key, results);
          observer.next(results);
          observer.complete();
        });
      }
    });
  }

  /**
   * Check cache for given key
   * @param {string} key
   * @return {bool}
   */
  private _check(key: string) {
    if (typeof this.cache[key] === 'undefined') {
      return false;
    }
    return true;
  }

  /**
   * Put data in the cache with this key
   * @param {string} key
   * @param {any}    data
   * @return {void}
   */
  private _put(key: string, data: any) {
    this.cache[key] = data;
  }

  /**
   * Get data from the cache with this key
   * @param {string} key
   * @return {any}
   */
  private _get(key: string) {
    return this.cache[key];
  }

}
