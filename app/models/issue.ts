export class Issue {

  title: number;
  url: string;
  vendor: string;
  package: string;

  constructor(title: number, url: string) {
    let urlArray = url.split('/');
    this.title = title;
    this.url = url;
    this.vendor = urlArray[4];
    this.package = urlArray[5];
  }
}
