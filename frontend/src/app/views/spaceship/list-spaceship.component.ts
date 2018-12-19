import { Component, OnInit, ViewChild } from '@angular/core';
import { MdcDialog } from '@angular-mdc/web';
import { SpaceshipService } from "../../services/spaceshipService";
import { MatSort, MatTableDataSource } from "@angular/material";
import { SpaceshipCreateDialog } from "./create-spaceship.dialog";
import {SpaceshipInspectionDialog} from "./inspection-spaceship.dialog";

@Component({
  selector: 'app-list-spaceship',
  templateUrl: './list-spaceship.component.html',
  styleUrls: ['./list-spaceship.component.scss']
})
export class ListSpaceshipComponent implements OnInit {
  escapeToClose = true;
  clickOutsideToClose = true;

  @ViewChild(MatSort) sort: MatSort;

  columnsToDisplay = ['id', 'name', 'maxPassengers', 'fromMothership_id', 'toMothership_id'];
  myData: Spaceship[] = [

  ];
  private dataSource: MatTableDataSource<Spaceship>;
  
  constructor(public dialog: MdcDialog, private spaceshipService: SpaceshipService) { }

  ngOnInit() {
    this.loadSpaceships()
  }

  loadSpaceships() {
    this.spaceshipService.getAll()
      .subscribe(spaceships => {
        this.myData = spaceships;
        this.dataSource = new MatTableDataSource(this.myData);
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openForm() {
    const dialogRef = this.dialog.open(SpaceshipCreateDialog, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      scrollable: true
    });
    dialogRef.componentInstance.onCreate.subscribe(() => {
      this.refresh();
    });
  }

  openInspectionForm() {
    const dialogRef = this.dialog.open(SpaceshipInspectionDialog, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      scrollable: true
    });
    dialogRef.componentInstance.onInspection.subscribe(() => {
      this.refresh();
    });
  }

  /*
  openRevisionForm() {
    const dialogRef = this.dialog.open(SpaceshipRevisionDialog, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      scrollable: true
    });
    dialogRef.componentInstance.onCreate.subscribe(() => {
      this.refresh();
    });
  }
  */

  /**
   * Refresh Data Table
   */
  refresh(){
    this.spaceshipService.getAll().subscribe(spaceships => {
      this.dataSource.data = spaceships;
    }, error => {
      console.log(error);
    });
  }
}
