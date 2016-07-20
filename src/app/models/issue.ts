export class Issue {

  public title: number;
  public url: string;
  public vendor: string;
  public package: string;

  constructor(title: number, url: string) {
    let urlArray = url.split('/');
    this.title = title;
    this.url = url;
    this.vendor = urlArray[4];
    this.package = urlArray[5];
  }
}
