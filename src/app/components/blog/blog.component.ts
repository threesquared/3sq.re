import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SeoHelper } from '../../helpers/seo.helper';
import { WordpressService } from '../../services/wordpress.service';
import { Post } from '../../models/post';

@Component({
  selector: 'blog',
  templateUrl: '../../templates/blog.html'
})

export class BlogComponent implements OnInit, OnDestroy {

  public page: number = 1;
  public posts: Array<Post> = [];
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private wordpressService: WordpressService,
    private seoHelper: SeoHelper
  ) {}

  public ngOnInit() {
    this.seoHelper.setMeta('Blog', 'Blog');

    this.sub = this.route.params.subscribe(params => {
      let page = params['page'];
      if (page) {
        this.page = +page;
      }
      this.wordpressService.getPosts(this.page).subscribe((posts: Array<Post>) => {
        this.posts = posts;
      });
    });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
