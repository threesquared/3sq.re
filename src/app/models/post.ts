export class Post {

  public id: number;
  public title: string;
  public description: string;
  public content: string;
  public date: Date;
  public modified: Date;
  public author: string;
  public slug: string;
  public link: string;
  public category: string;

  constructor(id: number, title: string, description: string, content: string, date: Date, modified: Date, author: string, slug: string, link: string, category: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.content = content;
    this.date = date;
    this.modified = modified;
    this.author = author;
    this.slug = slug;
    this.link = link;
    this.category = category;
  }

  public getUrl() {
    return `/${this.getYear()}/${this.getMonth()}/${this.slug}`;
  }

  public getExcerpt() {
    let arr = this.content.split('<!--more-->');
    return arr[0];
  }

  public getMonth() {
    return ('0' + (this.date.getMonth() + 1)).slice(-2);
  }

  public getYear() {
    return this.date.getFullYear();
  }
}
