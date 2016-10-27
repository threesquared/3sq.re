import { TestBed, inject } from '@angular/core/testing';

import { GithubService } from './github.service';
import { HttpService } from './http.service';
import { Repository } from '../models/repository';
import { Issue } from '../models/issue';

class MockHttpService {

}

describe('Github Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpService, useClass: MockHttpService },
        GithubService
      ]
    });
  });

  it('should get hydrate a repository', inject([GithubService], (githubService: GithubService) => {

    let data = { id: 1, name: 'name', html_url: 'url', description: 'desc' };
    let repo = githubService.hydrateRepository(data);

    expect(repo instanceof Repository).toBeTruthy();
    expect(repo.id).toBe(1);

  }));

  it('should get hydrate an issue', inject([GithubService], (githubService: GithubService) => {

    let data = { title: 'title', html_url: 'url' };
    let issue = githubService.hydrateIssue(data);

    expect(issue instanceof Issue).toBeTruthy();
    expect(issue.title).toBe('title');

  }));

});
