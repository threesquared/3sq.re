import { Component, OnInit, ElementRef, Injector, DynamicComponentLoader } from 'angular2/core';
import { RouteData, ROUTER_DIRECTIVES, CanActivate, OnActivate, OnDeactivate, ComponentInstruction} from 'angular2/router';
import { NgClass } from 'angular2/common';
import { Title } from 'angular2/platform/browser';
import { Observable } from 'rxjs/Rx';

import { appInjector } from '../../injectors/app.injector';
import { WordpressService } from '../../services/wordpress.service';
import { Post } from '../../models/post';
import { Disqus } from 'ng2-disqus/disqus';
import { toComponent } from '../../helpers/component.compiler';

@Component({
  selector: 'post',
  bindings: [Title, WordpressService],
  providers: [WordpressService],
  directives: [ROUTER_DIRECTIVES, Disqus, NgClass],
  templateUrl: 'app/templates/post.html',
})

@CanActivate((to: ComponentInstruction) => {
  let injector: Injector = appInjector();
  let _wordpressService: WordpressService = injector.get(WordpressService);

  return new Promise((resolve) => {
    _wordpressService.getPost(to.params['slug']).subscribe((post: Post) => {
      to.routeData.data['post'] = post;
      resolve(true);
    });
  });
})

export class PostComponent implements OnActivate, OnDeactivate {

  public post: Post;
  private enter: Boolean = false;
  private leave: Boolean = false;

  constructor(
    private _wordpressService: WordpressService,
    private _routeData: RouteData,
    private _title: Title,
    private _loader: DynamicComponentLoader,
    private _elementRef: ElementRef)
  {
    this.post = _routeData.get('post');
  }

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
    if (prev && prev.componentType.name === 'BlogComponent') {
      this.enter = true;
    }
  }

  routerOnDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    if (next.componentType.name === 'BlogComponent') {
      this.enter = false;
      this.leave = true;
      return Observable.of(true).delay(300).toPromise();
    }
  }

  ngOnInit() {
    this._title.setTitle("3sq.re - " + this.post.title);
    this._loader.loadIntoLocation(
      toComponent(this.post.getContent()),
      this._elementRef,
      'content'
    );
  }
}
