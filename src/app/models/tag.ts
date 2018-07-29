interface ITag {
  Name: string;
  Websites: Array<number>;
  Pages: Array<number>;
}

export class Tag implements ITag {
  Name: string;
  Websites: Array<number>;
  Pages: Array<number>;

  constructor(Name: string, Websites: Array<number>, Pages: Array<number>) {
    this.Name = Name;
    this.Websites = Websites;
    this.Pages = Pages;
  }
}
