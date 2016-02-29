import { Component, OnInit } from 'angular2/core';
import { NgClass } from 'angular2/common';
import { RouteParams, ROUTER_DIRECTIVES, OnActivate, OnDeactivate, ComponentInstruction } from 'angular2/router';
import { Title } from 'angular2/platform/browser';
import { Observable } from 'rxjs/Rx';

import { WordpressService } from '../../services/wordpress.service';
import { Post } from '../../models/post';

@Component({
  selector: 'blog',
  bindings: [Title, WordpressService],
  providers: [WordpressService],
  directives: [ROUTER_DIRECTIVES, NgClass],
  templateUrl: 'app/templates/blog.html',
})

export class BlogComponent  implements OnActivate, OnDeactivate {

  public page: number = 1;
  public posts: Array<Post> = [];
  private enter: Boolean = false;
  private leave: Boolean = false;

  constructor(
    private _wordpressService: WordpressService,
    private _routeParams: RouteParams,
    private _title:Title)
  {}

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
    if(prev && prev.componentType.name == 'PostComponent') {
      this.enter = true;
    }
  }

  routerOnDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    if(next.componentType.name == 'PostComponent') {
      this.enter = false;
      this.leave = true;
      return Observable.of(true).delay(300).toPromise();
    }
  }

  ngOnInit() {
    this._title.setTitle("3sq.re - Blog");
    if(this._routeParams.get('page')) {
      this.page = +this._routeParams.get('page');
    }
    this._wordpressService.getPosts(this.page).subscribe((posts: Array<Post>) => {
      this.posts = posts
    });
  }
}
