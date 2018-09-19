import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-website',
  templateUrl: './add-website.component.html',
  styleUrls: ['./add-website.component.css']
})
export class AddWebsiteComponent implements OnInit {

  @Input('tag') tag: string;
  @Output('addExistingWebsite') addExistingTagWebsite = new EventEmitter<any>();
  @Output('addNewWebsite') addNewTagWebsite = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  addExistingWebsite(data): void {
    this.addExistingTagWebsite.next(data);
  }

  addNewWebsite(data): void {
    this.addNewTagWebsite.next(data);
  }
}
