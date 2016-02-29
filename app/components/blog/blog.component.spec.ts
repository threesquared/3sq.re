import {
  describe,
  expect,
  it,
  inject,
  injectAsync,
  beforeEachProviders
} from 'angular2/testing';

import { provide } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';
import { Observable } from 'rxjs/Rx';

import { BlogComponent } from './blog.component';
import { WordpressService } from '../../services/wordpress.service';

class MockRouteParams {
  get() {
    return 0;
  }
}

class MockWordpressService {
  getPosts() {
    return Observable.of([{id: 26}]);
  }
}

describe('Blog Component', () => {

  beforeEachProviders(() => [
    BlogComponent,
    provide(WordpressService, { useClass: MockWordpressService }),
    provide(RouteParams, { useClass: MockRouteParams }),
    Title
  ]);

  it('Can get blogs', inject([BlogComponent], (blogComponent: BlogComponent, _wordpressService: WordpressService) => {

    blogComponent.ngOnInit();
    expect(blogComponent.page).toBe(1);
    expect(blogComponent.posts[0].id).toBe(26);

  }));
});
