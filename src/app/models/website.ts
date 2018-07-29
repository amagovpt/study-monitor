interface IWebsite {
  WebsiteId: number;
  Url: string;
  Score: number;
  Pages: number;
}

export class Website implements IWebsite {
  WebsiteId: number;
  Url: string;
  Score: number;
  Pages: number;

  constructor(WebsiteId: number, Url: string, Score: number, Pages: number) {
    this.WebsiteId = WebsiteId;
    this.Url = Url;
    this.Score = Score;
    this.Pages = Pages;
  }
}
