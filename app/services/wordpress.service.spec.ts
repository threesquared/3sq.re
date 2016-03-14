import {
  describe,
  expect,
  it,
  inject,
  beforeEachProviders
} from 'angular2/testing';

import { provide } from 'angular2/core';

import { HttpService } from './http.service';
import { WordpressService } from './wordpress.service';
import { Post } from '../models/post';

class MockHttpService {
  getUrl() {}
  mapResults () {}
}

describe('Wordpress Service', () => {

  beforeEachProviders(() => [
    provide(HttpService, { useClass: MockHttpService }),
    WordpressService,
  ]);

  it('should get projects', inject([WordpressService, HttpService], (wordpressService: WordpressService, mockHttpService: HttpService) => {

    let data = { ID: 1, title: 'name', content: 'url', date: 'desc', author: { name: 'name' }, slug: 'slug' };

    spyOn(mockHttpService, 'getUrl');
    spyOn(mockHttpService, 'mapResults');

    let projects = wordpressService.getProjects();

    expect(mockHttpService.getUrl).toHaveBeenCalled();
    expect(mockHttpService.mapResults).toHaveBeenCalled();

  }));

  it('should get hydrate a post', inject([WordpressService], (wordpressService: WordpressService) => {

    let data = { ID: 1, title: 'name', content: 'url', date: 'desc', author: { name: 'name' }, slug: 'slug' };
    let post = wordpressService._hydratePost(data);

    expect(post instanceof Post).toBeTruthy();
    expect(post.id).toBe(1);

  }));

});
