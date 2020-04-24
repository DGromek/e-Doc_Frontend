import {Component} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static apiUrl = 'http://localhost:8080';
  static headersObject = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
    })
  };


}
