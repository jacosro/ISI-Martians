import {Component, Inject, OnInit} from '@angular/core';
import { MdcDialog, MdcDialogRef, MDC_DIALOG_DATA, MdcSnackbar } from '@angular-mdc/web';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-list-mothership',
  templateUrl: './list-mothership.component.html',
  styleUrls: ['./list-mothership.component.scss']
})
export class ListMothershipComponent implements OnInit {
  escapeToClose = true;
  clickOutsideToClose = true;


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
  constructor(public dialog: MdcDialog) { }

  ngOnInit() {
  }

  openForm() {
    const dialogRef = this.dialog.open(MothershipCreateDialog, {
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
  templateUrl: './create-mothership.dialog.html'
})
export class MothershipCreateDialog {
  constructor(public dialogRef: MdcDialogRef<MothershipCreateDialog>,
              @Inject(MDC_DIALOG_DATA) public data: DialogData, private snackbar: MdcSnackbar) { }

  message = '';
  action = 'OK';
  multiline = false;
  dismissOnAction = true;
  align = 'start';
  focusAction = false;
  actionOnBottom = false;

  mothershipForm = new FormGroup({
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
    if (this.mothershipForm.valid) {
      this.dialogRef.close();
      this.message = 'Se ha creado correctamente';
      this.show();
    }
  }
}
