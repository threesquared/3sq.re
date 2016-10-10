import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { Ng2DisqusModule } from 'ng2-disqus';

import { AppComponent } from './app/components/app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import { BlogComponent } from './app/components/blog/blog.component';
import { PostComponent } from './app/components/post/post.component';
import { LostComponent } from './app/components/lost/lost.component';

import { HttpService } from './app/services/http.service';
import { CacheService } from './app/services/cache.service';
import { WordpressService } from './app/services/wordpress.service';
import { SeoHelper } from './app/helpers/seo.helper';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent, HomeComponent, BlogComponent, PostComponent, LostComponent],
  providers: [
      HttpService,
      CacheService,
      WordpressService,
      SeoHelper
  ],
  imports: [
    UniversalModule,
    Ng2DisqusModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
      {
        path: 'blog/:year/:month/:slug',
        component: PostComponent
      },
      {
        path: '**',
        component: LostComponent
      },
    ])
  ]
})
export class MainModule {

}
