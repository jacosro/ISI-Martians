import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-mothership',
  templateUrl: './list-mothership.component.html',
  styleUrls: ['./list-mothership.component.scss']
})
export class ListMothershipComponent implements OnInit {
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
