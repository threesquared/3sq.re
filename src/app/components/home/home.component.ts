import { Component, OnInit, } from '@angular/core';

import { SeoHelper } from '../../helpers/seo.helper';
import { WordpressService } from '../../services/wordpress.service';
import { GithubService } from '../../services/github.service';

import { Post } from '../../models/post';
import { Repository } from '../../models/repository';
import { Issue } from '../../models/issue';

@Component({
  selector: 'home',
  templateUrl: '../../templates/home.html'
})

export class HomeComponent implements OnInit {

  public projects: Array<Post>;
  public snippets: Array<Post>;
  public latest: Post;
  public repositories: Array<Repository>;
  public pullRequests: Array<Issue>;
  public birthday: Date;
  public age: number;

  constructor(
    private _wordpressService: WordpressService,
    private _githubService: GithubService,
    private _seoHelper: SeoHelper
  ) {
  }

  public ngOnInit() {
    this._seoHelper.setMeta('Ben Speakman\'s portfolio', 'Portfolio of Ben Speakman, a talented software engineering graduate and backend PHP developer');
    this.birthday = new Date('1988-04-09');
    this.age = this._calculateAge(this.birthday);
    this._getWordpress();
    this._getGithub();
  }

  /**
   * Get data from wordpress service
   */
  private _getWordpress() {
    this._wordpressService.getProjects().subscribe((posts: Array<Post>) => this.projects = posts);
    this._wordpressService.getSnippets().subscribe((posts: Array<Post>) => this.snippets = posts);
    this._wordpressService.getLatestPost().subscribe((post: Post) => this.latest = post);
  }

  /**
   * Get data from github service
   */
  private _getGithub() {
    this._githubService.getRepositories().subscribe((repositories: Array<Repository>) => this.repositories = repositories);
    this._githubService.getPullRequests().subscribe((issues: Array<Issue>) => this.pullRequests = issues);
  }

  /**
   * Calculate age in years from a given date
   * @param {Date} birthday
   */
  private _calculateAge(birthday: Date) {
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
