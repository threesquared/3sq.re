import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../models/post';
import { HttpService } from './http.service';

@Injectable()
export class WordpressService {

  private endpoint: string;

  constructor(private httpService: HttpService) {
    this.endpoint = 'https://3sq.re/blog/wp-json';
  }

  /**
   * Get latest projects
   * @return {Observable}
   */
  public getProjects(): Observable<any> {
    let results = this.httpService.getUrl(`${this.endpoint}/posts?filter[posts_per_page]=5&filter[category_name]=Projects`);
    return this.httpService.mapResults(results, this._hydratePost);
  }

  /**
   * Get latest snippets
   * @return {Observable}
   */
  public getSnippets(): Observable<any> {
    let results = this.httpService.getUrl(`${this.endpoint}/posts?filter[posts_per_page]=5&filter[category_name]=Snippets`);
    return this.httpService.mapResults(results, this._hydratePost);
  }

  /**
   * Get the latest post
   * @return {Observable}
   */
  public getLatestPost(): Observable<any> {
    let result = this.httpService.getUrl(`${this.endpoint}/posts?filter[posts_per_page]=1`);
    return this.httpService.mapResult(result, this._hydratePost);
  }

  /**
   * Get post from slug
   * @param {string} slug
   * @return {Observable}
   */
  public getPost(slug: string): Observable<any> {
    let result = this.httpService.getUrl(`${this.endpoint}/posts?filter[name]=${slug}`);
    return this.httpService.mapResult(result, this._hydratePost);
  }

  /**
   * Get posts
   * @param {number} page
   * @return {Observable}
   */
  public getPosts(page: number = 1): Observable<any> {
    let results = this.httpService.getUrl(`${this.endpoint}/posts?filter[posts_per_page]=5&page=${page}`);
    return this.httpService.mapResults(results, this._hydratePost);
  }

  /**
   * Create a new Post from data
   * @param  {Array} data
   * @return {Post}
   */
  private _hydratePost(data: { ID; title; content; date; modified; author: { name; }; slug; link; yoast_meta: { yoast_wpseo_metadesc; }; terms: { category: Array<{ name; }>; };  }): Post {
    return new Post(data.ID, data.title, data.yoast_meta.yoast_wpseo_metadesc, data.content, new Date(data.date), new Date(data.modified), data.author.name, data.slug, data.link, data.terms.category[0].name);
  }

}