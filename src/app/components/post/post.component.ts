import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SeoHelper } from '../../helpers/seo.helper';
import { WordpressService } from '../../services/wordpress.service';
import { Post } from '../../models/post';

@Component({
  selector: 'post',
  templateUrl: '../../templates/post.html',
})

export class PostComponent implements OnInit, OnDestroy {

  public post: Post;
  private sub: any;

  constructor(
    private _route: ActivatedRoute,
    private _wordpressService: WordpressService,
    private _seoHelper: SeoHelper) {}

  public ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      let slug = params['slug'];
      this._wordpressService.getPost(slug).subscribe((post: Post) => {
        this.post = post;
        this._seoHelper.setMeta(post.title, post.description, post.link, post.date, post.modified, post.category);
      });
    });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
