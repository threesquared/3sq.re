export class Repository {

  id: number;
  name: string;
  url: string;
  description: string;

  constructor(id: number, name: string, url: string, description: string) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.description = description;
  }
}
