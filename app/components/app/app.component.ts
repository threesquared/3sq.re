import { Component } from 'angular2/core';
import { Router, Location, RouteConfig, ROUTER_DIRECTIVES, Instruction } from 'angular2/router';

import { BlogComponent } from '../blog/blog.component';
import { HomeComponent } from '../home/home.component';
import { PostComponent } from '../post/post.component';
import { LostComponent } from '../lost/lost.component';

@Component({
  selector: 'app',
  templateUrl: 'app/templates/app.html',
  directives: [ROUTER_DIRECTIVES],
})

@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
  { path: '/blog', name: 'Blog', component: BlogComponent },
  { path: '/blog/:year/:month/:slug', name: 'Post', component: PostComponent },
  { path: '/404', name: 'Lost', component: LostComponent },
])

export class AppComponent {

  private date: Date = new Date();

  constructor(
    private _router: Router,
    private _location: Location)
  {
    _router.recognize(_location.path()).then((instruction: Instruction) => {
      if (!instruction) {
         _router.recognize('/404').then((instruction: Instruction) => {
           _router.navigateByInstruction(instruction, true);
        });
      }
    });
  }

}
