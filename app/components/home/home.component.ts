import { Component, OnInit } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

import { WordpressService } from '../../services/wordpress.service';
import { GithubService } from '../../services/github.service';

import { Post } from '../../models/post';
import { Repository } from '../../models/repository';
import { Issue } from '../../models/issue';

@Component({
  selector: 'home',
  bindings: [Title, WordpressService, GithubService],
  providers: [WordpressService, GithubService],
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'app/templates/home.html',
})

export class HomeComponent {

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
    private _routeParams: RouteParams,
    private _title: Title)
  {}

  ngOnInit() {
    let section = this._routeParams.get('s');
    if (section) {
      this.scrollTo(section);
    }
    this._title.setTitle("3sq.re - Ben Speakman's portfolio");
    this.birthday = new Date('1988-04-09');
    this.age = this._calculateAge(this.birthday);
    this._getWordpress();
    this._getGithub();
  }

  /**
   * Scroll page to element
   * @param {string} target
   */
  scrollTo(target) {
    document.getElementById(target).scrollIntoView();
  }

  /**
   * Get data from wordpress service
   */
  _getWordpress() {
    this._wordpressService.getProjects().subscribe((posts: Array<Post>) => this.projects = posts);
    this._wordpressService.getSnippets().subscribe((posts: Array<Post>) => this.snippets = posts);
    this._wordpressService.getLatestPost().subscribe((post: Post) => this.latest = post);
  }

  /**
   * Get data from github service
   */
  _getGithub() {
    this._githubService.getRepositories().subscribe((repositories: Array<Repository>) => this.repositories = repositories);
    this._githubService.getPullRequests().subscribe((issues: Array<Issue>) => this.pullRequests = issues);
  }

  /**
   * Calculate age in years from a given date
   * @param {Date} birthday
   */
  _calculateAge(birthday: Date) {
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
