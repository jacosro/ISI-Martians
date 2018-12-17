import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from "@angular/material";
import {PassengerService} from "../../services/passengerService";
import {MdcDialog} from "@angular-mdc/web";
import {PassengerCreateDialog} from "../passenger/create-passenger.dialog";
import {PassengerBoardDialog} from "../passenger/board-passenger.dialog";
import {PassengerLandDialog} from "../passenger/land-passenger.dialog";

@Component({
  selector: 'app-list-inspection',
  templateUrl: './list-inspection.component.html',
  styleUrls: ['./list-inspection.component.scss']
})
export class ListInspectionComponent implements OnInit {

  escapeToClose = true;
  clickOutsideToClose = true;
  @ViewChild(MatSort) sort: MatSort;
  columnsToDisplay = ['id', 'name'];
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
