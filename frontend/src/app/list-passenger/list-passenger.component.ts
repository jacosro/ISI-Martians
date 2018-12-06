import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-passenger',
  templateUrl: './list-passenger.component.html',
  styleUrls: ['./list-passenger.component.scss']
})
export class ListPassengerComponent implements OnInit {
  columnsToDisplay = ['userName', 'id'];
  myData: Passenger[] = [
    {name: 'Antoni', id: '18'},
    {name: 'Antoni', id: '18'},
    {name: 'Antoni', id: '18'},
    {name: 'Antoni', id: '18'},
    {name: 'Antoni', id: '18'},
    {name: 'B', id: '19'},
    {name: 'B', id: '19'},
    {name: 'B', id: '19'},
    {name: 'B', id: '19'},
    {name: 'B', id: '19'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
