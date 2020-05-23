import { Component, OnInit } from '@angular/core';
import {faSearch, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-doc-browser',
  templateUrl: './doc-browser.component.html',
  styleUrls: ['./doc-browser.component.css']
})
export class DocBrowserComponent implements OnInit {
  faSearch = faSearch;
  faCalendarAlt = faCalendarAlt;
  model: NgbDateStruct;
  constructor() { }

  ngOnInit(): void {
  }

}
