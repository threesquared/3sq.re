export class Repository {

  public id: number;
  public name: string;
  public url: string;
  public description: string;

  constructor(id: number, name: string, url: string, description: string) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.description = description;
  }
}
