import { TestBed, inject } from '@angular/core/testing';

import { HttpService } from './http.service';
import { WordpressService } from './wordpress.service';

class MockHttpService {
  getUrl() {}
  mapResults () {}
}

describe('Wordpress Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpService, useClass: MockHttpService },
        WordpressService
      ]
    });
  });

  it('should get projects', inject([WordpressService, HttpService], (wordpressService: WordpressService, mockHttpService: HttpService) => {

    spyOn(mockHttpService, 'getUrl');
    spyOn(mockHttpService, 'mapResults');

    wordpressService.getProjects();

    expect(mockHttpService.getUrl).toHaveBeenCalled();
    expect(mockHttpService.mapResults).toHaveBeenCalled();

  }));

});
