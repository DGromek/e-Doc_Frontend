import { Component, OnInit } from '@angular/core';

import { faLinkedin, faGithubSquare, faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faLinkedin = faLinkedin;
  faEnvelopeSquare = faEnvelopeSquare;
  faGithubSquare = faGithubSquare;
  faFacebookSquare = faFacebookSquare;
  faInstagramSquare = faInstagramSquare;
  faTwitterSquare = faTwitterSquare;
  constructor() { }

  ngOnInit(): void {
  }

}
