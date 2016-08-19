import { provideRouter, RouterConfig }  from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { BlogComponent } from '../components/blog/blog.component';
import { PostComponent } from '../components/post/post.component';
import { LostComponent } from '../components/lost/lost.component';

const routes: RouterConfig = [
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
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
