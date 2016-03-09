import {
  describe,
  expect,
  beforeEach,
  it,
  inject,
  injectAsync,
  beforeEachProviders
} from 'angular2/testing';

import { Component, provide } from 'angular2/core';
import { Headers, HTTP_PROVIDERS, BaseRequestOptions, XHRBackend, Response } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing';
import { MockConnection } from 'angular2/src/http/backends/mock_backend';
import { ResponseOptions } from 'angular2/http';
import { Observable } from 'rxjs/Rx';

import { HttpService } from './http.service';
import { CacheService } from './cache.service';

class TestClass {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

describe('Http Service', () => {

  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, { useClass: MockBackend }),
      HttpService,
      CacheService
    ];
  });

  it('should get url', inject([XHRBackend, HttpService], (mockBackend: MockBackend, httpService: HttpService) => {

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

  it('should log error', inject([XHRBackend, HttpService], (mockBackend: MockBackend, httpService: HttpService) => {

    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          status: 400,
          body: 'Error'
        })
      ));
    });

    console.log = jasmine.createSpy("log");

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
