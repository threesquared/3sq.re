import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { CacheService } from './cache.service';

@Injectable()
export class HttpService {

  constructor(
    private http: Http,
    private cache: CacheService) {}

  /**
   * Fetch a url and return results
   * @param {string} url
   * @return {Observable}
   */
  public getUrl(url: string): Observable<any> {
    return this.cache.checkCache(url, () => {
      return Observable.create(observer => {
        this.http.get(url)
          .map((res: Response) => res.json())
          .subscribe(
            data => observer.next(data),
            err => console.log(err),
            () => observer.complete()
          );
      });
    });
  }

  /**
   * Map results to an array of objects
   * @param {Observable} observable
   * @param {Function}   hydrator
   * @return {Observable}
   */
  public mapResults(observable: Observable<any>, hydrator: (item) => any): Observable<any> {
    return observable.map((results: { items?; }) => {
      let result: Array<any> = [];
      if (results) {
        let items: Array<any> = results.items ? results.items : results;
        items.forEach((item) => {
          result.push(hydrator(item));
        });
      }
      return result;
    });
  }

  /**
   * Map result to an object
   * @param {Observable} observable
   * @param {Function}   hydrator
   * @return {Observable}
   */
  public mapResult(observable: Observable<any>, hydrator: (item) => any): Observable<any> {
    return observable.map((results: Array<any>) => {
      let result = results[0];
      return hydrator(result);
    });
  }
}
