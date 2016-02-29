import {
  describe,
  expect,
  it,
  inject,
  beforeEachProviders
} from 'angular2/testing';

import { Observable } from 'rxjs/Rx';

import { CacheService } from './cache.service';

describe('Cache Service', () => {

  beforeEachProviders(() => [
    CacheService
  ]);

  it('should check cache', inject([CacheService], (cacheService) => {

    let spy = {
      setBar: () => {}
    };

    spyOn(spy, 'setBar');

    let callback = () => {
      return Observable.create(observer => {
        spy.setBar();
        observer.next([{id: 1}]);
        observer.complete();
      });
    };

    let key = 'test';

    cacheService.checkCache(key, callback).subscribe(data => {
      expect(data[0].id).toBe(1);
      expect(spy.setBar).toHaveBeenCalled();
    });

    cacheService.checkCache(key, callback).subscribe(data => {
      expect(data[0].id).toBe(1);
      expect(spy.setBar.calls.count()).toEqual(1);
    });

  }));

});
