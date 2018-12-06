import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-passenger',
  templateUrl: './list-passenger.component.html',
  styleUrls: ['./list-passenger.component.scss']
})
export class ListPassengerComponent implements OnInit {
  columnsToDisplay = ['userName', 'age'];
  myData: Persona[] = [
    {name: 'Antoni', age: '18'},
    {name: 'Antoni', age: '18'},
    {name: 'Antoni', age: '18'},
    {name: 'Antoni', age: '18'},
    {name: 'Antoni', age: '18'},
    {name: 'B', age: '19'},
    {name: 'B', age: '19'},
    {name: 'B', age: '19'},
    {name: 'B', age: '19'},
    {name: 'B', age: '19'}
  ];
  constructor() { }

  ngOnInit() {
  }

}

export interface Persona {
  name: string;
  age: string;
}
