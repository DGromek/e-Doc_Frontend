import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  router: Router;
  public isMenuCollapsed = true;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  isUserLogged() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
