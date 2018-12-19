import { Component, OnInit, ViewChild } from '@angular/core';
import { MdcDialog } from '@angular-mdc/web';
import { MothershipService } from "../../services/mothershipService";
import { MatSort, MatTableDataSource } from "@angular/material";
import { MothershipCreateDialog } from "./create-mothership.dialog";

@Component({
  selector: 'app-list-mothership',
  templateUrl: './list-mothership.component.html',
  styleUrls: ['./list-mothership.component.scss']
})
export class ListMothershipComponent implements OnInit {
  escapeToClose = true;
  clickOutsideToClose = true;

  @ViewChild(MatSort) sort: MatSort;

  columnsToDisplay = ['id', 'name'];
  myData: Mothership[] = [

  ];
  private dataSource: MatTableDataSource<Mothership>;
  constructor(public dialog: MdcDialog, public mothershipService: MothershipService) { }

  ngOnInit() {
    this.loadData()
  }

  openForm() {
    const dialogRef = this.dialog.open(MothershipCreateDialog, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      scrollable: true
    });
    dialogRef.componentInstance.onCreate.subscribe(() =>{
      this.refresh();
    });
  }

  /**
   * Refresh Data Table
   */
  refresh(){
    this.mothershipService.getAll().subscribe(motherships => {
      this.dataSource.data = motherships;
    }, error => {
      console.log(error);
    });
  }

  private loadData() {
    this.mothershipService.getAll().subscribe(motherships => {
      this.myData = motherships;
      this.dataSource = new MatTableDataSource(this.myData);
      this.dataSource.sort = this.sort;
    }, error => {
      console.log(error);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


