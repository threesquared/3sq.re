import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { BlogComponent } from './blog.component';
import { WordpressService } from '../../services/wordpress.service';
import { SeoHelper } from '../../helpers/seo.helper';

class MockWordpressService {
  getPosts() {
    return Observable.of([{ id: 26 }]);
  }
}

class MockActivatedRoute extends ActivatedRoute {
  params: Observable<Params>;
  constructor(parameters?: { [key: string]: any; }) {
    super();
    this.params = Observable.of(parameters);
  }
}

describe('Blog Component', () => {

  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(() => {
    mockActivatedRoute = new MockActivatedRoute({'page': 1});

    TestBed.configureTestingModule({
      providers: [
        BlogComponent,
        { provide: WordpressService, useClass: MockWordpressService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        SeoHelper
      ]
    });
  });

  it('Can get blogs', inject([BlogComponent], (blogComponent: BlogComponent) => {

    blogComponent.ngOnInit();
    expect(blogComponent.page).toBe(1);
    expect(blogComponent.posts[0].id).toBe(26);

  }));

});

