import {Component, Inject, OnInit} from '@angular/core';
import {MDC_DIALOG_DATA, MdcDialog, MdcDialogRef, MdcSnackbar} from '@angular-mdc/web';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { DialogData } from '../list-mothership/list-mothership.component';

@Component({
  selector: 'app-list-passenger',
  templateUrl: './list-passenger.component.html',
  styleUrls: ['./list-passenger.component.scss']
})
export class ListPassengerComponent implements OnInit {
  escapeToClose = true;
  clickOutsideToClose = true;

  columnsToDisplay = ['id', 'userName'];
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
    {name: 'B', id: '19'},
    {name: 'B', id: '19'},
    {name: 'C', id: '19'},
    {name: 'C', id: '19'},
    {name: 'C', id: '19'},
    {name: 'C', id: '19'}
  ];
  constructor(public dialog: MdcDialog) { }

  ngOnInit() {
  }

  openForm() {
    const dialogRef = this.dialog.open(PassengerCreateDialog, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      scrollable: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog: ${result}`);
    });
  }

}

@Component({
  templateUrl: './create-passenger.dialog.html'
})
export class PassengerCreateDialog {
  constructor(public dialogRef: MdcDialogRef<PassengerCreateDialog>,
              @Inject(MDC_DIALOG_DATA) public data: DialogData, private snackbar: MdcSnackbar) { }

  message = '';
  action = 'OK';
  multiline = false;
  dismissOnAction = true;
  align = 'start';
  focusAction = false;
  actionOnBottom = false;

  passengerForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  show() {
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

  submit(): void {
    if (this.passengerForm.valid) {
      this.dialogRef.close();
      this.message = 'Se ha creado correctamente';
      this.show();
    }
  }
}
