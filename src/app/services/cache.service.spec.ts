import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { CacheService } from './cache.service';

describe('Cache Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CacheService
      ]
    });
  });

  it('should check cache', inject([CacheService], (cacheService: CacheService) => {
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

