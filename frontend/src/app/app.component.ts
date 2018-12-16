import {Component, OnInit, ViewChild} from '@angular/core';
import { MdcTopAppBar } from '@angular-mdc/web';
import { NavigationStart, Router} from '@angular/router';
import {Observable} from "rxjs";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'SIGEM';
  @ViewChild('topAppBar') topAppBar: MdcTopAppBar;

  navStart: Observable<NavigationStart>;

  constructor(private router: Router) {
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit() {
    this.navStart.subscribe(evt => {
      switch (evt.url) {
        case '/#' : this.title = 'SIGEM' ; break;
        case '/spaceship' : this.title = 'Aeronaves'; break;
        case '/mothership' : this.title = 'Naves nodrizas'; break;
        case '/passenger' : this.title = 'Pasajeros'; break;
      }
    });
  }
}



