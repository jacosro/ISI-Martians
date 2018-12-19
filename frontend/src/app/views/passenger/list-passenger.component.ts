import { Component, OnInit, ViewChild } from '@angular/core';
import { PassengerService } from '../../services/passengerService';
import { MdcDialog } from '@angular-mdc/web';
import { MatSort, MatTableDataSource } from "@angular/material";
import { PassengerBoardDialog } from "./board-passenger.dialog";
import { PassengerCreateDialog } from "./create-passenger.dialog";
import { PassengerLandDialog } from "./land-passenger.dialog";

@Component({
  selector: 'app-list-passenger',
  templateUrl: './list-passenger.component.html',
  styleUrls: ['./list-passenger.component.scss']
})
export class ListPassengerComponent implements OnInit {
  escapeToClose = true;
  clickOutsideToClose = true;
  @ViewChild(MatSort) sort: MatSort;
  columnsToDisplay = ['id', 'name', 'spaceshipId'];
  myData: Passenger[] = [];
  private dataSource: MatTableDataSource<Passenger>;

  constructor(private passengerService: PassengerService, public dialog: MdcDialog) { }

  /**
   * OnInit method
   */
  ngOnInit() {
    this.loadPassengers();
  }

  /**
   *
   */
  public loadPassengers() {
    this.passengerService.getAll()
      .subscribe(passengers => {
        this.myData = passengers;
        this.dataSource = new MatTableDataSource(this.myData)
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      });
  }

  /**
   * Opens the Create Passenger Dialog Form
   */
  openCreateForm() {
    const dialogRef = this.dialog.open(PassengerCreateDialog, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      scrollable: true
    });
    dialogRef.componentInstance.onCreate.subscribe(() =>{
      this.refresh();
    })
  }

  /**
   * Opens the Board Passenger Dialog
   */
  openBoardForm(){
    const dialogRef = this.dialog.open(PassengerBoardDialog, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      scrollable: true,
      //data: { 'passengerId' : passengerId }
    });
    dialogRef.componentInstance.onBoard.subscribe(() => {
      this.refresh();
    })
  }

  /**
   * Opens the Land Passenger Dialog
   */
  openLandDialog(){
    const dialogRef = this.dialog.open(PassengerLandDialog, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      scrollable: true,
      //data: { 'passengerId' : passengerId }
    });
    dialogRef.componentInstance.onLand.subscribe(() => {
      this.refresh();
    })
  }

  /**
   * Apply filter to Data Table
   * @param filterValue Value to be filtered in Data Table
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Refresh Data Table
   */
  refresh(){
    this.passengerService.getAll().subscribe(passengers => {
      this.dataSource.data = passengers;
    }, error => {
      console.log(error);
    });
  }
}
