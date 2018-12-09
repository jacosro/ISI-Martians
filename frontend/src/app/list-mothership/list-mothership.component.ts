import {Component, Inject, OnInit} from '@angular/core';
import { MdcDialog, MdcDialogRef, MDC_DIALOG_DATA, MdcSnackbar } from '@angular-mdc/web';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MothershipService} from "../services/mothershipService";

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
  myData: Mothership[] = [

  ];
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
    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog: ${result}`);
    });
  }

  private loadData() {
    this.mothershipService.getAll().subscribe(motherships => {
      this.myData = motherships;
    }, error => {
      console.log(error);
    });
  }
}

@Component({
  templateUrl: './create-mothership.dialog.html'
})
export class MothershipCreateDialog {
  constructor(public dialogRef: MdcDialogRef<MothershipCreateDialog>,
              @Inject(MDC_DIALOG_DATA) public data: DialogData, private snackbar: MdcSnackbar, public mothershipService: MothershipService) { }

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

  submit(): void {
    if (this.mothershipForm.valid) {
      let mothership = {name: this.mothershipForm.value.name, id: ""};
      this.mothershipService.create(mothership).subscribe(
        value => {
          console.log(value);
          this.message = 'Se ha creado correctamente';
          this.showSnackbar();
        }, error => {
          console.log(error);
        }
      );
      this.dialogRef.close();
    }
  }
}
