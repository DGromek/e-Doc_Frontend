import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isUserLogged() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
