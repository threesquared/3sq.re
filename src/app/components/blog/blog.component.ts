import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import { SeoHelper } from '../../helpers/seo.helper';
import { WordpressService } from '../../services/wordpress.service';
import { Post } from '../../models/post';

@Component({
  selector: 'blog',
  directives: [ROUTER_DIRECTIVES, NgClass],
  templateUrl: '../../templates/blog.html',
})

export class BlogComponent implements OnInit, OnDestroy {

  public page: number = 1;
  public posts: Array<Post> = [];
  private sub: any;

  constructor(
    private _route: ActivatedRoute,
    private _wordpressService: WordpressService,
    private _seoHelper: SeoHelper) {}

  public ngOnInit() {
    this._seoHelper.setMeta('Blog', 'Blog');

    this.sub = this._route.params.subscribe(params => {
      let page = params['page'];
      if (page) {
        this.page = +page;
      }
      this._wordpressService.getPosts(this.page).subscribe((posts: Array<Post>) => {
        this.posts = posts;
      });
    });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
