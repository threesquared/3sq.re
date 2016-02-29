import {
  describe,
  expect,
  it,
  inject,
  beforeEachProviders
} from 'angular2/testing';

import { provide } from 'angular2/core';

import { HttpService } from './http.service';
import { GithubService } from './github.service';
import { Repository } from '../models/repository';
import { Issue } from '../models/issue';

class MockHttpService {

}

describe('Github Service', () => {

  beforeEachProviders(() => [
    provide(HttpService, { useClass: MockHttpService }),
    GithubService
  ]);

  it('should get hydrate a repository', inject([GithubService], (githubService: GithubService) => {

    let data = { id: 1, name: 'name', html_url: 'url', description: 'desc' };
    let repo = githubService._hydrateRepository(data);

    expect(repo instanceof Repository).toBeTruthy();
    expect(repo.id).toBe(1);

  }));

  it('should get hydrate an issue', inject([GithubService], (githubService: GithubService) => {

    let data = { title: 'title', html_url: 'url' };
    let issue = githubService._hydrateIssue(data);

    expect(issue instanceof Issue).toBeTruthy();
    expect(issue.title).toBe('title');

  }));

});
