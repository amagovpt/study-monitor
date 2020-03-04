import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input('sidenav') sidenav: ElementRef;

  constructor(public user: UserService) { }

  ngOnInit() {
  }

  logout(): void {
    this.user.logout().subscribe();
  }

  toggleSidenav(): void {
    (<any>this.sidenav).toggle();
  }
}
