import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { faCar, faList, faAd, faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'agent-front-xml';

  faCar = faCar;
  faAd = faAd;
  faList = faList;


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }
}
