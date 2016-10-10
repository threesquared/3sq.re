import { Component, OnInit } from '@angular/core';
import { isBrowser } from 'angular2-universal';

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
    private wordpressService: WordpressService,
    private githubService: GithubService,
    private seoHelper: SeoHelper
  ) {}

  public ngOnInit() {
    this.seoHelper.setMeta('Ben Speakman\'s portfolio', 'Portfolio of Ben Speakman, a talented software engineering graduate and backend PHP developer');
    this.birthday = new Date('1988-04-09');
    this.age = this.calculateAge(this.birthday);
    this.getWordpress();
    this.getGithub();
  }

  /**
   * Get data from wordpress service
   */
  private getWordpress() {
    if (isBrowser) {
      this.wordpressService.getProjects().subscribe((posts: Array<Post>) => this.projects = posts);
      this.wordpressService.getSnippets().subscribe((posts: Array<Post>) => this.snippets = posts);
      this.wordpressService.getLatestPost().subscribe((post: Post) => this.latest = post);
    }
  }

  /**
   * Get data from github service
   */
  private getGithub() {
    if (isBrowser) {
      this.githubService.getRepositories().subscribe((repositories: Array<Repository>) => this.repositories = repositories);
      this.githubService.getPullRequests().subscribe((issues: Array<Issue>) => this.pullRequests = issues);
    }
  }

  /**
   * Calculate age in years from a given date
   * @param {Date} birthday
   */
  private calculateAge(birthday: Date) {
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
