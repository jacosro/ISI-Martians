import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from "@angular/material";
import {MdcDialog} from "@angular-mdc/web";
import {InspectionService} from "../../services/inspectionService";
import {animate, state, style, transition, trigger} from "@angular/animations";
import * as moment from 'moment';
import {forEach} from "@angular/router/src/utils/collection";
@Component({
  selector: 'app-list-inspection',
  templateUrl: './list-inspection.component.html',
  styleUrls: ['./list-inspection.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListInspectionComponent implements OnInit {
  expandedElement: Inspection | null;
  @ViewChild(MatSort) sort: MatSort;
  columnsToDisplay = ['id', 'inspector', 'spaceship_id', 'spaceship', 'date'];
  myData: Inspection[] = [];
  private dataSource: MatTableDataSource<Inspection>;

  constructor(private inspectionService: InspectionService, public dialog: MdcDialog) { }

  /**
   * OnInit method
   */
  ngOnInit() {
    this.loadInspections();
  }

  /**
   * Loads inspections
   */
  public loadInspections() {
    this.inspectionService.getAll()
      .subscribe(inspections => {
        for (let inspection of inspections) {
          inspection.date = moment(inspection.date).format('LL');
        }
        this.myData = inspections;
        this.dataSource = new MatTableDataSource(this.myData)
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      });
  }

  /**
   * Apply filter to Data Table
   * @param filterValue Value to be filtered in Data Table
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
