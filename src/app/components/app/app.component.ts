import { Component } from '@angular/core';
import { WordpressService } from '../../services/wordpress.service';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app',
  templateUrl: '../../templates/app.html',
  providers: [
    WordpressService,
    GithubService
  ]
})
export class AppComponent {}
