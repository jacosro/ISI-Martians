import {Component, OnInit, ViewChild} from '@angular/core';
import {MdcTopAppBar} from '@angular-mdc/web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'isi-material-app';
  @ViewChild('topAppBar') topAppBar: MdcTopAppBar;
  ngOnInit(): void {
    // this.topAppBar.fixed = true;
    // this.topAppBar.prominent = true;
    // this.topAppBar.dense = true;
  }

}

