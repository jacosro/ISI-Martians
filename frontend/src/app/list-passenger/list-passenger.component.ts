import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../services/passengerService';

@Component({
  selector: 'app-list-passenger',
  templateUrl: './list-passenger.component.html',
  styleUrls: ['./list-passenger.component.scss']
})
export class ListPassengerComponent implements OnInit {
  columnsToDisplay = ['userName', 'id'];
  myData: Passenger[] = [
    // {name: 'Antoni', id: '18'},
    // {name: 'Antoni', id: '18'},
    // {name: 'Antoni', id: '18'},
    // {name: 'Antoni', id: '18'},
    // {name: 'Antoni', id: '18'},
    // {name: 'B', id: '19'},
    // {name: 'B', id: '19'},
    // {name: 'B', id: '19'},
    // {name: 'B', id: '19'},
    // {name: 'B', id: '19'}
  ];
  constructor(private passengerService: PassengerService) { }

  ngOnInit() {
    this.loadPassengers();
  }

  loadPassengers() {
    this.passengerService.getAll()
      .subscribe(passengers => {
        this.myData = passengers;
      }, error => {
        console.log(error);
      });
  }

}
