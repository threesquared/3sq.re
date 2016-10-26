import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { CacheService } from './cache.service';

class TestClass {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

describe('Http Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        HttpService,
        CacheService
      ]
    });
  });

  it('should get url', inject([MockBackend, HttpService], (mockBackend: MockBackend, httpService: HttpService) => {

    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: [{id: 26}]
        })
      ));
    });

    httpService.getUrl('http://test.null/test.json').subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].id).toBe(26);
    });

  }));

  it('should log error', inject([MockBackend, HttpService], (mockBackend: MockBackend, httpService: HttpService) => {

    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          status: 400,
          body: 'Error'
        })
      ));
    });

    console.log = jasmine.createSpy('log');

    httpService.getUrl('http://test.null/test.json').subscribe(() => {
      expect(console.log).toHaveBeenCalled();
    });

  }));

  it('should map results', inject([HttpService], (httpService) => {

    let observable = Observable.of({items: [{id: 1}]});

    let hydrator = (data) => { return new TestClass(data.id); };

    httpService.mapResults(observable, hydrator).subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0] instanceof TestClass).toBeTruthy();
      expect(data[0].id).toBe(1);
    });

  }));

  it('should map a result', inject([HttpService], (httpService) => {

    let observable = Observable.of([{id: 1}]);

    let hydrator = (data) => { return new TestClass(data.id); };

    httpService.mapResult(observable, hydrator).subscribe(data => {
      expect(data instanceof TestClass).toBeTruthy();
      expect(data.id).toBe(1);
    });

  }));

});
