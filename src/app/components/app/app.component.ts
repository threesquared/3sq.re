import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { PageScroll, PageScrollConfig } from 'ng2-page-scroll';

import { HomeComponent } from '../home/home.component';
import { BlogComponent } from '../blog/blog.component';
import { PostComponent } from '../post/post.component';
import { LostComponent } from '../lost/lost.component';

import { WordpressService } from '../../services/wordpress.service';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app',
  templateUrl: '../../templates/app.html',
  directives: [ROUTER_DIRECTIVES, PageScroll],
  precompile: [PostComponent, HomeComponent, BlogComponent, LostComponent],
  providers: [
    WordpressService,
    GithubService
  ]
})
export class AppComponent {
  private date: Date = new Date();

  constructor() {
    PageScrollConfig.defaultDuration = 500;
  }
}
