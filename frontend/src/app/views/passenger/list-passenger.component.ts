import {Component, EventEmitter, Inject, OnInit, ViewChild} from '@angular/core';
import { PassengerService } from '../../services/passengerService';
import {MDC_DIALOG_DATA, MdcDialog, MdcDialogRef, MdcSnackbar} from '@angular-mdc/web';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { DialogData } from '../mothership/list-mothership.component';
import {MatSort, MatTableDataSource} from "@angular/material";
import {SpaceshipService} from "../../services/spaceshipService";
import {PassengerBoardDialog} from "./board-passenger.dialog";
import {PassengerCreateDialog} from "./create-passenger.dialog";

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
   * Opens the Passenger Creation dialog Form
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh(){
    this.passengerService.getAll().subscribe(passengers => {
      this.dataSource.data = passengers;
    }, error => {
      console.log(error);
    });
  }
}

/*
@Component({
  templateUrl: './board-passenger.dialog.html'
})
export class PassengerBoardDialog implements OnInit {
  private spaceships: Spaceship[];
  constructor(public dialogRef: MdcDialogRef<PassengerBoardDialog>, @Inject(MDC_DIALOG_DATA) public data: DialogData, private snackbar: MdcSnackbar, private passengerService: PassengerService, private spaceshipService: SpaceshipService) { }

  message = '';
  action = 'OK';
  multiline = false;
  dismissOnAction = true;
  align = 'center';
  focusAction = false;
  actionOnBottom = false;
  onBoard = new EventEmitter();

  passengerBoardForm = new FormGroup({
    spaceshipId: new FormControl('', Validators.required),
    passengerId: new FormControl('', Validators.required)
  });

  showSnackbar() {
    const snackbarRef = this.snackbar.show(this.message, this.action, {
      align: this.align,
      multiline: this.multiline,
      dismissOnAction: this.dismissOnAction,
      focusAction: this.focusAction,
      actionOnBottom: this.actionOnBottom,
    });

    snackbarRef.afterDismiss().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });
  }

  loadSpaceships() {
    this.spaceshipService.getAll()
      .subscribe(spaceships => {
        this.spaceships = spaceships;
      }, error => {
        console.log(error);
      });
  }

  submit(): void {
    if (this.passengerBoardForm.valid) {
      let passengerId = this.passengerBoardForm.value.passengerId;
      let spaceshipId = this.passengerBoardForm.value.spaceshipId;
      this.passengerService.board(passengerId, spaceshipId).subscribe(
        value => {
          //console.log(value);
          this.message = 'Se ha asignado correctamente';
          this.showSnackbar();
          this.onBoard.emit();
        }, error => {
          console.log(error);
          this.message = error;
          this.showSnackbar();
        }
      );
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {
    this.loadSpaceships()
  }
}
*/

/*
  Passenger Land Dialog
*/
@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-container>
      <mdc-dialog-surface>
        <mdc-dialog-title>Bajar pasajero</mdc-dialog-title>
        <form [formGroup]="passengerLandForm" (ngSubmit)="submit()" autocomplete="off">
        <mdc-dialog-content>
          <mdc-form-field>
            <mdc-text-field formControlName="passengerId" type="number" min=0 label="Id Pasajero" dense outlined required></mdc-text-field>
            <p mdcTextFieldHelperText persistent validation>*Id obligatorio</p>
          </mdc-form-field>
          <mdc-form-field>
            <mdc-text-field formControlName="spaceshipId" type="number" min=0 label="Id Aeronave" dense outlined required></mdc-text-field>
            <p mdcTextFieldHelperText persistent validation>*Id obligatorio</p>
          </mdc-form-field>
        </mdc-dialog-content>
        <mdc-dialog-actions>
          <button mdcDialogButton type="button" mdcDialogAction="close">Cancelar</button>
          <button mdcDialogButton type="submit" primary>Bajar</button>
        </mdc-dialog-actions>
          </form>
      </mdc-dialog-surface>
    </mdc-dialog-container>
  </mdc-dialog>
  `,
})
export class PassengerLandDialog {
  private spaceships: Spaceship[];
  constructor(public dialogRef: MdcDialogRef<PassengerLandDialog>, @Inject(MDC_DIALOG_DATA) public data: DialogData, private snackbar: MdcSnackbar, private passengerService: PassengerService, private spaceshipService: SpaceshipService) { }

  message = '';
  action = 'OK';
  multiline = false;
  dismissOnAction = true;
  align = 'center';
  focusAction = false;
  actionOnBottom = false;
  onLand = new EventEmitter();

  passengerLandForm = new FormGroup({
    spaceshipId: new FormControl('', Validators.required),
    passengerId: new FormControl('', Validators.required)
  });

  showSnackbar() {
    const snackbarRef = this.snackbar.show(this.message, this.action, {
      align: this.align,
      multiline: this.multiline,
      dismissOnAction: this.dismissOnAction,
      focusAction: this.focusAction,
      actionOnBottom: this.actionOnBottom,
    });

    snackbarRef.afterDismiss().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });
  }

  loadSpaceships() {
    this.spaceshipService.getAll()
      .subscribe(spaceships => {
        this.spaceships = spaceships;
      }, error => {
        console.log(error);
      });
  }

  submit(): void {
    if (this.passengerLandForm.valid) {
      let passengerId = this.passengerLandForm.value.passengerId;
      let spaceshipId = this.passengerLandForm.value.spaceshipId;
      this.passengerService.land(passengerId, spaceshipId).subscribe(
        value => {
          //console.log(value);
          this.message = 'Se ha bajado correctamente';
          this.showSnackbar();
          this.onLand.emit();
        }, error => {
          console.log(error);
          this.message = error;
          this.showSnackbar();
        }
      );
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {
    this.loadSpaceships()
  }
}
