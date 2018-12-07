import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-spaceship',
  templateUrl: './list-spaceship.component.html',
  styleUrls: ['./list-spaceship.component.scss']
})
export class ListSpaceshipComponent implements OnInit {
  columnsToDisplay = ['userName', 'id'];
  myData: Passenger[] = [
    {name: 'Antoni', id: '18'},
    {name: 'Antoni', id: '18'},
    {name: 'Antoni', id: '18'},
    {name: 'Antoni', id: '18'},
    {name: 'Antoni', id: '18'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
