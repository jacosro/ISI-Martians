import {Component, Inject, OnInit} from '@angular/core';
import {MDC_DIALOG_DATA, MdcDialog, MdcDialogRef, MdcSnackbar} from '@angular-mdc/web';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogData} from '../list-mothership/list-mothership.component';

@Component({
  selector: 'app-list-spaceship',
  templateUrl: './list-spaceship.component.html',
  styleUrls: ['./list-spaceship.component.scss']
})
export class ListSpaceshipComponent implements OnInit {
  escapeToClose = true;
  clickOutsideToClose = true;

  columnsToDisplay = ['userName', 'id'];
  myData: Passenger[] = [
    {name: 'Antoni', id: '18'},
    {name: 'Antoni', id: '18'},
    {name: 'Antoni', id: '18'},
    {name: 'Antoni', id: '18'},
    {name: 'Antoni', id: '18'},
  ];
  constructor(public dialog: MdcDialog) { }

  ngOnInit() {
  }

  openForm() {
    const dialogRef = this.dialog.open(SpaceshipCreateDialog, {
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
  templateUrl: './create-spaceship.dialog.html'
})
export class SpaceshipCreateDialog {
  constructor(public dialogRef: MdcDialogRef<SpaceshipCreateDialog>,
              @Inject(MDC_DIALOG_DATA) public data: DialogData, private snackbar: MdcSnackbar) { }

  message = '';
  action = 'OK';
  multiline = false;
  dismissOnAction = true;
  align = 'start';
  focusAction = false;
  actionOnBottom = false;

  spaceshipForm = new FormGroup({
    name: new FormControl('', Validators.required),
    // name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    nummax: new FormControl('', Validators.required),
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
    if (this.spaceshipForm.valid) {
      this.dialogRef.close();
      this.message = 'Se ha creado correctamente';
      this.show();
    }
  }
}
