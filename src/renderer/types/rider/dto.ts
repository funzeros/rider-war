export class Rider {
  name: string;
  id: string;
  url: string;
  constructor(name = "", url: string) {
    this.name = name;
    this.id = name
      .split("")
      .map((m) => m.charCodeAt(0))
      .join("");
    this.url = url;
  }
}
