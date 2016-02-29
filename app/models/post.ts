export class Post {

  id: number;
  title: string;
  content: string;
  date: Date;
  author: string;
  slug: string;
  url: string;

  constructor(id: number, title: string, content: string, date: Date, author: string, slug: string) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.date = date;
    this.author = author;
    this.slug = slug;
  }

  getUrl() {
    return '/' + this.date.getFullYear() + '/' + this.date.getMonth() + '/' + this.slug;
  }

  getExcerpt() {
    let arr = this.content.split('<!--more-->');
    return arr[0];
  }

  // h4x
  getContent() {
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
