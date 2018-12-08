import {Component, ViewChild } from '@angular/core';
import {MdcTopAppBar} from '@angular-mdc/web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'SIGEM';
  @ViewChild('topAppBar') topAppBar: MdcTopAppBar;

  constructor() { }
}



