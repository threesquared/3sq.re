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
    return `/${this.date.getFullYear()}/${this.date.getMonth()}/${this.slug}`;
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

  // h4x
  public getContent() {
    let content = this.content;
    content = content.replace(/<pre>/g, '');
    content = content.replace(/<\/pre>/g, '');
    content = content.replace(/<\/code>/g, '</codeblock>');
    content = content.replace(/<code>/g, '<codeblock theme="okaidia">');
    content = content.replace(/<code class="language-php">/g, '<codeblock php theme="okaidia" [lineNumbers]="false">');
    content = content.replace(/<code class="language-javascript">/g, '<codeblock javascript theme="okaidia" [lineNumbers]="false">');
    content = content.replace(/<code class="language-ini">/g, '<codeblock ini theme="okaidia" [lineNumbers]="false">');
    content = content.replace(/<code class="language-bash">/g, '<codeblock bash theme="okaidia" [lineNumbers]="false">');
    return content;
  }

}
